import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'https://connections-api.goit.global';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Persist token to localStorage
const persistToken = (token) => {
  try {
    localStorage.setItem('auth_token', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

const getPersistedToken = () => {
  try {
    return localStorage.getItem('auth_token');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

const clearPersistedToken = () => {
  try {
    localStorage.removeItem('auth_token');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

/*
 * POST /users/signup
 * body: { name, email, password }
 * password must be at least 7 characters
 */
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { name, email, password } = credentials;
      
      // Validate before sending
      if (!name || name.trim().length < 1) {
        return thunkAPI.rejectWithValue("Ім'я обов'язкове");
      }
      if (!email || !email.includes('@')) {
        return thunkAPI.rejectWithValue('Невірний формат email');
      }
      if (!password || password.length < 7) {
        return thunkAPI.rejectWithValue('Пароль має бути мінімум 7 символів');
      }

      const response = await axios.post('/users/signup', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });
      
      setAuthHeader(response.data.token);
      persistToken(response.data.token);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message 
        || error.response?.data?.error
        || 'Помилка реєстрації. Можливо, цей email вже використовується.';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/*
 * POST /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { email, password } = credentials;
      
      const response = await axios.post('/users/login', {
        email: email.trim().toLowerCase(),
        password,
      });
      
      setAuthHeader(response.data.token);
      persistToken(response.data.token);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message 
        || error.response?.data?.error
        || 'Невірний email або пароль';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/*
 * POST /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/logout');
    } catch (error) {
      // Ignore server errors on logout
    } finally {
      clearAuthHeader();
      clearPersistedToken();
    }
  }
);

/*
 * GET /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const persistedToken = getPersistedToken();
    
    if (!persistedToken) {
      return thunkAPI.rejectWithValue('No token');
    }

    try {
      setAuthHeader(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      clearPersistedToken();
      clearAuthHeader();
      return thunkAPI.rejectWithValue('Session expired');
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (auth.isRefreshing) {
        return false;
      }
    },
  }
);

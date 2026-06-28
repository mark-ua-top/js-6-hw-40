import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
 * GET /contacts
 * headers: Authorization: Bearer token
 */
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Не вдалося завантажити контакти';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/*
 * POST /contacts
 * body: { name, number }
 * headers: Authorization: Bearer token
 */
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const { name, number } = contact;
      
      if (!name || name.trim().length < 1) {
        return thunkAPI.rejectWithValue("Ім'я обов'язкове");
      }
      if (!number || number.trim().length < 3) {
        return thunkAPI.rejectWithValue('Невірний номер телефону');
      }

      const response = await axios.post('/contacts', {
        name: name.trim(),
        number: number.trim(),
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Не вдалося додати контакт';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/*
 * DELETE /contacts/:id
 * headers: Authorization: Bearer token
 */
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Не вдалося видалити контакт';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (_, action) => action.payload,
    clearFilter: () => '',
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

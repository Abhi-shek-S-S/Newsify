// src/slices/sourcesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_NEWSAPI_KEY; 

// Async thunk to fetch sources
export const fetchSources = createAsyncThunk('sources/fetchSources', async () => {
  const response = await axios.get(`https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`);
  return response.data.sources;
});

const sourcesSlice = createSlice({
  name: 'sources',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSources.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchSources.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default sourcesSlice.reducer;

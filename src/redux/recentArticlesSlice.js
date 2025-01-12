// src/slices/recentArticlesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_GUARDIAN_API_KEY;

// Async thunk to fetch recent articles
export const fetchRecentArticles = createAsyncThunk(
  'recentArticles/fetchRecentArticles',
  async () => {
    const response = await axios.get(
      `https://content.guardianapis.com/search?api-key=${API_KEY}`
    );
    return response.data.response.results;
  }
);

const recentArticlesSlice = createSlice({
  name: 'recentArticles',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecentArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchRecentArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default recentArticlesSlice.reducer;
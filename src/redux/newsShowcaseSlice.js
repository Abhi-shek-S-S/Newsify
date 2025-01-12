import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_NEW_YORK_TIMES_KEY;

export const fetchNews = createAsyncThunk('newsShowcase/fetchNews', async () => {
  const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`);
  return response.data.results;
});

const newsShowcaseSlice = createSlice({
  name: 'newsShowcase',
  initialState: {
    articles: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default newsShowcaseSlice.reducer;
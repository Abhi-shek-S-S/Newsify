// features/topHeadlinesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch top headlines from the API
export const fetchTopHeadlines = createAsyncThunk('topHeadlines/fetchTopHeadlines', async () => {
  const apiKey = import.meta.env.VITE_APP_NEWSAPI_KEY;  // Fetch the API key from environment variables
  const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
  return response.data.articles;  // Assuming 'articles' is the array of top headlines
});

// Fetch local news based on country
export const fetchLocalNews = createAsyncThunk('topHeadlines/fetchLocalNews', async (country) => {
  const apiKey = import.meta.env.VITE_APP_NEWSAPI_KEY;  // Fetch the API key from environment variables
  const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`);
  return response.data.articles;  // Assuming 'articles' is the array of local news
});

const topHeadlinesSlice = createSlice({
  name: 'topHeadlines',
  initialState: {
    headlines: [],
    localNews: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopHeadlines.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopHeadlines.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.headlines = action.payload;
      })
      .addCase(fetchTopHeadlines.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchLocalNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocalNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.localNews = action.payload;
      })
      .addCase(fetchLocalNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default topHeadlinesSlice.reducer;

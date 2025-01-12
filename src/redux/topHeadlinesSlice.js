// features/topHeadlinesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch top headlines from NewsAPI
export const fetchTopHeadlines = createAsyncThunk(
  'topHeadlines/fetchTopHeadlines',
  async () => {
    const apiKey = import.meta.env.VITE_APP_NEWSAPI_KEY; // Fetch the API key from environment variables
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    return response.data.articles; // Assuming 'articles' is the array of top headlines
  }
);

// Fetch local news based on country
export const fetchLocalNews = createAsyncThunk(
  'topHeadlines/fetchLocalNews',
  async (country) => {
    const apiKey = import.meta.env.VITE_APP_NEWSAPI_KEY; // Fetch the API key from environment variables
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=latest&pagesize=30&apiKey=${apiKey}`
    );
    return response.data.articles; // Assuming 'articles' is the array of local news
  }
);

// Fetch trending news from the NY Times API
export const fetchTrendingNews = createAsyncThunk(
  'topHeadlines/fetchTrendingNews',
  async () => {
    const apiKey = import.meta.env.VITE_APP_NEW_YORK_TIMES_KEY; // NY Times API key
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`
    );
    return response.data.results; // Assuming 'results' contains the trending news
  }
);

// Slice definition
const topHeadlinesSlice = createSlice({
  name: 'topHeadlines',
  initialState: {
    headlines: [], // Stores top headlines
    localNews: [], // Stores local news
    trendingNews: [], // Stores trending news
    status: 'idle', // API call status ('idle' | 'loading' | 'succeeded' | 'failed')
    error: null, // Error message (if any)
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Top headlines
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
      // Local news
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
      })
      // Trending news
      .addCase(fetchTrendingNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrendingNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trendingNews = action.payload;
      })
      .addCase(fetchTrendingNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default topHeadlinesSlice.reducer;

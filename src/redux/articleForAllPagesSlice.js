
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (menuType, { getState }) => {
    const { page, pageSize } = getState().articlesForAllPages;
    const apiKey = import.meta.env.VITE_APP_NEWSAPI_KEY;  // Fetch the API key from environment variables
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${menuType}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
    );
    const data = await response.json();
    return data.articles;
  }
);

const articlesSlice = createSlice({
  name: 'articlesForAllPages',
  initialState: {
    articles: [],
    page: 1,
    pageSize: 20,
    loading: false,
    hasMore: true,
    error: null
  },
  reducers: {
    resetArticles: (state) => {
      state.articles = [];
      state.page = 1; // Reset the page to 1
      state.hasMore = true;
      state.error = null; // Optional: Reset error state
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        if (action.payload.length < state.pageSize) {
          state.hasMore = false;
        }
        state.articles = [...state.articles, ...action.payload];
        state.page += 1; // Increment the page number
        state.loading = false;
      })      
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { resetArticles } = articlesSlice.actions;

export default articlesSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (menuType, { getState, rejectWithValue }) => {
    try {
      const { page, pageSize } = getState().articlesForAllPages;
      const apiKey = import.meta.env.VITE_APP_NEWSAPI_KEY;
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${menuType}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
      );

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch articles');
      }

      const data = await response.json();
      if (!data.articles) {
        // Handle unexpected API response
        return rejectWithValue(data.message || 'No articles found.');
      }

      return data.articles;
    } catch (error) {
      // Handle network or unexpected errors
      return rejectWithValue(error.message || 'An unexpected error occurred.');
    }
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
      state.page = 1; 
      state.hasMore = true;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        if (action.payload.length < state.pageSize) {
          state.hasMore = false;
        }
        state.articles = [...state.articles, ...action.payload]; 
        state.page += 1;
        state.loading = false;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred while fetching articles.';
      });
  }
});

export const { resetArticles } = articlesSlice.actions;

export default articlesSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create async thunk for search
export const searchArticles = createAsyncThunk(
  'navBar/searchArticles',
  async (searchTerm) => {
    if (!searchTerm.trim()) return [];
    
    try {
      const API_KEY = import.meta.env.VITE_APP_NEWSAPI_KEY;
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&apiKey=${API_KEY}`,
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch articles');
      }

      const data = await response.json();
      return data.articles; // Return just the articles array from the response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch articles');
    }
  }
);

const initialState = {
  search: '',
  isPreferenceModalOpen: false,
  isFilterModalOpen: false,
  searchResults: [],
  isLoading: false,
  error: null,
  active: 'Home'
};

const navBarSlice = createSlice({
  name: 'navBar',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setIsPreferenceModalOpen: (state, action) => {
      state.isPreferenceModalOpen = action.payload;
    },
    setIsFilterModalOpen: (state, action) => {
      state.isFilterModalOpen = action.payload;
    },
    handleMenuClick: (state, action) => {
      state.active = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.search = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  setSearch,
  setIsPreferenceModalOpen,
  setIsFilterModalOpen,
  handleMenuClick,
  clearSearchResults
} = navBarSlice.actions;

export default navBarSlice.reducer;
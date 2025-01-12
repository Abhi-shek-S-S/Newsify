import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const searchArticles = createAsyncThunk(
  'navBar/searchArticles',
  async ({ searchTerm, fromDate, toDate }) => {
    if (!searchTerm.trim()) return [];
    
    try {
      const API_KEY = import.meta.env.VITE_APP_NEWSAPI_KEY;
      let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}`;
      
      // Add date parameters if they exist
      if (fromDate) {
        url += `&from=${fromDate}`;
      }
      if (toDate) {
        url += `&to=${toDate}`;
      }
      
      url += `&apiKey=${API_KEY}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch articles');
      }

      const data = await response.json();
      return data.articles;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch articles');
    }
  }
);

const initialState = {
  search: '',
  fromDate: '',
  toDate: '',
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
    setFromDate: (state, action) => {
      state.fromDate = action.payload;
    },
    setToDate: (state, action) => {
      state.toDate = action.payload;
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
      state.fromDate = '';
      state.toDate = '';
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
  setFromDate,
  setToDate,
  setIsPreferenceModalOpen,
  setIsFilterModalOpen,
  handleMenuClick,
  clearSearchResults
} = navBarSlice.actions;

export default navBarSlice.reducer;
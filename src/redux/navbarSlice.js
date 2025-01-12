import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

const loadInitialState = () => {
  try {
    const savedState = localStorage.getItem('searchState');
    return savedState ? JSON.parse(savedState) : initialState;
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return initialState;
  }
};

export const searchArticles = createAsyncThunk(
  'navBar/searchArticles',
  async ({ searchTerm, fromDate, toDate }, { rejectWithValue }) => {
    if (!searchTerm?.trim()) return [];
    
    try {
      const API_KEY = import.meta.env.VITE_APP_NEWSAPI_KEY;
      let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}`;
      
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
        return rejectWithValue(errorData.message || 'Failed to fetch articles');
      }

      const data = await response.json();
      return data.articles;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch articles');
    }
  }
);

const navBarSlice = createSlice({
  name: 'navBar',
  initialState: loadInitialState(),
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      localStorage.setItem('searchState', JSON.stringify(state));
    },
    setFromDate: (state, action) => {
      state.fromDate = action.payload;
      localStorage.setItem('searchState', JSON.stringify(state));
    },
    setToDate: (state, action) => {
      state.toDate = action.payload;
      localStorage.setItem('searchState', JSON.stringify(state));
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
      localStorage.removeItem('searchState');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        localStorage.setItem('searchState', JSON.stringify(state));
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
        localStorage.setItem('searchState', JSON.stringify(state));
      })
      .addCase(searchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        localStorage.setItem('searchState', JSON.stringify(state));
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
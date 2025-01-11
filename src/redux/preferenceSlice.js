import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_NEWSAPI_KEY;

export const fetchEverythingByCategory = createAsyncThunk(
  "preferences/fetchEverythingByCategory",
  async (categories, { rejectWithValue }) => {
    try {
      // Handle multiple categories
      const promises = categories.map(category =>
        axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: category,   
            apiKey: API_KEY,
          },
        })
      );
      
      const responses = await Promise.all(promises);
      return responses.map(response => response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTopHeadlinesBySource = createAsyncThunk(
  "preferences/fetchTopHeadlinesBySource",
  async (sources, { rejectWithValue }) => {
    try {
      const sourcesParam = sources
        .map((source) => source.toLowerCase().replace(/\s+/g, "-"))
        .join(",");

      const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          sources: sourcesParam,
          apiKey: API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const preferencesSlice = createSlice({
  name: "preferences",
  initialState: {
    selectedCategories: JSON.parse(localStorage.getItem("selectedCategories")) || [],
    selectedSources: JSON.parse(localStorage.getItem("selectedSources")) || [],
    categoryResults: [],
    sourceResults: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
      localStorage.setItem("selectedCategories", JSON.stringify(action.payload));
    },
    setSelectedSources: (state, action) => {
      state.selectedSources = action.payload;
      localStorage.setItem("selectedSources", JSON.stringify(action.payload));
    },
    resetSelections: (state) => {
      state.selectedCategories = [];
      state.selectedSources = [];
      localStorage.removeItem("selectedCategories");
      localStorage.removeItem("selectedSources");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEverythingByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEverythingByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryResults = action.payload.flatMap(response => response.articles);
      })
      .addCase(fetchEverythingByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTopHeadlinesBySource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopHeadlinesBySource.fulfilled, (state, action) => {
        state.loading = false;
        state.sourceResults = action.payload.articles;
      })
      .addCase(fetchTopHeadlinesBySource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCategories, setSelectedSources, resetSelections } = preferencesSlice.actions;

export default preferencesSlice.reducer;
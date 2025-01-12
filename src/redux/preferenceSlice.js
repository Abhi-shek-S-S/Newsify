import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_NEWSAPI_KEY;
const NY_API_KEY = import.meta.env.VITE_APP_NEW_YORK_TIMES_KEY;

// Helper function to extract error message
const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return "An unexpected error occurred";
};


export const fetchEverythingByCategory = createAsyncThunk(
  "preferences/fetchEverythingByCategory",
  async (categories, { rejectWithValue }) => {
    try {
      const promises = categories.map(category => {
        const formattedCategory = encodeURIComponent(category.toLowerCase());
        const url = `https://api.nytimes.com/svc/topstories/v2/${formattedCategory}.json`;
        return axios.get(url, {
          params: {
            "api-key": NY_API_KEY,
          },
        });
      });

      const responses = await Promise.all(promises);
      console.log(responses, "responses");
      return responses.map(response => response.data.results);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
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
      return rejectWithValue(getErrorMessage(error));
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
        state.categoryResults = action.payload.flatMap(response => response);
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
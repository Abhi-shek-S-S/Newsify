// src/slices/navBarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  isPreferenceModalOpen: false,
  isFilterModalOpen: false,
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
      // This action will update the active category or handle any other menu-related state
      state.active = action.payload;
    },
  },
});

export const { setSearch, setIsPreferenceModalOpen, setIsFilterModalOpen, handleMenuClick } = navBarSlice.actions;

export default navBarSlice.reducer;

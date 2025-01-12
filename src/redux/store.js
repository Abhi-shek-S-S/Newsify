// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import sourcesReducer from './sourcesSlice';
import navBarReducer from './navbarSlice'; 
import topHeadlinesReducer from './topHeadlinesSlice';
import articlesReducer from './articleForAllPagesSlice';
import preferencesReducer from "./preferenceSlice";
import newsShowcaseReducer from './newsShowcaseSlice';



export const store = configureStore({
  reducer: {
    sources: sourcesReducer,
    navBar: navBarReducer,
    topHeadlines: topHeadlinesReducer,
    articlesForAllPages: articlesReducer,
    preferences: preferencesReducer,
    newsShowcase: newsShowcaseReducer,
  },
});

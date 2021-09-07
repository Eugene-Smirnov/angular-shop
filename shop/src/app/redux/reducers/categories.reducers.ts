import { createReducer, on } from '@ngrx/store';
import { categoriesLoadedSuccess, loadCategories } from '../actions/categories.actions';
import { CategoriesState } from '../models/state.models';

export const categoriesFeatureKey = 'categoriesState';

export const initialState: CategoriesState = { categories: [] };

export const youtubeApiReducer = createReducer(
  initialState,
  on(loadCategories, (state): CategoriesState => {
    return { ...initialState };
  }),
  on(categoriesLoadedSuccess, (state, { loadedCategories }): CategoriesState => {
    return { categories: loadedCategories };
  }),
);

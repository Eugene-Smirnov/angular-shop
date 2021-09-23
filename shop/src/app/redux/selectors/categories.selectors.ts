import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from '../models/state.models';
import { categoriesFeatureKey } from '../reducers/categories.reducers';

export const selectCategoriesState = createFeatureSelector<CategoriesState>(categoriesFeatureKey);

export const selectCategories = createSelector(selectCategoriesState, (state) => state.categories);

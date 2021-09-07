import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from '../models/state.models';
import { categoriesFeatureKey } from '../reducers/categories.reducers';

export const getCategoriesState = createFeatureSelector<CategoriesState>(categoriesFeatureKey);

export const getCategories = createSelector(getCategoriesState, (state) => state.categories);

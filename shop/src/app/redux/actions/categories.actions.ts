import { createAction, props } from '@ngrx/store';
import { CategoryModel } from 'src/app/core/models/category.model';

export const LOAD_CATEGORIES_ACTION_NAME = '[CATEGORIES] Load categories';
export const CATEGORIES_LOADED_SUCCESS_ACTION_NAME = '[CATEGORIES] Categories loaded successfully';

export const loadCategories = createAction(LOAD_CATEGORIES_ACTION_NAME);

export const categoriesLoadedSuccess = createAction(
  CATEGORIES_LOADED_SUCCESS_ACTION_NAME,
  props<{ loadedCategories: CategoryModel[] }>(),
);

import { createAction, props } from '@ngrx/store';
import { GoodsItemModel } from 'src/app/goods/models/goods-item.model';

export const GOODS_ACTION_NAMES = {
  LOAD_CATEGORY_GOODS: '[GOODS] Load category goods',
  LOAD_SUBCATEGORY_GOODS: '[GOODS] Load subcategory goods',
  GOODS_LOADED: '[GOODS] Goods loaded successfully',
  ADD_PAGE: '[GOODS] Increment page counter',
  ADD_CATEGORY_PAGE: '[GOODS] Increment category page counter',
  ADD_SUBCATEGORY_PAGE: '[GOODS] Increment subcategory page counter',
  RESET: '[GOODS] Reset state',
  RESET_CATEGORY: '[GOODS] Reset state and load category goods',
  RESET_SUBCATEGORY: '[GOODS] Reset state and load subcategory goods',
};

export const loadCategoryGoods = createAction(
  GOODS_ACTION_NAMES.LOAD_CATEGORY_GOODS,
  props<{ categoryId: string; fromIndex: number }>(),
);

export const loadSubCategoryGoods = createAction(
  GOODS_ACTION_NAMES.LOAD_SUBCATEGORY_GOODS,
  props<{ categoryId: string; subCategoryId: string; fromIndex: number }>(),
);

export const goodsLoadedSuccess = createAction(
  GOODS_ACTION_NAMES.GOODS_LOADED,
  props<{ loadedGoods: GoodsItemModel[] }>(),
);

export const addPage = createAction(GOODS_ACTION_NAMES.ADD_PAGE);

export const addCategoryPage = createAction(
  GOODS_ACTION_NAMES.ADD_CATEGORY_PAGE,
  props<{ categoryId: string; fromIndex: number }>(),
);

export const addSubCategoryPage = createAction(
  GOODS_ACTION_NAMES.ADD_SUBCATEGORY_PAGE,
  props<{ categoryId: string; subCategoryId: string; fromIndex: number }>(),
);

export const resetGoods = createAction(GOODS_ACTION_NAMES.RESET);

export const resetCategory = createAction(
  GOODS_ACTION_NAMES.RESET_CATEGORY,
  props<{ categoryId: string; fromIndex: number }>(),
);

export const resetSubCategory = createAction(
  GOODS_ACTION_NAMES.RESET_SUBCATEGORY,
  props<{ categoryId: string; subCategoryId: string; fromIndex: number }>(),
);

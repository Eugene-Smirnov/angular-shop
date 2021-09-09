import { createAction, props } from '@ngrx/store';
import { GoodsItemModel } from 'src/app/goods/models/goods-item.model';

export const GOODS_ACTION_NAMES = {
  LOAD_CATEGORY_GOODS: '[GOODS] Load category goods',
  LOAD_SUBCATEGORY_GOODS: '[GOODS] Load subcategory goods',
  GOODS_LOADED: '[GOODS] Goods loaded successfully',
  ADD_PAGE: '[GOODS] Increment page counter',
};

export const loadCategoryGoods = createAction(
  GOODS_ACTION_NAMES.LOAD_CATEGORY_GOODS,
  props<{ categoryId: string }>(),
);

export const loadSubCategoryGoods = createAction(
  GOODS_ACTION_NAMES.LOAD_SUBCATEGORY_GOODS,
  props<{ categoryId: string; subCategoryId: string }>(),
);

export const goodsLoadedSuccess = createAction(
  GOODS_ACTION_NAMES.GOODS_LOADED,
  props<{ loadedGoods: GoodsItemModel[] }>(),
);

export const addPage = createAction(GOODS_ACTION_NAMES.ADD_PAGE);

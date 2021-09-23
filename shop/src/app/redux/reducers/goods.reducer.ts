import { createReducer, on } from '@ngrx/store';
import {
  goodsLoadedSuccess,
  loadCategoryGoods,
  loadSubCategoryGoods,
  resetCategory,
  resetGoods,
  resetSubCategory,
} from '../actions/goods.actions';
import { GoodsState } from '../models/state.models';

export const goodsFeatureKey = 'goodsState';

export const initialState: GoodsState = {
  categoryId: '',
  subCategoryId: '',
  lastItemIndex: 0,
  isNotLastPage: true,
  sortingSettings: {
    sortBy: '',
    isDesc: true,
  },
  goods: [],
};

export const goodsReducer = createReducer(
  initialState,
  on(loadCategoryGoods, (state, { categoryId }): GoodsState => {
    return { ...initialState, goods: [...state.goods], categoryId };
  }),
  on(loadSubCategoryGoods, (state, { categoryId, subCategoryId }): GoodsState => {
    return { ...initialState, goods: [...state.goods], categoryId, subCategoryId };
  }),
  on(goodsLoadedSuccess, (state, { loadedGoods }): GoodsState => {
    return {
      ...initialState,
      goods: [...state.goods, ...loadedGoods.slice(0, 10)],
      isNotLastPage: !!loadedGoods[10],
    };
  }),
  on(resetGoods, resetCategory, resetSubCategory, (): GoodsState => {
    return {
      ...initialState,
    };
  }),
);

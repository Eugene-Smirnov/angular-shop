import { createReducer, on } from '@ngrx/store';
import {
  addPage,
  goodsLoadedSuccess,
  loadCategoryGoods,
  loadSubCategoryGoods,
} from '../actions/goods.actions';
import { GoodsState } from '../models/state.models';

export const goodsFeatureKey = 'goodsState';

export const initialState: GoodsState = {
  categoryId: '',
  subCategoryId: '',
  itemId: '',
  page: 1,
  pagesTotal: 1,
  sortingSettings: {
    sortBy: '',
    isDesc: true,
  },
  goods: [],
};

export const goodsReducer = createReducer(
  initialState,
  on(loadCategoryGoods, (state, { categoryId }): GoodsState => {
    return { ...initialState, categoryId };
  }),
  on(loadSubCategoryGoods, (state, { categoryId, subCategoryId }): GoodsState => {
    return { ...initialState, categoryId, subCategoryId };
  }),
  on(goodsLoadedSuccess, (state, { loadedGoods }): GoodsState => {
    return {
      ...initialState,
      goods: [...loadedGoods],
      pagesTotal: Math.ceil(loadedGoods.length / 10),
    };
  }),
  on(addPage, (state): GoodsState => {
    return {
      ...state,
      page: state.page + 1,
    };
  }),
);

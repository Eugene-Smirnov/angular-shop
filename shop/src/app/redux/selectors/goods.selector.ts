import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GoodsState } from '../models/state.models';
import { goodsFeatureKey } from '../reducers/goods.reducer';

export const getGoodsState = createFeatureSelector<GoodsState>(goodsFeatureKey);

export const getGoods = createSelector(getGoodsState, (state) => state.goods);

export const getCategoryId = createSelector(getGoodsState, (state) => state.categoryId);

export const getSubCategoryId = createSelector(getGoodsState, (state) => state.subCategoryId);

export const getLastItemIndex = createSelector(getGoodsState, (state) => state.lastItemIndex);

export const isNotLastPage = createSelector(getGoodsState, (state) => state.isNotLastPage);

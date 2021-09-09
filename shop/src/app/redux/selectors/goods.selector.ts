import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GoodsItemModel } from 'src/app/goods/models/goods-item.model';
import { GoodsState } from '../models/state.models';
import { goodsFeatureKey } from '../reducers/goods.reducer';

export const getGoodsState = createFeatureSelector<GoodsState>(goodsFeatureKey);

export const getGoods = createSelector(getGoodsState, (state) => state.goods);

export const getCategoryId = createSelector(getGoodsState, (state) => state.categoryId);

export const getSubCategoryId = createSelector(getGoodsState, (state) => state.subCategoryId);

export const getPage = createSelector(getGoodsState, (state) => state.page);

export const getPagesTotal = createSelector(getGoodsState, (state) => state.pagesTotal);

export const getGoodsByPage = createSelector(
  getGoods,
  getPage,
  (goods: GoodsItemModel[], pageNumber: number) => {
    return [...goods].slice(0, 10 + (pageNumber - 1) * 10);
  },
);

export const isNotLastPage = createSelector(
  getPage,
  getPagesTotal,
  (pageNumber: number, pagesTotal: number) => {
    return pageNumber !== pagesTotal;
  },
);

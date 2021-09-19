import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GoodsState } from '../models/state.models';
import { goodsFeatureKey } from '../reducers/goods.reducer';
import { selectCart, selectFavorites } from './user.selector';

export const selectGoodsState = createFeatureSelector<GoodsState>(goodsFeatureKey);

export const selectGoods = createSelector(selectGoodsState, (state) => state.goods);

export const selectCategoryId = createSelector(selectGoodsState, (state) => state.categoryId);

export const selectSubCategoryId = createSelector(selectGoodsState, (state) => state.subCategoryId);

export const selectLastItemIndex = createSelector(selectGoodsState, (state) => state.lastItemIndex);

export const selectIsNotLastPage = createSelector(selectGoodsState, (state) => state.isNotLastPage);

export const selectUserPipedGoods = createSelector(
  selectGoods,
  selectFavorites,
  selectCart,
  (goods, favorites, cart) => {
    if (!favorites || !cart) return goods;
    return goods.map((item) => {
      return { ...item, isFavorite: favorites.includes(item.id), isInCart: cart.includes(item.id) };
    });
  },
);

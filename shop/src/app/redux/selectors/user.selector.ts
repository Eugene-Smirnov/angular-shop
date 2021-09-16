import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../models/state.models';
import { userFeatureKey } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const selectUserInfo = createSelector(selectUserState, (state) => state.info);

export const selectFavorites = createSelector(selectUserInfo, (info) => info?.favorites || null);

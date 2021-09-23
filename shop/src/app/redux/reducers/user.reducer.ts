import { createReducer, on } from '@ngrx/store';
import { loadUserInfo, userInfoLoadedSuccess, userInfoLoadFailure } from '../actions/user.actions';
import { UserState } from '../models/state.models';

export const userFeatureKey = 'userState';

export const initialState: UserState = { info: null };

export const userReducer = createReducer(
  initialState,
  on(loadUserInfo, (): UserState => {
    return { ...initialState };
  }),
  on(userInfoLoadedSuccess, (state, { loadedInfo }): UserState => {
    return { info: { ...loadedInfo } };
  }),
  on(userInfoLoadFailure, (): UserState => {
    return { ...initialState };
  }),
);

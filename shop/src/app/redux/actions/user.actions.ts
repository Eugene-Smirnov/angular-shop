import { createAction, props } from '@ngrx/store';
import { UserInfoModel } from 'src/app/user/models/user-info.model';

export const USER_ACTIONS_NAMES = {
  LOAD: '[USER] Load user info',
  LOADED_SUCCESS: '[USER] Info loaded successfully',
  LOAD_FAILURE: '[USER] Info not loaded',
  LOG_OUT: '[USER] Delete user info and token',
};

export const loadUserInfo = createAction(USER_ACTIONS_NAMES.LOAD);

export const userInfoLoadedSuccess = createAction(
  USER_ACTIONS_NAMES.LOADED_SUCCESS,
  props<{ loadedInfo: UserInfoModel }>(),
);

export const userInfoLoadFailure = createAction(USER_ACTIONS_NAMES.LOAD_FAILURE);

export const logOut = createAction(USER_ACTIONS_NAMES.LOG_OUT);

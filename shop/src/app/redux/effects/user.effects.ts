import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/user/services/user.service';
import {
  loadUserInfo,
  logOut,
  userInfoLoadedSuccess,
  userInfoLoadFailure,
} from '../actions/user.actions';

@Injectable()
export class UserInfoEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUserInfo),
      mergeMap(() =>
        this.userService.getUserInfo().pipe(
          map((loadedInfo) => {
            if (loadedInfo) return userInfoLoadedSuccess({ loadedInfo });
            return userInfoLoadFailure();
          }),
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  logOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logOut),
      map(() => {
        this.userService.logout();
        return userInfoLoadFailure();
      }),
    );
  });
}

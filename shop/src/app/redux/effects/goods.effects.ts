import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GoodsService } from 'src/app/goods/services/goods.service';
import {
  goodsLoadedSuccess,
  loadCategoryGoods,
  loadSubCategoryGoods,
} from '../actions/goods.actions';

@Injectable()
export class LoadCategoryGoodsEffect {
  loadGoods$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCategoryGoods),
      mergeMap((action) => {
        return this.goodsService.getByCategoryId(action.categoryId).pipe(
          map((goods) => goodsLoadedSuccess({ loadedGoods: goods })),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private goodsService: GoodsService) {}
}

@Injectable()
export class LoadSubCategoryGoodsEffect {
  loadGoods$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSubCategoryGoods),
      mergeMap((action) => {
        return this.goodsService.getBySubCategoryId(action.categoryId, action.subCategoryId).pipe(
          map((goods) => goodsLoadedSuccess({ loadedGoods: goods })),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private goodsService: GoodsService) {}
}

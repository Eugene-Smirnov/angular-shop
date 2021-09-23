import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GoodsService } from 'src/app/goods/services/goods.service';
import {
  addCategoryPage,
  addSubCategoryPage,
  goodsLoadedSuccess,
  loadCategoryGoods,
  loadSubCategoryGoods,
  resetCategory,
  resetSubCategory,
} from '../actions/goods.actions';

@Injectable()
export class LoadCategoryGoodsEffect {
  loadGoods$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCategoryGoods, addCategoryPage, resetCategory),
      mergeMap((action) => {
        return this.goodsService.getByCategoryId(action.categoryId, action.fromIndex).pipe(
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
      ofType(loadSubCategoryGoods, addSubCategoryPage, resetSubCategory),
      mergeMap((action) => {
        return this.goodsService
          .getBySubCategoryId(action.categoryId, action.subCategoryId, action.fromIndex)
          .pipe(
            map((goods) => goodsLoadedSuccess({ loadedGoods: goods })),
            catchError(() => EMPTY),
          );
      }),
    );
  });

  constructor(private actions$: Actions, private goodsService: GoodsService) {}
}

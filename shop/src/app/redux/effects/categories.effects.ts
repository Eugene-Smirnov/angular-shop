import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/category.service';
import { categoriesLoadedSuccess, loadCategories } from '../actions/categories.actions';

@Injectable()
export class LoadCategoriesEffect {
  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCategories),
      mergeMap(() =>
        this.categoryService.getAll().pipe(
          map((categories) => categoriesLoadedSuccess({ loadedCategories: categories })),
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  constructor(private actions$: Actions, private categoryService: CategoryService) {}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category.model';
import { SubCategorySearchModel } from '../models/subcategory.model';
import { GoodsItemModel } from 'src/app/goods/models/goods-item.model';
import { map } from 'rxjs/operators';
import { GOODS_SEARCH_URL } from 'src/app/shared/variables';
import { Store } from '@ngrx/store';
import { selectCategories } from 'src/app/redux/selectors/categories.selectors';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient, private store: Store) {}

  categories$: Observable<CategoryModel[]> = this.store.select(selectCategories);

  searchCategory(value: string): Observable<CategoryModel[]> {
    value = value.toLowerCase();
    return this.categories$.pipe(
      map((categories) => {
        return categories.filter((category) => category.name.toLowerCase().includes(value));
      }),
    );
  }

  searchSubCategory(value: string): Observable<SubCategorySearchModel[]> {
    value = value.toLowerCase();
    return this.categories$.pipe(
      map((categories) => {
        return categories
          .map((category) =>
            category.subCategories
              .filter((subCategory) => subCategory.name.toLowerCase().includes(value))
              .map((subCategory) => {
                return { ...subCategory, categoryId: category.id };
              }),
          )
          .reduce((acc, val) => acc.concat(val), []);
      }),
    );
  }

  searchGoods(value: string): Observable<GoodsItemModel[]> {
    value = value.toLowerCase();
    return this.http.get<GoodsItemModel[]>(`${GOODS_SEARCH_URL}${value}`);
  }
}

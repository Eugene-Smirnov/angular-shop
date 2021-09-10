import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoryToURL, itemToURL, subCategoryToURL } from 'src/app/shared/variables';
import { GoodsItemModel } from '../models/goods-item.model';

@Injectable({
  providedIn: 'root',
})
export class GoodsService {
  constructor(private http: HttpClient) {}

  getByCategoryId(categoryId: string, fromIndex: number): Observable<GoodsItemModel[]> {
    return this.http.get<GoodsItemModel[]>(categoryToURL(categoryId, fromIndex));
  }

  getBySubCategoryId(
    categoryId: string,
    subCategoryId: string,
    fromIndex: number,
  ): Observable<GoodsItemModel[]> {
    return this.http.get<GoodsItemModel[]>(subCategoryToURL(categoryId, subCategoryId, fromIndex));
  }

  getByItemId(itemId: string): Observable<GoodsItemModel> {
    return this.http.get<GoodsItemModel>(itemToURL(itemId));
  }
}

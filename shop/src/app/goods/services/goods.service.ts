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

  getByCategoryId(categoryId: string): Observable<GoodsItemModel[]> {
    return this.http.get<GoodsItemModel[]>(categoryToURL(categoryId));
  }

  getBySubCategoryId(categoryId: string, subCategoryId: string): Observable<GoodsItemModel[]> {
    return this.http.get<GoodsItemModel[]>(subCategoryToURL(categoryId, subCategoryId));
  }

  getByItemId(itemId: string): Observable<GoodsItemModel[]> {
    return this.http.get<GoodsItemModel[]>(itemToURL(itemId));
  }
}

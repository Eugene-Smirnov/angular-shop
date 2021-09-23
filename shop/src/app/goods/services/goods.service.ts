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

  private _sortBy: '' | 'price' | 'rating' = '';

  private _reverse: boolean = false;

  getByCategoryId(categoryId: string, fromIndex: number): Observable<GoodsItemModel[]> {
    return this.http.get<GoodsItemModel[]>(
      categoryToURL(categoryId, fromIndex, this._sortBy, this._reverse),
    );
  }

  getBySubCategoryId(
    categoryId: string,
    subCategoryId: string,
    fromIndex: number,
  ): Observable<GoodsItemModel[]> {
    return this.http.get<GoodsItemModel[]>(
      subCategoryToURL(categoryId, subCategoryId, fromIndex, this._sortBy, this._reverse),
    );
  }

  getByItemId(itemId: string): Observable<GoodsItemModel> {
    return this.http.get<GoodsItemModel>(itemToURL(itemId));
  }

  getSortBy(): '' | 'price' | 'rating' {
    return this._sortBy;
  }

  getReverse(): boolean {
    return this._reverse;
  }

  setSortBy(value: 'price' | 'rating') {
    this._sortBy = value;
  }

  setReverse(value: boolean) {
    this._reverse = value;
  }

  resetSettings(): void {
    this._sortBy = '';
    this._reverse = false;
  }
}

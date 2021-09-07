import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../models/category.model';
import { CATEGORIES_URL, categoryToURL, subCategoryToURL } from 'src/app/shared/variables';
import { Observable } from 'rxjs';
import { SubCategoryModel } from '../models/subcategory.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(CATEGORIES_URL);
  }
}

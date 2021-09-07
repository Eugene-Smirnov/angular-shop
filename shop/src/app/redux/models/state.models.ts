import { CategoryModel } from 'src/app/core/models/category.model';

export interface AppState {
  categoriesState: CategoriesState;
}

export interface CategoriesState {
  categories: CategoryModel[];
}

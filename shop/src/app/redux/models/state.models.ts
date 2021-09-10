import { CategoryModel } from 'src/app/core/models/category.model';
import { GoodsItemModel } from 'src/app/goods/models/goods-item.model';
import { SortingSettingsModel } from './sorting-settings.model';

export interface AppState {
  categoriesState: CategoriesState;
}

export interface CategoriesState {
  categories: CategoryModel[];
}

export interface GoodsState {
  categoryId: string | '';
  subCategoryId: string | '';
  lastItemIndex: number;
  isNotLastPage: boolean;
  sortingSettings: SortingSettingsModel;
  goods: GoodsItemModel[];
}

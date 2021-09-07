import { SubCategoryModel } from './subcategory.model';

export interface CategoryModel {
  id: string;
  name: string;
  subCategories: SubCategoryModel[];
}

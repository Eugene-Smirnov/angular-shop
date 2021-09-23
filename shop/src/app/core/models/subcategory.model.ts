export interface SubCategoryModel {
  id: string;
  name: string;
}

export interface SubCategorySearchModel extends SubCategoryModel {
  id: string;
  name: string;
  categoryId: string;
}

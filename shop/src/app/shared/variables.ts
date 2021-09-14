import { CategoryModel } from '../core/models/category.model';
import { SubCategorySearchModel } from '../core/models/subcategory.model';
import { GoodsItemModel } from '../goods/models/goods-item.model';

export const SERVER_URL = 'http://localhost:3004';
export const CATEGORIES_URL = `${SERVER_URL}/categories`;

export function categoryToURL(categoryId: string, fromIndex: number): string {
  return `${SERVER_URL}/goods/category/${categoryId}?start=${fromIndex}&count=11`;
}

export function subCategoryToURL(
  categoryId: string,
  subCategoryId: string,
  fromIndex: number,
): string {
  return `${SERVER_URL}/goods/category/${categoryId}/${subCategoryId}?start=${fromIndex}&count=11`;
}

export function itemToURL(itemId: string): string {
  return `${SERVER_URL}/goods/item/${itemId}`;
}

export const GOODS_SEARCH_URL = `${SERVER_URL}/goods/search?text=`;

export function getCategoryLink(category: CategoryModel): [string] {
  return [`/goods/${category.id}`];
}

export function getSubCategoryLink(subCategory: SubCategorySearchModel): [string] {
  return [`/goods/${subCategory.categoryId}/${subCategory.id}`];
}

export function getGoodsLink(item: GoodsItemModel): [string] {
  return [`/goods/item/${item.id}`];
}

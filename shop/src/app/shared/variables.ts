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

export const AUTH_TOKEN_KEY = 'EUGENE_SMIRNOV_ANGULAR_SHOP_TOKEN';

export const USERS_API_URL = `${SERVER_URL}/users`;
export const USERS_API_URLS = {
  LOGIN: `${USERS_API_URL}/login`,
  REGISTER: `${USERS_API_URL}/register`,
  INFO: `${USERS_API_URL}/userInfo`,
  FAVORITES: `${USERS_API_URL}/favorites`,
  FAVORITES_DEL: `${USERS_API_URL}/favorites?id=`,
  CART: `${USERS_API_URL}/cart`,
  CART_DEL: `${USERS_API_URL}/cart?id=`,
  ORDER: `${USERS_API_URL}/order`,
  ORDER_DEL: `${USERS_API_URL}/order?id=`,
};

export const LOGIN_DIALOG_ID = 'LOGIN_DIALOG_ID';

export function ratingToStars(rating: number): string[] {
  if (!rating) return [];
  const arr = [];
  for (let i = 0; i < rating; i++) {
    arr.push('star_rate');
  }
  return arr;
}

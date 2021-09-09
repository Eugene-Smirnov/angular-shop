export const SERVER_URL = 'http://localhost:3004';
export const CATEGORIES_URL = `${SERVER_URL}/categories`;

export function categoryToURL(categoryId: string): string {
  return `${SERVER_URL}/goods/category/${categoryId}`;
}

export function subCategoryToURL(categoryId: string, subCategoryId: string): string {
  return `${categoryToURL(categoryId)}/${subCategoryId}`;
}

export function itemToURL(itemId: string): string {
  return `${SERVER_URL}/goods/item/${itemId}`;
}

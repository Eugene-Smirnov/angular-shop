import { OrderModel } from './order.model';

export interface UserInfoModel {
  firstName: string;
  lastName: string;
  cart: string[];
  favorites: string[];
  orders: OrderModel[];
}

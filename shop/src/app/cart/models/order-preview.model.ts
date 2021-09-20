import { CartItemModel } from './cart-item.model';
import { OrderDetailsModel } from './order-details.model';

export interface OrderPreviewModel {
  items: CartItemModel[];
  details: OrderDetailsModel;
}

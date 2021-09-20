import { GoodsItemModel } from 'src/app/goods/models/goods-item.model';

export interface CartItemModel extends GoodsItemModel {
  amount: number;
  getTotalPrice: () => number;
}

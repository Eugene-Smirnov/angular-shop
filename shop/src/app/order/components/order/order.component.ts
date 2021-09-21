import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CartItemModel } from 'src/app/cart/models/cart-item.model';
import { OrderDetailsModel } from 'src/app/cart/models/order-details.model';
import { GoodsItemModel } from 'src/app/goods/models/goods-item.model';
import { GoodsService } from 'src/app/goods/services/goods.service';
import { OrderModel } from 'src/app/user/models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() order!: OrderModel;

  @Output() formSubmit: EventEmitter<OrderModel> = new EventEmitter();

  @Output() orderDelete: EventEmitter<string> = new EventEmitter();

  constructor(private goodsService: GoodsService) {}

  items: CartItemModel[] = [];

  edit: boolean = false;

  ngOnInit(): void {
    of(this.order.items)
      .pipe(
        switchMap((items) => {
          return forkJoin(
            items.map((item) =>
              this.goodsService.getByItemId(item.id).pipe(
                map<GoodsItemModel, CartItemModel>((goodsItem) => {
                  return {
                    ...goodsItem,
                    amount: item.amount,
                    getTotalPrice() {
                      return this.amount * this.price;
                    },
                  };
                }),
              ),
            ),
          );
        }),
      )
      .subscribe((items) => (this.items = items));
  }

  getOrderPrice(): number {
    if (!this.items || !this.items[0]) return 0;
    return this.items.map((item) => item.amount * item.price).reduce((acc, value) => acc + value);
  }

  onFormSubmit(formResult: OrderDetailsModel): void {
    this.formSubmit.emit({ ...this.order, details: { ...formResult } });
  }
}

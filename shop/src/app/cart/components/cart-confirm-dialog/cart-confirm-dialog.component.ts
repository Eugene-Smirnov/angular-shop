import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderPreviewModel } from '../../models/order-preview.model';

@Component({
  selector: 'app-cart-confirm-dialog',
  templateUrl: './cart-confirm-dialog.component.html',
  styleUrls: ['./cart-confirm-dialog.component.scss'],
})
export class CartConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { order: OrderPreviewModel }) {
    this.order = data.order;
  }

  order: OrderPreviewModel;

  getOrderPrice(): number {
    if (!this.order) return 0;
    return this.order.items
      .map((item) => item.amount * item.price)
      .reduce((acc, value) => (acc += value));
  }
}

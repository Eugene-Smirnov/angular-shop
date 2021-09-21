import { Component, Input, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/cart/models/cart-item.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  @Input() item!: CartItemModel;

  ngOnInit(): void {
    return;
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ratingToStars } from 'src/app/shared/variables';
import { CartItemModel } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() item!: CartItemModel;

  itemLink = '';

  totalPrice = 0;

  @Output() headingClick: EventEmitter<string> = new EventEmitter();

  @Output() incrementClick: EventEmitter<string> = new EventEmitter();

  @Output() decrementClick: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.itemLink = `/goods/item/${this.item.id}`;
  }

  ratingToStars = ratingToStars;
}

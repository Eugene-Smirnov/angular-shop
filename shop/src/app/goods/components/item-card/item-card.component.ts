import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoodsItemModel } from '../../models/goods-item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() item!: GoodsItemModel;

  @Output() headingClick: EventEmitter<string> = new EventEmitter();

  @Output() favoriteClick: EventEmitter<string> = new EventEmitter();

  @Output() removeFavoriteClick: EventEmitter<string> = new EventEmitter();

  itemLink = '';

  availableClass = 'item-card__available_';

  ngOnInit() {
    this.setAvailableClass();
    this.itemLink = `/goods/item/${this.item.id}`;
  }

  setAvailableClass(): void {
    if (this.item.availableAmount >= 20) {
      this.availableClass += '20';
      return;
    } else if (this.item.availableAmount >= 5) {
      this.availableClass += '5';
      return;
    } else if (this.item.availableAmount >= 1) {
      this.availableClass += '1';
      return;
    } else {
      this.availableClass += 'not';
    }
  }
}

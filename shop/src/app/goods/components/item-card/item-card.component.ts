import { Component, Input } from '@angular/core';
import { GoodsItemModel } from '../../models/goods-item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
  @Input() item!: GoodsItemModel;

  availableClass = 'item-card__available_';

  // _not

  ngOnInit() {
    this.setAvailableClass();
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

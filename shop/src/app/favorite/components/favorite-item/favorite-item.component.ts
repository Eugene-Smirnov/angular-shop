import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GoodsItemModel } from 'src/app/goods/models/goods-item.model';
import { ratingToStars } from 'src/app/shared/variables';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss'],
})
export class FavoriteItemComponent {
  @Input() item: GoodsItemModel | null = null;

  @Output() removeClick: EventEmitter<string> = new EventEmitter();

  @Output() toCartClick: EventEmitter<string> = new EventEmitter();

  @Output() removeFromCartClick: EventEmitter<string> = new EventEmitter();

  @Output() linkClick: EventEmitter<string> = new EventEmitter();

  ratingToStars = ratingToStars;
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { GoodsItemModel } from 'src/app/goods/models/goods-item.model';
import { GoodsService } from 'src/app/goods/services/goods.service';
import { ratingToStars } from 'src/app/shared/variables';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss'],
})
export class FavoriteItemComponent implements OnInit {
  @Input() itemId: string = '';

  @Output() removeClick: EventEmitter<string> = new EventEmitter();

  @Output() linkClick: EventEmitter<string> = new EventEmitter();

  constructor(private goodsService: GoodsService) {}

  ratingToStars = ratingToStars;

  item: GoodsItemModel | null = null;

  ngOnInit(): void {
    this.goodsService
      .getByItemId(this.itemId)
      .pipe(take(1))
      .subscribe((item) => (this.item = item));
  }
}

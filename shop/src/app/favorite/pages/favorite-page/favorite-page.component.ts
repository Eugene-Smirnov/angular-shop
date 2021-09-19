import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GoodsItemModel } from 'src/app/goods/models/goods-item.model';
import { GoodsService } from 'src/app/goods/services/goods.service';
import { loadUserInfo } from 'src/app/redux/actions/user.actions';
import { selectCart, selectFavorites } from 'src/app/redux/selectors/user.selector';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
})
export class FavoritePageComponent implements OnInit {
  constructor(
    private store: Store,
    private userService: UserService,
    private router: Router,
    private goodsService: GoodsService,
  ) {}

  favorites$ = this.store.select(selectFavorites);

  cart$ = this.store.select(selectCart);

  favorites: GoodsItemModel[] = [];

  subscriptions = new Subscription();

  cols: number = 0;

  ngOnInit(): void {
    this.subscriptions.add(
      this.favorites$
        .pipe(
          switchMap((favorites) => {
            if (!favorites || !favorites[0]) return of(null);
            return forkJoin(favorites.map((itemId) => this.goodsService.getByItemId(itemId)));
          }),
          switchMap((favorites) => {
            if (!favorites || !favorites[0]) return of(null);
            return this.cart$.pipe(
              map((cart) => {
                if (!cart || !cart[0]) return favorites;
                return favorites.map((item) => {
                  return { ...item, isInCart: cart.includes(item.id) };
                });
              }),
            );
          }),
        )
        .subscribe((favorites) => {
          if (!favorites || !favorites[0]) {
            this.favorites = [];
            return;
          }
          this.favorites = favorites;
          this.cols = Math.ceil(this.favorites.length / 2);
        }),
    );
  }

  onRemoveClick(itemId: string): void {
    this.userService.deleteFavorite(itemId).subscribe(() => {
      this.store.dispatch(loadUserInfo());
    });
  }

  onToCartClick(itemId: string): void {
    this.userService.addToCart(itemId).subscribe(() => {
      this.store.dispatch(loadUserInfo());
    });
  }

  onRemoveFromCartClick(itemId: string): void {
    this.userService.deleteFromCart(itemId).subscribe(() => {
      this.store.dispatch(loadUserInfo());
    });
  }

  onLinkClick(toPath: string): void {
    this.router.navigate([toPath]);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin, of, Subscription } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';
import { GoodsService } from 'src/app/goods/services/goods.service';
import { loadUserInfo } from 'src/app/redux/actions/user.actions';
import { selectCart } from 'src/app/redux/selectors/user.selector';
import { UserService } from 'src/app/user/services/user.service';
import { CartConfirmDialogComponent } from '../../components/cart-confirm-dialog/cart-confirm-dialog.component';
import { CartItemModel } from '../../models/cart-item.model';
import { OrderDetailsModel } from '../../models/order-details.model';
import { OrderPreviewModel } from '../../models/order-preview.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private userService: UserService,
    private router: Router,
    private goodsService: GoodsService,
    public dialog: MatDialog,
  ) {}

  cart$ = this.store.select(selectCart);

  cart: CartItemModel[] = [];

  subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.cart$
        .pipe(
          switchMap((goods) => {
            if (!goods || !goods[0]) return of(null);
            return forkJoin(goods.map((itemId) => this.goodsService.getByItemId(itemId)));
          }),
          map((goods) => {
            if (!goods || !goods[0]) return null;
            return goods.map((item) => {
              return {
                ...item,
                amount: 1,
                getTotalPrice() {
                  return this.price * this.amount;
                },
              };
            });
          }),
        )
        .subscribe((cart) => {
          if (!cart || !cart[0]) {
            this.cart = [];
            return;
          }
          this.cart = cart;
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onRemoveClick(itemId: string): void {
    this.userService.deleteFromCart(itemId).subscribe(() => {
      this.store.dispatch(loadUserInfo());
    });
  }

  onLinkClick(toPath: string): void {
    this.router.navigate([toPath]);
  }

  incrementItem(id: string): void {
    const item = this.cart.find((cartItem) => cartItem.id === id);
    if (!item) return;
    item.amount++;
  }

  decrementItem(id: string): void {
    const item = this.cart.find((cartItem) => cartItem.id === id);
    if (!item) return;
    item.amount--;
  }

  getTotalPrice(): number {
    return this.cart.map((item) => item.amount * item.price).reduce((acc, value) => (acc += value));
  }

  onFormSubmit(orderDetails: OrderDetailsModel): void {
    const orderPreview: OrderPreviewModel = {
      items: [...this.cart],
      details: orderDetails,
    };

    this.openConfirmDialog(orderPreview);
  }

  openConfirmDialog(orderPreview: OrderPreviewModel): void {
    const dialogRef = this.dialog.open(CartConfirmDialogComponent, {
      data: { order: orderPreview },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.addOrder(orderPreview);
    });
  }

  addOrder(orderPreview: OrderPreviewModel): void {
    this.userService
      .addOrder({
        items: orderPreview.items.map(({ id, amount }) => {
          return { id, amount };
        }),

        details: { ...orderPreview.details },
      })
      .pipe(
        switchMapTo(
          of(orderPreview.items).pipe(
            switchMap((items) => {
              return forkJoin(items.map(({ id }) => this.userService.deleteFromCart(id)));
            }),
          ),
        ),
      )
      .subscribe(() => {
        this.router.navigate(['/orders']);
      });
  }
}

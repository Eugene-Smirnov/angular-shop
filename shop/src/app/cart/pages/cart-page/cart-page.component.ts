import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadUserInfo } from 'src/app/redux/actions/user.actions';
import { selectCart } from 'src/app/redux/selectors/user.selector';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private userService: UserService, private router: Router) {}

  cart$ = this.store.select(selectCart);

  cart: string[] | null = [];

  subscriptions = new Subscription();

  panelOpenState = false;

  ngOnInit(): void {
    this.subscriptions.add(
      this.cart$.subscribe((cart) => {
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
}

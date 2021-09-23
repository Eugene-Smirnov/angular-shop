import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadUserInfo } from 'src/app/redux/actions/user.actions';
import { selectOrders } from 'src/app/redux/selectors/user.selector';
import { OrderModel } from 'src/app/user/models/order.model';
import { UserService } from 'src/app/user/services/user.service';
import { OrderDeleteDialogComponent } from '../../components/order-delete-dialog/order-delete-dialog.component';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private userService: UserService, public dialog: MatDialog) {
    this.store.dispatch(loadUserInfo());
  }

  orders$ = this.store.select(selectOrders);

  orders: OrderModel[] = [];

  subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.orders$.subscribe((orders) => {
        if (!orders || !orders[0]) {
          this.orders = [];
          return;
        }
        this.orders = orders;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onFormSubmit(changedOrder: OrderModel): void {
    this.userService
      .editOrder(changedOrder, changedOrder.id)
      .subscribe(() => this.store.dispatch(loadUserInfo()));
  }

  onOrderDelete(orderId: string): void {
    this.dialog
      .open(OrderDeleteDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.userService
            .deleteOrder(orderId)
            .subscribe(() => this.store.dispatch(loadUserInfo()));
        }
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AUTH_TOKEN_KEY, USERS_API_URLS } from 'src/app/shared/variables';
import { UserInfoModel } from '../models/user-info.model';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(USERS_API_URLS.LOGIN, { login, password }).pipe(
      map(({ token }) => {
        window.localStorage.setItem(AUTH_TOKEN_KEY, token);
        return true;
      }),
      catchError(() => of(false)),
    );
  }

  logout(): void {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  register(login: string, password: string, firstName: string, lastName: string): void {
    this.http
      .post<{ token: string }>(USERS_API_URLS.REGISTER, { firstName, lastName, login, password })
      .pipe(
        map(({ token }) => {
          window.localStorage.setItem(AUTH_TOKEN_KEY, token);
        }),
      );
  }

  getUserInfo(): Observable<UserInfoModel | boolean> {
    return this.http.get<UserInfoModel>(USERS_API_URLS.INFO).pipe(catchError(() => of(false)));
  }

  addFavorite(itemId: string): void {
    this.http.post(USERS_API_URLS.FAVORITES, { id: itemId });
  }

  deleteFavorite(itemId: string): void {
    this.http.delete(USERS_API_URLS.FAVORITES_DEL + itemId);
  }

  addToCart(itemId: string): void {
    this.http.post(USERS_API_URLS.CART, { id: itemId });
  }

  deleteFromCart(itemId: string): void {
    this.http.delete(USERS_API_URLS.CART_DEL + itemId);
  }

  addOrder(order: OrderModel): void {
    this.http.post(USERS_API_URLS.ORDER, { ...order });
  }

  editOrder(order: OrderModel, orderId: string): void {
    this.http.put(USERS_API_URLS.ORDER, { ...order, id: orderId });
  }

  deleteOrder(orderId: string): void {
    this.http.delete(USERS_API_URLS.ORDER_DEL + orderId);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMapTo } from 'rxjs/operators';
import { AUTH_TOKEN_KEY, USERS_API_URLS } from 'src/app/shared/variables';
import { UserInfoModel } from '../models/user-info.model';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return window.localStorage.getItem(AUTH_TOKEN_KEY);
  }

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

  register(
    login: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Observable<boolean> {
    return this.http
      .post<{ token: string }>(USERS_API_URLS.REGISTER, { firstName, lastName, login, password })
      .pipe(
        map(({ token }) => {
          window.localStorage.setItem(AUTH_TOKEN_KEY, token);
          return true;
        }),
        catchError(() => of(false)),
      );
  }

  getUserInfo(): Observable<UserInfoModel | null> {
    return this.http.get<UserInfoModel>(USERS_API_URLS.INFO).pipe(
      catchError(() => {
        this.logout();
        return of(null);
      }),
    );
  }

  addFavorite(itemId: string): Observable<boolean> {
    return this.http.post(USERS_API_URLS.FAVORITES, { id: itemId }).pipe(
      switchMapTo(of(true)),
      catchError(() => of(false)),
    );
  }

  deleteFavorite(itemId: string): Observable<boolean> {
    return this.http.delete(USERS_API_URLS.FAVORITES_DEL + itemId).pipe(
      switchMapTo(of(true)),
      catchError(() => of(false)),
    );
  }

  addToCart(itemId: string): Observable<boolean> {
    return this.http.post(USERS_API_URLS.CART, { id: itemId }).pipe(
      switchMapTo(of(true)),
      catchError(() => of(false)),
    );
  }

  deleteFromCart(itemId: string): Observable<boolean> {
    return this.http.delete(USERS_API_URLS.CART_DEL + itemId).pipe(
      switchMapTo(of(true)),
      catchError(() => of(false)),
    );
  }

  addOrder(order: OrderModel): Observable<boolean> {
    return this.http.post(USERS_API_URLS.ORDER, { ...order }).pipe(
      switchMapTo(of(true)),
      catchError(() => of(false)),
    );
  }

  editOrder(order: OrderModel, orderId: string): Observable<boolean> {
    return this.http.put(USERS_API_URLS.ORDER, { ...order, id: orderId }).pipe(
      switchMapTo(of(true)),
      catchError(() => of(false)),
    );
  }

  deleteOrder(orderId: string): Observable<boolean> {
    return this.http.delete(USERS_API_URLS.ORDER_DEL + orderId).pipe(
      switchMapTo(of(true)),
      catchError(() => of(false)),
    );
  }
}

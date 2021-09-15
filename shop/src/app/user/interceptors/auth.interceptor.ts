import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AUTH_TOKEN_KEY, USERS_API_URL } from 'src/app/shared/variables';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return next.handle(req);
    if (req.url.includes(USERS_API_URL)) {
      const paramReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(paramReq);
    }

    return next.handle(req);
  }
}

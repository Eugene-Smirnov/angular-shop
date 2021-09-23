import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, Router } from '@angular/router';
import { AUTH_TOKEN_KEY } from 'src/app/shared/variables';
import { DialogAuthComponent } from '../components/dialog-auth/dialog-auth.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public dialog: MatDialog) {}

  canActivate(): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
      return true;
    }

    this.dialog.open(DialogAuthComponent);
    return false;
  }
}

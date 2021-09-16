import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { loadUserInfo } from 'src/app/redux/actions/user.actions';
import { UserService } from 'src/app/user/services/user.service';

export interface LoginDialogData {
  id: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private userService: UserService, private store: Store, public dialog: MatDialog) {}

  loginControl = new FormControl('');

  passwordControl = new FormControl('');

  firstNameControl = new FormControl('');

  lastNameControl = new FormControl('');

  hide: boolean = true;

  onLoginClick() {
    this.userService
      .login(this.loginControl.value, this.passwordControl.value)
      .pipe(take(1))
      .subscribe((value) => {
        if (value) {
          this.store.dispatch(loadUserInfo());
          this.dialog.closeAll();
          return;
        }
        // some alert logic
      });
  }

  onRegisterClick() {
    // Validation logic
    this.userService
      .register(
        this.loginControl.value,
        this.passwordControl.value,
        this.firstNameControl.value,
        this.lastNameControl.value,
      )
      .pipe(take(1))
      .subscribe((value) => {
        if (value) {
          this.store.dispatch(loadUserInfo());
          this.dialog.closeAll();
          return;
        }
        // some alert logic
      });
  }
}

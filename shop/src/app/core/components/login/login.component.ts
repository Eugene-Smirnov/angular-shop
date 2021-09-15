import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  loginControl = new FormControl('');

  passwordControl = new FormControl('');

  hide: boolean = true;

  onLoginClick() {
    this.authService
      .login(this.loginControl.value, this.passwordControl.value)
      .pipe(take(1))
      .subscribe(console.log);
  }
}

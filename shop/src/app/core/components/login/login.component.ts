import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: UserService) {}

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

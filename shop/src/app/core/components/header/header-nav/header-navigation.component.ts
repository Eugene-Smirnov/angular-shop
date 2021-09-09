import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.scss'],
})
export class HeaderNavigationComponent {
  value = '';

  @Output() toCategories = new EventEmitter();

  @Output() toMain = new EventEmitter();

  placeholder = 'Поиск товаров';
}

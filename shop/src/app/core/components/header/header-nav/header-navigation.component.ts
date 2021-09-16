import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UserInfoModel } from 'src/app/user/models/user-info.model';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.scss'],
})
export class HeaderNavigationComponent implements OnInit, OnDestroy {
  @Input() userInfo: UserInfoModel | null = null;

  @Output() navigateClick = new EventEmitter<string>();

  @Output() loginClick = new EventEmitter();

  @Output() logoutClick = new EventEmitter();

  @Output() searchInputChange = new EventEmitter<string>();

  searchValue = new FormControl('');

  searchValue$: Observable<string> = this.searchValue.valueChanges.pipe(debounceTime(500));

  subscriptions = new Subscription();

  placeholder = 'Поиск товаров';

  resetSearchValue(): void {
    this.searchValue.reset();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.searchValue$.subscribe((value) => this.searchInputChange.emit(value)),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

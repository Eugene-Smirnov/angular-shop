import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { GoodsItemModel } from 'src/app/goods/models/goods-item.model';
import { loadCategories } from 'src/app/redux/actions/categories.actions';
import { CategoryModel } from '../../models/category.model';
import { SubCategorySearchModel } from '../../models/subcategory.model';
import { SearchService } from '../../services/search.service';
import { LoginComponent } from '../login/login.component';
import { UserInfoModel } from 'src/app/user/models/user-info.model';
import { loadUserInfo, logOut } from 'src/app/redux/actions/user.actions';
import { Observable } from 'rxjs';
import { selectUserInfo } from 'src/app/redux/selectors/user.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private store: Store,
    private router: Router,
    public dialog: MatDialog,
    private searchService: SearchService,
  ) {}

  userInfo$: Observable<UserInfoModel | null> = this.store.select(selectUserInfo);

  isSearchResultsOpened: boolean = false;

  searchCategories: CategoryModel[] = [];

  searchSubCategories: SubCategorySearchModel[] = [];

  searchGoods: GoodsItemModel[] = [];

  ngOnInit() {
    // eslint-disable-next-line ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(loadUserInfo());
    // eslint-disable-next-line ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(loadCategories());
  }

  onSearchInputChange(value: string | null) {
    if (!value || value.length < 3) {
      this.isSearchResultsOpened = false;
      return;
    }
    this.isSearchResultsOpened = true;
    this.searchService
      .searchCategory(value)
      .subscribe((categories) => (this.searchCategories = categories));
    this.searchService
      .searchSubCategory(value)
      .subscribe((subCategories) => (this.searchSubCategories = subCategories));
    this.searchService.searchGoods(value).subscribe((goods) => (this.searchGoods = goods));
  }

  openLogin(): void {
    this.dialog.open(LoginComponent);
  }

  onLogoutClick(): void {
    this.store.dispatch(logOut());
  }

  onIsClickOnSearchResults(value: boolean) {
    if (value === false) this.isSearchResultsOpened = value;
  }

  onLinkClick(value: [string]) {
    this.router.navigate(value);
  }
}

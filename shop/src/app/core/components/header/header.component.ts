import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GoodsItemModel } from 'src/app/goods/models/goods-item.model';
import { loadCategories } from 'src/app/redux/actions/categories.actions';
import { CategoryModel } from '../../models/category.model';
import { SubCategorySearchModel } from '../../models/subcategory.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store, private router: Router, private searchService: SearchService) {}

  isSearchResultsOpened: boolean = false;

  searchCategories: CategoryModel[] = [];

  searchSubCategories: SubCategorySearchModel[] = [];

  searchGoods: GoodsItemModel[] = [];

  ngOnInit() {
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

  onIsClickOnSearchResults(value: boolean) {
    if (value === false) this.isSearchResultsOpened = value;
  }

  onLinkClick(value: [string]) {
    this.router.navigate(value);
  }

  onCategoriesClick() {
    this.onLinkClick(['/categories']);
  }

  onLogoClick() {
    this.onLinkClick(['/']);
  }
}

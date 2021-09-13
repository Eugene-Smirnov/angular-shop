import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadCategories } from 'src/app/redux/actions/categories.actions';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store, private router: Router, private searchService: SearchService) {}

  ngOnInit() {
    this.store.dispatch(loadCategories());
  }

  onSearchInputChange(value: string) {
    if (value.length < 3) return;
    this.searchService.searchSubCategory(value).subscribe(console.log);
    this.searchService.searchCategory(value).subscribe(console.log);
    this.searchService.searchGoods(value).subscribe(console.log);
  }

  onCategoriesClick() {
    this.router.navigate(['/categories']);
  }

  onLogoClick() {
    this.router.navigate(['/']);
  }
}

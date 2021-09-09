import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadCategories } from 'src/app/redux/actions/categories.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(loadCategories());
  }

  onCategoriesClick() {
    this.router.navigate(['/categories']);
  }

  onLogoClick() {
    this.router.navigate(['/']);
  }
}

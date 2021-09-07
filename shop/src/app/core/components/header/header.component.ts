import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCategories } from 'src/app/redux/actions/categories.actions';
import { CategoryModel } from '../../models/category.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadCategories());
  }

  ngOnDestroy() {}
}

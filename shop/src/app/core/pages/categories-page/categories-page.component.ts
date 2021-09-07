import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { debounceTime, find, map, switchMap } from 'rxjs/operators';
import { getCategories } from 'src/app/redux/selectors/categories.selectors';
import { SubCategoryModel } from '../../models/subcategory.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit, OnDestroy {
  constructor(private categoryService: CategoryService, private store: Store) {}

  activeCategoryControl = new FormControl();
  activeCategory$: Observable<string> = this.activeCategoryControl.valueChanges.pipe(
    debounceTime(200),
    map((value) => value),
  );
  categories$ = this.store.select(getCategories);
  subCategories: SubCategoryModel[] = [];

  ngOnInit() {
    this.categories$.subscribe((categories) =>
      this.activeCategoryControl.setValue(categories[0]?.id),
    );

    this.activeCategory$
      .pipe(
        switchMap((activeCategoryId) => {
          return this.categories$.pipe(
            map(
              (categories) =>
                categories.find((category) => activeCategoryId === category.id)?.subCategories,
            ),
          );
        }),
      )
      .subscribe((subCategories) => {
        if (subCategories) this.subCategories = subCategories;
      });
  }

  onCategoryHover(categoryId: string) {
    this.activeCategoryControl.setValue(categoryId);
  }

  ngOnDestroy() {}
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { selectCategories } from 'src/app/redux/selectors/categories.selectors';
import { CategoryModel } from '../../models/category.model';
import { SubCategoryModel } from '../../models/subcategory.model';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private store: Store) {}

  private subscriptions: Subscription = new Subscription();

  activeCategoryControl = new FormControl('');

  categories$ = this.store.select(selectCategories);

  activeCategoryId$: Observable<string> = this.activeCategoryControl.valueChanges.pipe(
    debounceTime(200),
  );

  activeCategory$: Observable<CategoryModel | undefined> = this.categories$.pipe(
    switchMap((categories) =>
      this.activeCategoryId$.pipe(
        map((activeCategoryId) => {
          const cat = categories.find((category) => activeCategoryId === category.id);
          if (cat) return cat;
          return;
        }),
      ),
    ),
  );

  activeCategory: CategoryModel | undefined;

  subCategories$: Observable<SubCategoryModel[]> = this.categories$.pipe(
    switchMap((categories) =>
      this.activeCategoryId$.pipe(
        map((activeCategoryId) => {
          const subCategories = categories.find(
            (category) => activeCategoryId === category.id,
          )?.subCategories;
          if (subCategories) return subCategories;
          return [];
        }),
      ),
    ),
  );

  subCategories: SubCategoryModel[] = [];

  ngOnInit() {
    this.subscriptions.add(
      this.activeCategory$.subscribe((activeCategory) => (this.activeCategory = activeCategory)),
    );

    this.subscriptions.add(
      this.subCategories$.subscribe((subCategories) => (this.subCategories = subCategories)),
    );

    this.subscriptions.add(
      this.categories$.subscribe((categories) =>
        this.activeCategoryControl.setValue(categories[0]?.id),
      ),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onCategoryHover(categoryId: string) {
    this.activeCategoryControl.setValue(categoryId);
  }

  onCategoryClick(categoryId: string | undefined) {
    if (!categoryId) return;
    this.router.navigate([`/goods/${categoryId}`]);
  }

  onSubCategoryClick(subCategoryId: string | undefined) {
    if (!subCategoryId || !this.activeCategory) return;
    this.router.navigate([`/goods/${this.activeCategory.id}/${subCategoryId}`]);
  }
}

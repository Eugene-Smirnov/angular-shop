import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CategoryModel } from 'src/app/core/models/category.model';
import { getCategories } from 'src/app/redux/selectors/categories.selectors';
import { BreadcrumpModel } from '../../models/breadcrump.model';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {}

  private subscriptions: Subscription = new Subscription();

  category: CategoryModel | undefined;

  breadcrumps: BreadcrumpModel[] = [];

  ngOnInit(): void {
    const activatedRoute = this.route.snapshot.params.categoryId;
    this.subscriptions.add(
      this.store.select(getCategories).subscribe((categories) => {
        const category = categories.find((cat) => cat.id === activatedRoute);
        if (category) this.category = category;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onBreadcrumpClick(path: string): void {
    this.router.navigate([path]);
  }
}

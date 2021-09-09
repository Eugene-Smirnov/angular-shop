import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  addPage,
  loadCategoryGoods,
  loadSubCategoryGoods,
} from 'src/app/redux/actions/goods.actions';
import { getCategories } from 'src/app/redux/selectors/categories.selectors';
import { getGoodsByPage, getPage, isNotLastPage } from 'src/app/redux/selectors/goods.selector';
import { BreadcrumpModel } from '../../models/breadcrump.model';
import { GoodsItemModel } from '../../models/goods-item.model';

@Component({
  selector: 'app-category-page',
  templateUrl: './goods-list-page.html',
  styleUrls: ['./goods-list-page.scss'],
})
export class GoodsListPageComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {}

  private subscriptions: Subscription = new Subscription();

  headingName: string | undefined;

  breadcrumps: BreadcrumpModel[] = [];

  goods$: Observable<GoodsItemModel[]> = this.store.select(getGoodsByPage);

  page$: Observable<number> = this.store.select(getPage);

  isNotLastPage$: Observable<boolean> = this.store.select(isNotLastPage).pipe();

  ngOnInit(): void {
    const routerCategoryId = this.route.snapshot.params.categoryId;
    const routerSubCategoryId = this.route.snapshot.params.subCategoryId;

    if (routerSubCategoryId) {
      this.store.dispatch(
        loadSubCategoryGoods({ categoryId: routerCategoryId, subCategoryId: routerSubCategoryId }),
      );

      this.subscriptions.add(
        this.store.select(getCategories).subscribe((categories) => {
          const category = categories.find((cat) => cat.id === routerCategoryId);
          if (!category) return;
          const subCategory = category.subCategories.find(
            (subCat) => subCat.id === routerSubCategoryId,
          );
          if (!subCategory) return;

          this.headingName = subCategory.name;
          this.breadcrumps = [
            {
              name: category.name,
              path: `goods/${category.id}`,
            },
          ];
        }),
      );
    } else {
      this.store.dispatch(loadCategoryGoods({ categoryId: routerCategoryId }));
      this.subscriptions.add(
        this.store.select(getCategories).subscribe((categories) => {
          const category = categories.find((cat) => cat.id === routerCategoryId);
          if (category) this.headingName = category.name;
        }),
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onBreadcrumpClick(path: string): void {
    this.router.navigate([path]);
  }

  onMoreClick(): void {
    this.store.dispatch(addPage());
  }
}

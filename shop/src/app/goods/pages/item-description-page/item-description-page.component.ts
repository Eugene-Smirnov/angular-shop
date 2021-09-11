import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CategoryModel } from 'src/app/core/models/category.model';
import { selectCategories } from 'src/app/redux/selectors/categories.selectors';
import { BreadcrumbModel } from '../../models/breadcrumb.model';
import { GoodsItemModel } from '../../models/goods-item.model';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-item-description-page',
  templateUrl: './item-description-page.component.html',
  styleUrls: ['./item-description-page.component.scss'],
})
export class ItemDescriptionPageComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private goodsService: GoodsService,
  ) {
    const routerItemId: string = this.route.snapshot.params.itemId;
    this.item$ = this.goodsService.getByItemId(routerItemId);
    this.subscriptions.add(
      this.item$.subscribe((item) => {
        this.item = item;
        this.rating = `${item.rating}/5`;
      }),
    );
  }

  categories$: Observable<CategoryModel[]> = this.store.select(selectCategories);

  item$: Observable<GoodsItemModel>;

  item: GoodsItemModel | undefined;

  rating: string = '0/5';

  subscriptions: Subscription = new Subscription();

  breadcrumbs: BreadcrumbModel[] = [];

  ngOnInit(): void {
    this.subscriptions.add(
      this.item$
        .pipe(
          switchMap((item) => {
            return this.categories$.pipe(
              map((categories) => {
                return {
                  item,
                  categories,
                };
              }),
            );
          }),
        )
        .subscribe(({ item, categories }) => {
          const category = categories.find((cat) => cat.id === item.category);
          if (!category) return;
          const subCategory = category.subCategories.find(
            (subCat) => subCat.id === item.subCategory,
          );
          if (!subCategory) return;
          this.breadcrumbs = [
            {
              name: category.name,
              path: `/goods/${category.id}`,
            },
            {
              name: subCategory.name,
              path: `/goods/${category.id}/${subCategory.id}`,
            },
          ];
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onLinkClick(link: string) {
    this.router.navigate([link]);
  }
}

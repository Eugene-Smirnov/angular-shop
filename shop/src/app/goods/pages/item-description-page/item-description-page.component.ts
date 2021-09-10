import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { getCategories } from 'src/app/redux/selectors/categories.selectors';
import { BreadcrumpModel } from '../../models/breadcrump.model';
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
  }

  item$: Observable<GoodsItemModel>;

  item!: GoodsItemModel;

  subscriptions: Subscription = new Subscription();

  breadcrumps: BreadcrumpModel[] = [];

  ngOnInit(): void {
    this.subscriptions.add(
      this.item$.subscribe((item) => {
        this.item = item;
      }),
    );

    this.subscriptions.add(
      this.item$
        .pipe(
          switchMap((item) => {
            return this.store.select(getCategories).pipe(
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
          this.breadcrumps = [
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
}

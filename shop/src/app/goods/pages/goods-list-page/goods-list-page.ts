import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogAuthComponent } from 'src/app/core/components/dialog-auth/dialog-auth.component';
import { CategoryModel } from 'src/app/core/models/category.model';
import {
  addCategoryPage,
  addSubCategoryPage,
  resetCategory,
  resetGoods,
  resetSubCategory,
} from 'src/app/redux/actions/goods.actions';
import { loadUserInfo } from 'src/app/redux/actions/user.actions';
import { selectCategories } from 'src/app/redux/selectors/categories.selectors';
import { selectUserPipedGoods, selectIsNotLastPage } from 'src/app/redux/selectors/goods.selector';
import { selectUserIsLogged } from 'src/app/redux/selectors/user.selector';
import { UserService } from 'src/app/user/services/user.service';
import { BreadcrumbModel } from '../../models/breadcrumb.model';
import { GoodsItemModel } from '../../models/goods-item.model';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './goods-list-page.html',
  styleUrls: ['./goods-list-page.scss'],
})
export class GoodsListPageComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private goodsService: GoodsService,
  ) {}

  private subscriptions: Subscription = new Subscription();

  headingName: string | undefined;

  breadcrumbs: BreadcrumbModel[] = [];

  sortBy = this.goodsService.getSortBy();

  reverse = this.goodsService.getReverse();

  categories$: Observable<CategoryModel[]> = this.store.select(selectCategories);

  goods$: Observable<GoodsItemModel[]> = this.store.select(selectUserPipedGoods);

  lastItemIndex: number = 0;

  isNotLastPage$: Observable<boolean> = this.store.select(selectIsNotLastPage);

  isUserLogged$: Observable<boolean> = this.store.select(selectUserIsLogged);

  isUserLogged: boolean = false;

  ngOnInit(): void {
    this.goodsService.resetSettings();
    const ids$ = this.route.params.pipe(
      map((params) => {
        return {
          routerCategoryId: params.categoryId,
          routerSubCategoryId: params.subCategoryId,
        };
      }),
    );

    ids$.subscribe((ids) => {
      const routerCategoryId = ids.routerCategoryId;
      const routerSubCategoryId = ids.routerSubCategoryId;
      this.subscriptions.unsubscribe();

      if (routerSubCategoryId) {
        this.store.dispatch(
          resetSubCategory({
            categoryId: routerCategoryId,
            subCategoryId: routerSubCategoryId,
            fromIndex: this.lastItemIndex,
          }),
        );

        this.subscriptions.add(
          this.categories$.subscribe((categories) => {
            const category = categories.find((cat) => cat.id === routerCategoryId);
            if (!category) return;
            const subCategory = category.subCategories.find(
              (subCat) => subCat.id === routerSubCategoryId,
            );
            if (!subCategory) return;

            this.headingName = subCategory.name;
            this.breadcrumbs = [
              {
                name: category.name,
                path: `goods/${category.id}`,
              },
            ];
          }),
        );
      } else {
        this.store.dispatch(
          resetCategory({ categoryId: routerCategoryId, fromIndex: this.lastItemIndex }),
        );

        this.subscriptions.add(
          this.categories$.subscribe((categories) => {
            const category = categories.find((cat) => cat.id === routerCategoryId);
            if (category) this.headingName = category.name;
          }),
        );
      }
    });

    this.subscriptions.add(this.isUserLogged$.subscribe((value) => (this.isUserLogged = value)));
  }

  ngOnDestroy(): void {
    this.goodsService.resetSettings();
    this.subscriptions.unsubscribe();
    this.store.dispatch(resetGoods());
  }

  onLinkClick(path: string): void {
    this.router.navigate([path]);
  }

  onMoreClick(): void {
    const routerCategoryId = this.route.snapshot.params.categoryId;
    const routerSubCategoryId = this.route.snapshot.params.subCategoryId;

    this.lastItemIndex += 10;

    if (routerSubCategoryId) {
      this.store.dispatch(
        addSubCategoryPage({
          categoryId: routerCategoryId,
          subCategoryId: routerSubCategoryId,
          fromIndex: this.lastItemIndex,
        }),
      );
    } else {
      this.store.dispatch(
        addCategoryPage({ categoryId: routerCategoryId, fromIndex: this.lastItemIndex }),
      );
    }
  }

  onFavoriteClick(itemId: string): void {
    if (this.isUserLogged) {
      this.userService.addFavorite(itemId).subscribe((value) => {
        if (value) {
          this.store.dispatch(loadUserInfo());
          return;
        }
        this.dialog.open(DialogAuthComponent);
      });
      return;
    }
    this.dialog.open(DialogAuthComponent);
  }

  onRemoveFavClick(itemId: string): void {
    this.userService.deleteFavorite(itemId).subscribe((value) => {
      if (value) {
        this.store.dispatch(loadUserInfo());
        return;
      }
      this.dialog.open(DialogAuthComponent);
    });
  }

  onToCartClick(itemId: string): void {
    if (this.isUserLogged) {
      this.userService.addToCart(itemId).subscribe((value) => {
        if (value) {
          this.store.dispatch(loadUserInfo());
          return;
        }
        this.dialog.open(DialogAuthComponent);
      });
      return;
    }
    this.dialog.open(DialogAuthComponent);
  }

  onRemoveFromCartClick(itemId: string): void {
    this.userService.deleteFromCart(itemId).subscribe((value) => {
      if (value) {
        this.store.dispatch(loadUserInfo());
        return;
      }
      this.dialog.open(DialogAuthComponent);
    });
  }

  onSortByClick(value: 'price' | 'rating'): void {
    if (this.sortBy === value) {
      if (this.reverse) {
        this.goodsService.resetSettings();
      } else {
        this.goodsService.setReverse(true);
      }
    } else {
      this.goodsService.resetSettings();
      this.goodsService.setSortBy(value);
    }
    this.sortBy = this.goodsService.getSortBy();
    this.reverse = this.goodsService.getReverse();

    const categoryId = this.route.snapshot.params.categoryId;
    const subCategoryId = this.route.snapshot.params.subCategoryId;

    this.lastItemIndex = 0;

    if (subCategoryId) {
      this.store.dispatch(
        resetSubCategory({
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          fromIndex: this.lastItemIndex,
        }),
      );
    } else {
      this.store.dispatch(resetCategory({ categoryId: categoryId, fromIndex: this.lastItemIndex }));
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DialogAuthComponent } from 'src/app/core/components/dialog-auth/dialog-auth.component';
import { CategoryModel } from 'src/app/core/models/category.model';
import { loadUserInfo } from 'src/app/redux/actions/user.actions';
import { selectCategories } from 'src/app/redux/selectors/categories.selectors';
import { selectFavorites, selectUserIsLogged } from 'src/app/redux/selectors/user.selector';
import { UserService } from 'src/app/user/services/user.service';
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
    public dialog: MatDialog,
    private goodsService: GoodsService,
    private userService: UserService,
  ) {
    this.item$ = this.route.params.pipe(
      map((params) => params.itemId as string),
      switchMap((routerItemId) => this.goodsService.getByItemId(routerItemId)),
    );

    this.subscriptions.add(
      this.item$
        .pipe(
          switchMap((item) => {
            return this.favorites$.pipe(
              map((favorites) => {
                if (!favorites) return item;
                return { ...item, isFavorite: favorites.includes(item.id) };
              }),
            );
          }),
        )
        .subscribe((item) => {
          this.item = item;
          this.rating = `${item.rating}/5`;
        }),
    );
  }

  categories$: Observable<CategoryModel[]> = this.store.select(selectCategories);

  item$: Observable<GoodsItemModel>;

  item: GoodsItemModel | undefined;

  favorites$ = this.store.select(selectFavorites);

  rating: string = '0/5';

  subscriptions: Subscription = new Subscription();

  breadcrumbs: BreadcrumbModel[] = [];

  isUserLogged$ = this.store.select(selectUserIsLogged);

  isUserLogged: boolean = false;

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

    this.subscriptions.add(this.isUserLogged$.subscribe((value) => (this.isUserLogged = value)));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onLinkClick(link: string) {
    this.router.navigate([link]);
  }

  onFavoriteClick(): void {
    if (!this.item?.id) return;
    if (this.isUserLogged) {
      this.userService.addFavorite(this.item.id).subscribe((value) => {
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

  onRemoveFavClick(): void {
    if (!this.item?.id) return;
    this.userService.deleteFavorite(this.item.id).subscribe((value) => {
      if (value) {
        this.store.dispatch(loadUserInfo());
        return;
      }
      this.dialog.open(DialogAuthComponent);
    });
  }
}

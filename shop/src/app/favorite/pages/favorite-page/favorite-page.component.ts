import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadUserInfo } from 'src/app/redux/actions/user.actions';
import { selectFavorites } from 'src/app/redux/selectors/user.selector';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
})
export class FavoritePageComponent implements OnInit {
  constructor(private store: Store, private userService: UserService) {}

  favorites$ = this.store.select(selectFavorites);

  favorites: string[] | null = [];

  subscriptions = new Subscription();

  cols: number = 0;

  ngOnInit(): void {
    this.subscriptions.add(
      this.favorites$.subscribe((favorites) => {
        if (!favorites || !favorites[0]) {
          this.favorites = [];
          return;
        }
        this.favorites = favorites;
        this.cols = Math.ceil(this.favorites.length / 2);
      }),
    );
  }

  onRemoveClick(itemId: string): void {
    this.userService.deleteFavorite(itemId).subscribe(() => {
      this.store.dispatch(loadUserInfo());
    });
  }
}

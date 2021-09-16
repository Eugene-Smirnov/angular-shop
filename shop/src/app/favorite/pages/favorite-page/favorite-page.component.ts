import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectFavorites } from 'src/app/redux/selectors/user.selector';

const TEST_FAVS = [
  '612e05c5924cfcce7c08e41c',
  '612e849095c849059d7b3983',
  '612fe4ecf68b66736021e152',
];

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
})
export class FavoritePageComponent implements OnInit {
  constructor(private store: Store) {}

  favorites$ = this.store.select(selectFavorites);

  favorites: string[] | null = [];

  subscriptions = new Subscription();

  cols: number = 0;

  ngOnInit(): void {
    this.subscriptions.add(
      this.favorites$.subscribe((favorites) => {
        if (!favorites || !favorites[0]) {
          this.favorites = TEST_FAVS;
          this.cols = Math.ceil(this.favorites.length / 2);
          console.log(this.cols);
          return;
        }
        this.favorites = favorites;
      }),
    );
  }
}

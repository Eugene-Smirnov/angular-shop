import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CategoryModel } from 'src/app/core/models/category.model';
import { getCategories } from 'src/app/redux/selectors/categories.selectors';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: Store) {}

  category: CategoryModel | undefined;

  ngOnInit(): void {
    const activatedRoute = this.route.snapshot.params.categoryId;
    this.store.select(getCategories).subscribe((categories) => {
      const category = categories.find((cat) => cat.id === activatedRoute);
      if (category) this.category = category;
    });
  }
}

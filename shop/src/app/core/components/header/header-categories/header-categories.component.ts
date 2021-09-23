import { Component, Input } from '@angular/core';
import { CategoryModel } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-header-categories',
  templateUrl: './header-categories.component.html',
  styleUrls: ['./header-categories.component.scss'],
})
export class HeaderCategoriesComponent {
  @Input() categories: CategoryModel[] | null = [];
}

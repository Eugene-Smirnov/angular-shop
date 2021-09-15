import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CategoryModel } from 'src/app/core/models/category.model';
import { SubCategorySearchModel } from 'src/app/core/models/subcategory.model';
import { GoodsItemModel } from 'src/app/goods/models/goods-item.model';
import { getCategoryLink, getGoodsLink, getSubCategoryLink } from 'src/app/shared/variables';

@Component({
  selector: 'app-header-search-results',
  templateUrl: './header-search-results.component.html',
  styleUrls: ['./header-search-results.component.scss'],
})
export class HeaderSearchResultsComponent implements OnInit, OnDestroy {
  @Input() categories: CategoryModel[] = [];

  @Input() subCategories: SubCategorySearchModel[] = [];

  @Input() goods: GoodsItemModel[] = [];

  @Output() linkClick: EventEmitter<[string]> = new EventEmitter();

  @Output() isClickOnComponent: EventEmitter<boolean> = new EventEmitter();

  getCategoryLink = getCategoryLink;

  getSubCategoryLink = getSubCategoryLink;

  getGoodsLink = getGoodsLink;

  elementRef: HTMLElement | null = null;
  // @ViewChild for HTMLelements

  listener = (e: MouseEvent) => {
    // TOOD: onClickOutside - directive
    if (!this.elementRef) return;
    if (this.elementRef.contains(e.target as Node)) {
      this.isClickOnComponent.emit(true);
    } else {
      this.isClickOnComponent.emit(false);
    }
  };

  onLinkClick(value: [string]): void {
    this.linkClick.emit(value);
    this.isClickOnComponent.emit(false);
  }

  ngOnInit() {
    this.elementRef = document.getElementById('header-search-results');
    setTimeout(() => {
      window.addEventListener('click', this.listener, false);
    }, 100);
    console.log('INIT');
  }

  ngOnDestroy() {
    window.removeEventListener('click', this.listener, false);
    console.log('DESTROY');
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoodsRoutingModule } from './goods-routing.module';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { StoreModule } from '@ngrx/store';
import { BreadcrumpsComponent } from './components/breadcrumps/breadcrumps.component';

@NgModule({
  declarations: [CategoryPageComponent, BreadcrumpsComponent],
  imports: [CommonModule, GoodsRoutingModule, StoreModule],
})
export class GoodsModule {}

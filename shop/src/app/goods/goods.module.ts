import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoodsRoutingModule } from './goods-routing.module';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [CategoryPageComponent],
  imports: [CommonModule, GoodsRoutingModule, StoreModule],
})
export class GoodsModule {}

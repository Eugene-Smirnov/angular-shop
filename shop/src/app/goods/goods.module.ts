import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoodsRoutingModule } from './goods-routing.module';
import { GoodsListPageComponent } from './pages/goods-list-page/goods-list-page';
import { StoreModule } from '@ngrx/store';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { GoodsService } from './services/goods.service';

import * as fromGoodsReducer from '../redux/reducers/goods.reducer';
import {
  LoadCategoryGoodsEffect,
  LoadSubCategoryGoodsEffect,
} from '../redux/effects/goods.effects';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { ItemDescriptionPageComponent } from './pages/item-description-page/item-description-page.component';
import { CoreModule } from '../core/core.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    GoodsListPageComponent,
    BreadcrumbsComponent,
    ItemCardComponent,
    ItemDescriptionPageComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    GoodsRoutingModule,
    StoreModule.forFeature(fromGoodsReducer.goodsFeatureKey, fromGoodsReducer.goodsReducer),
    EffectsModule.forFeature([LoadCategoryGoodsEffect, LoadSubCategoryGoodsEffect]),
    MatButtonModule,
    MatDividerModule,
    MatBadgeModule,
    MatDialogModule,
  ],
  providers: [GoodsService],
})
export class GoodsModule {}

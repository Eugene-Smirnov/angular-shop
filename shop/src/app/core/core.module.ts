import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HeaderInfoComponent } from './components/header/header-info/header-info.component';
import { HeaderNavigationComponent } from './components/header/header-nav/header-navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { CategoryService } from './services/category.service';

import * as fromCategoriesReducer from '../redux/reducers/categories.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoadCategoriesEffect } from '../redux/effects/categories.effects';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderInfoComponent,
    HeaderNavigationComponent,
    CategoriesPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromCategoriesReducer.categoriesFeatureKey,
      fromCategoriesReducer.youtubeApiReducer,
    ),
    EffectsModule.forFeature([LoadCategoriesEffect]),
    CoreRoutingModule,
  ],
  providers: [CategoryService],
  exports: [HeaderComponent],
})
export class CoreModule {}

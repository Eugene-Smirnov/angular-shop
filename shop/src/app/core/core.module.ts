import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

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
import { HeaderSearchResultsComponent } from './components/header/header-search-results/header-search-results.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderInfoComponent,
    HeaderNavigationComponent,
    CategoriesPageComponent,
    HeaderSearchResultsComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatTabsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromCategoriesReducer.categoriesFeatureKey,
      fromCategoriesReducer.youtubeApiReducer,
    ),
    EffectsModule.forFeature([LoadCategoriesEffect]),
  ],
  providers: [CategoryService],
  exports: [HeaderComponent],
})
export class CoreModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsListPageComponent } from './pages/goods-list-page/goods-list-page';

const routes: Routes = [
  {
    path: ':categoryId/:subCategoryId',
    component: GoodsListPageComponent,
  },
  {
    path: ':categoryId',
    component: GoodsListPageComponent,
  },
  {
    path: '',
    redirectTo: '/categories',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodsRoutingModule {}

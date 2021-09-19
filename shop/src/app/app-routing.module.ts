import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CategoriesPageComponent } from './core/pages/categories-page/categories-page.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesPageComponent,
  },
  {
    path: 'goods',
    loadChildren: () => import('./goods/goods.module').then((m) => m.GoodsModule),
  },
  {
    path: 'favorites',
    canActivate: [AuthGuard],
    loadChildren: () => import('./favorite/favorite.module').then((m) => m.FavoriteModule),
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

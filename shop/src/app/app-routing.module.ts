import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPageComponent } from './core/pages/categories-page/categories-page.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesPageComponent,
  },
  {
    path: '',
    redirectTo: '/categories',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

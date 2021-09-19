import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

@NgModule({
  declarations: [CartPageComponent, CartItemComponent],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}

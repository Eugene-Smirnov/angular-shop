import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { CartConfirmDialogComponent } from './components/cart-confirm-dialog/cart-confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CartPageComponent,
    CartItemComponent,
    CartFormComponent,
    PhoneMaskDirective,
    CartConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatExpansionModule,
    FormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class CartModule {}

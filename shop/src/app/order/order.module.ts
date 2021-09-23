import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { OrderComponent } from './components/order/order.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderChangeFormComponent } from './components/order-change-form/order-change-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OrderDeleteDialogComponent } from './components/order-delete-dialog/order-delete-dialog.component';

@NgModule({
  declarations: [
    OrderPageComponent,
    OrderComponent,
    OrderItemComponent,
    OrderChangeFormComponent,
    OrderDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule,
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
    RouterModule,
  ],
})
export class OrderModule {}

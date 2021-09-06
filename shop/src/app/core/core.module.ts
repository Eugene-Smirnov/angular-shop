import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { HeaderInfoComponent } from './header/header-info/header-info.component';
import { HeaderNavigationComponent } from './header/header-nav/header-navigation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, HeaderInfoComponent, HeaderNavigationComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    CoreRoutingModule,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}

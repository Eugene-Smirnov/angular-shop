import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { HeaderInfoComponent } from './header/header-info/header-info.component';

@NgModule({
  declarations: [HeaderComponent, HeaderInfoComponent],
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatDividerModule, CoreRoutingModule],
  exports: [HeaderComponent],
})
export class CoreModule {}

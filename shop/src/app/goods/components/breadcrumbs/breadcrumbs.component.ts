import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreadcrumbModel } from '../../models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: BreadcrumbModel[] = [];

  @Output() breadcrumbClick = new EventEmitter<string>();
}

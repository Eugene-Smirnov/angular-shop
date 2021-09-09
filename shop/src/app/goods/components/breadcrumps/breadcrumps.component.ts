import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreadcrumpModel } from '../../models/breadcrump.model';

@Component({
  selector: 'app-breadcrumps',
  templateUrl: './breadcrumps.component.html',
  styleUrls: ['./breadcrumps.component.scss'],
})
export class BreadcrumpsComponent {
  @Input() breadcrumps: BreadcrumpModel[] = [];

  @Output() breadcrumpClick = new EventEmitter<string>();
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { OrderDetailsModel } from 'src/app/cart/models/order-details.model';

@Component({
  selector: 'app-order-change-form',
  templateUrl: './order-change-form.component.html',
  styleUrls: ['./order-change-form.component.scss'],
})
export class OrderChangeFormComponent implements OnInit {
  @Input() details: OrderDetailsModel | null = null;

  @Output() formSubmit: EventEmitter<OrderDetailsModel> = new EventEmitter();

  @Output() closeForm: EventEmitter<void> = new EventEmitter();

  constructor() {
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
  }

  minDate = new Date();

  maxDate = new Date();

  orderEditForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),

      address: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250),
      ]),

      comment: new FormControl('', [Validators.maxLength(250)]),

      date: new FormControl('', [Validators.required]),

      timeHours: new FormControl('', [Validators.required]),

      timeMinutes: new FormControl('', [Validators.required]),

      phone: new FormControl('', [Validators.required]),
    },
    { updateOn: 'change' },
  );

  get name(): FormControl {
    return this.orderEditForm.get('name') as FormControl;
  }

  get address(): FormControl {
    return this.orderEditForm.get('address') as FormControl;
  }

  get comment(): FormControl {
    return this.orderEditForm.get('comment') as FormControl;
  }

  get date(): FormControl {
    return this.orderEditForm.get('date') as FormControl;
  }

  get timeHours(): FormControl {
    return this.orderEditForm.get('timeHours') as FormControl;
  }

  get timeMinutes(): FormControl {
    return this.orderEditForm.get('timeMinutes') as FormControl;
  }

  get phone(): FormControl {
    return this.orderEditForm.get('phone') as FormControl;
  }

  ngOnInit(): void {
    if (!this.details) return;
    this.name.setValue(this.details.name);
    this.address.setValue(this.details.address);
    this.comment.setValue(this.details.comment);
    const detailsDate = new Date(this.details.timeToDeliver);
    this.date.setValue(moment(detailsDate.toISOString()));
    this.timeHours.setValue(detailsDate.getHours().toString());
    this.timeMinutes.setValue(detailsDate.getMinutes().toString());
    this.phone.setValue(this.details.phone.slice(4));
  }

  onSubmit(): void {
    const date = (this.date.value as Moment).toDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const formResult: OrderDetailsModel = {
      name: this.name.value,
      address: `${this.address.value}`,
      phone: `+375 ${this.phone.value}`,
      timeToDeliver: new Date(
        year,
        month,
        day,
        this.timeHours.value,
        this.timeMinutes.value,
      ).toString(),
      comment: this.comment.value,
    };

    this.formSubmit.emit(formResult);
  }
}

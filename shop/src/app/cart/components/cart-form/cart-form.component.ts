import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment';
import { OrderDetailsModel } from '../../models/order-details.model';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
})
export class CartFormComponent {
  @Output() formSubmit: EventEmitter<OrderDetailsModel> = new EventEmitter();

  constructor() {
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
  }

  minDate = new Date();

  maxDate = new Date();

  cartForm = new FormGroup(
    {
      fathersName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),

      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),

      lastName: new FormControl('', [
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

  get firstName(): FormControl {
    return this.cartForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.cartForm.get('lastName') as FormControl;
  }

  get fathersName(): FormControl {
    return this.cartForm.get('fathersName') as FormControl;
  }

  get address(): FormControl {
    return this.cartForm.get('address') as FormControl;
  }

  get comment(): FormControl {
    return this.cartForm.get('comment') as FormControl;
  }

  get date(): FormControl {
    return this.cartForm.get('date') as FormControl;
  }

  get timeHours(): FormControl {
    return this.cartForm.get('timeHours') as FormControl;
  }

  get timeMinutes(): FormControl {
    return this.cartForm.get('timeMinutes') as FormControl;
  }

  get phone(): FormControl {
    return this.cartForm.get('phone') as FormControl;
  }

  onSubmit(): void {
    const date = (this.date.value as Moment).toDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const formResult: OrderDetailsModel = {
      name: `${this.lastName.value} ${this.firstName.value} ${this.fathersName.value}`,
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

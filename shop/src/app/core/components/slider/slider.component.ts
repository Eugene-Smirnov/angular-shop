import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SliderItemModel } from '../../models/slider-item.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() sliderItems: SliderItemModel[] = [];

  currentPosition = 0;

  interval = setInterval(() => this.onForwardClick(), 5000);

  ngOnInit(): void {
    return;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  onBackClick() {
    if (this.currentPosition === 0) {
      this.currentPosition = this.sliderItems.length - 1;
      return;
    }
    this.currentPosition = this.currentPosition - 1;
  }

  onForwardClick() {
    if (this.currentPosition === this.sliderItems.length - 1) {
      this.currentPosition = 0;
      return;
    }
    this.currentPosition = this.currentPosition + 1;
  }
}

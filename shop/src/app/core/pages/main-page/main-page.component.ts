import { Component, OnInit } from '@angular/core';
import { SliderItemModel } from '../../models/slider-item.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  sliderItems: SliderItemModel[] = [
    {
      imgUrl: '../../../../assets/images/main-page-slider/iphone.png',
      itemId: '612e05c5bc038caf8f07d5d3',
    },
    {
      imgUrl: '../../../../assets/images/main-page-slider/xiaomi_kettle.png',
      itemId: '612d47b2f748bc99cbc57b29',
    },
    {
      imgUrl: '../../../../assets/images/main-page-slider/samsung.jpg',
      itemId: '612fcd830167df6c40f34803',
    },
    {
      imgUrl: '../../../../assets/images/main-page-slider/sofa.jpg',
      itemId: '61332c27b43d82dfda40ae0f',
    },
    {
      imgUrl: '../../../../assets/images/main-page-slider/earphones.jpg',
      itemId: '612fe1613eb90f86c4923d5b',
    },
  ];

  ngOnInit(): void {
    return;
  }
}

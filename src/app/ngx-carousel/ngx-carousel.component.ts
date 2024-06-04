
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-ngx-carousel',
  templateUrl: './ngx-carousel.component.html',
  styleUrl: './ngx-carousel.component.css',
  standalone: true,
  imports: [SlickCarouselModule]
})

export class NgxCarouselComponent {
  slides = [
    { img: "../../assets/img/carousel-img-1.png" },
    { img: "../../assets/img/carousel-img-2.png" },
    { img: "../../assets/img/carousel-img-1.png" },
    { img: "../../assets/img/carousel-img-2.png" },
  ];
  slideConfig = { "slidesToShow": 4, "slidesToScroll": 4 };

  addSlide() {
    this.slides.push({ img: "http://placehold.it/350x150/777777" })
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: Event) {
    console.log('slick initialized', e);
  }

  breakpoint(e: Event) {
    console.log('breakpoint', e);
  }

  afterChange(e: Event) {
    console.log('afterChange', e);
  }

  beforeChange(e: Event) {
    console.log('beforeChange', e);
  }
}

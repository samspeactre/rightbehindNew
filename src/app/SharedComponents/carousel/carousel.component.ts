
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swiper from 'swiper';

@Component({
  standalone:true,
  imports: [MatIconModule, MatButtonModule],
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
  cards = [
    { imgSrc: '../../assets/img/carousel-img-1.webp', name: 'David Dell', description: 'The lorem text the section that contains header ' },
    { imgSrc: '../../assets/img/carousel-img-2.webp', name: 'David Dell', description: 'The lorem text the section that contains header' },
    { imgSrc: '../../assets/img/carousel-img-1.webp', name: 'David Dell', description: 'The lorem text the section that contains header ' },
    { imgSrc: '../../assets/img/carousel-img-2.webp', name: 'David Dell', description: 'The lorem text the section that contains header' },
    { imgSrc: '../../assets/img/carousel-img-1.webp', name: 'David Dell', description: 'The lorem text the section that contains header ' },
    { imgSrc: '../../assets/img/carousel-img-2.webp', name: 'David Dell', description: 'The lorem text the section that contains header' },
    { imgSrc: '../../assets/img/carousel-img-1.webp', name: 'David Dell', description: 'The lorem text the section that contains header ' },
    { imgSrc: '../../assets/img/carousel-img-2.webp', name: 'David Dell', description: 'The lorem text the section that contains header' },
    { imgSrc: '../../assets/img/carousel-img-1.webp', name: 'David Dell', description: 'The lorem text the section that contains header ' },
    { imgSrc: '../../assets/img/carousel-img-2.webp', name: 'David Dell', description: 'The lorem text the section that contains header' },
    { imgSrc: '../../assets/img/carousel-img-1.webp', name: 'David Dell', description: 'The lorem text the section that contains header ' },
    { imgSrc: '../../assets/img/carousel-img-2.webp', name: 'David Dell', description: 'The lorem text the section that contains header' },
    // Add more card data as needed
  ];
  swiper!: Swiper;

  constructor() { }

  ngOnInit(): void {
    this.initSwiper();
  }

  initSwiper(): void {
    this.swiper = new Swiper(".swiper-container", {
      // slidesPerView: 1,
      // spaceBetween: 10,
      loop: true, // Set loop to true for infinite loop
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        320: {
          slidesPerView: 2,
        },
        600: {
          slidesPerView: 3,
        },
      },
    });
    this.swiper.slidesPerViewDynamic()
  }
  slideNext(){
    this.swiper.slideNext()
  }
  
}

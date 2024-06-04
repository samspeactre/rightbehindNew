import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import Swiper from 'swiper';

@Component({
  standalone:true,
  imports:[CommonModule,RouterModule,MatIconModule, MatButtonModule],
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrl: './card-carousel.component.css'
})
export class CardCarouselComponent implements OnInit{
  cards = [
    { imgSrc: '../../assets/img/carousel-map-img.png', buttonUrl: '', name: 'Community Title', tag: 'miami', description: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus.  ' },
    { imgSrc: '../../assets/img/carousel-map-img.png', buttonUrl: '', name: 'Community Title', tag: 'miami', description: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus. ' },
    { imgSrc: '../../assets/img/carousel-map-img.png', buttonUrl: '', name: 'Community Title', tag: 'miami', description: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus.  ' },
    { imgSrc: '../../assets/img/carousel-map-img.png', buttonUrl: '', name: 'Community Title', tag: 'miami', description: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus. ' },
    { imgSrc: '../../assets/img/carousel-map-img.png', buttonUrl: '', name: 'Community Title', tag: 'miami', description: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus.  ' },
    { imgSrc: '../../assets/img/carousel-map-img.png', buttonUrl: '', name: 'Community Title', tag: 'miami', description: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus. ' },
    { imgSrc: '../../assets/img/carousel-map-img.png', buttonUrl: '', name: 'Community Title', tag: 'miami', description: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus.  ' },
    // Add more card data as needed
  ];
  swiper!: Swiper;

  constructor() { }

  ngOnInit(): void {
    this.initSwiper();
  }

  initSwiper(): void {
    this.swiper = new Swiper(".swiper-container-card", {
      slidesPerView: 1,
      // spaceBetween: 10,
      loop: true, // Set loop to true for infinite loop
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination-card",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next-card",
        prevEl: ".swiper-button-prev-card",
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
  slidePrev(){
    this.swiper.slidePrev()
  }
}

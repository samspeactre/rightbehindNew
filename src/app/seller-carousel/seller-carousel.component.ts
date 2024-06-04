import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import Swiper from 'swiper';

@Component({
  standalone:true,
  imports:[CommonModule,RouterModule,MatIconModule,MatButtonModule],
  selector: 'app-seller-carousel',
  templateUrl: './seller-carousel.component.html',
  styleUrl: './seller-carousel.component.css'
})
export class SellerCarouselComponent implements OnInit{
  
    cards = [
      { imgSrc: '../../assets/img/carousel-img-1.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200SqFt', price: '25,000', buttonUrl: '' },
      { imgSrc: '../../assets/img/carousel-img-2.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200SqFt', price: '25,000', buttonUrl: '' },
      { imgSrc: '../../assets/img/carousel-img-3.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200SqFt', price: '25,000', buttonUrl: '' },
      { imgSrc: '../../assets/img/carousel-img-1.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200SqFt', price: '25,000', buttonUrl: '' },
      { imgSrc: '../../assets/img/carousel-img-2.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200SqFt', price: '25,000', buttonUrl: '' },
      { imgSrc: '../../assets/img/carousel-img-3.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200SqFt', price: '25,000', buttonUrl: '' },
      { imgSrc: '../../assets/img/carousel-img-1.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200SqFt', price: '25,000', buttonUrl: '' },
      { imgSrc: '../../assets/img/carousel-img-2.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200SqFt', price: '25,000', buttonUrl: '' },
      { imgSrc: '../../assets/img/carousel-img-3.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200SqFt', price: '25,000', buttonUrl: '' },
     
  
     // Add more card data as needed
    ];
    swiper!: Swiper;
  
    constructor() { }
  
    ngOnInit(): void {
      this.initSwiper();
    }
  
    initSwiper(): void {
      this.swiper = new Swiper(".swiper-container-seller", {
        // slidesPerView: 1,
        width: 1068,
        spaceBetween: 15,
        loop: true, // Set loop to true for infinite loop
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination-seller",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next-seller",
          prevEl: ".swiper-button-prev-seller",
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

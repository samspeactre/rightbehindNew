
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  standalone:true,
  imports: [RouterModule, MatIconModule, MatButtonModule, CarouselModule, FontAwesomeModule],
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
  faChevronCircleLeft=faChevronLeft
  faChevronCircleRight=faChevronRight
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 20,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  }
  constructor() { }

  ngOnInit(): void {}
}

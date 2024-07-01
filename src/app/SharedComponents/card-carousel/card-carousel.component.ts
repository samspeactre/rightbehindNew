
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronCircleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MapComponent } from '../map/map.component';
import { CommunityCardComponent } from '../community-card/community-card.component';

@Component({
  standalone:true,
  imports: [RouterModule, CommunityCardComponent, MatIconModule, MatButtonModule, CarouselModule, FontAwesomeModule, MapComponent],
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrl: './card-carousel.component.scss'
})
export class CardCarouselComponent implements OnInit{
  cards = [
    { buttonUrl: '', name: 'Community Title', tag: 'miami', description: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus.  ' },
    { buttonUrl: '', name: 'Community Title', tag: 'miami', description: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus. ' },
    { buttonUrl: '', name: 'Community Title', tag: 'miami', description: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus.  ' },
    { buttonUrl: '', name: 'Community Title', tag: 'miami', description: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus. ' },
    { buttonUrl: '', name: 'Community Title', tag: 'miami', description: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus.  ' },
  ];
  faChevronCircleLeft=faChevronLeft
  faChevronCircleRight=faChevronRight
  faChevronCircleRight2=faChevronCircleRight
  customOptions: OwlOptions = {
    loop: false,
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
      740: {
        items: 3
      }
    },
    nav: false
  }
  constructor() { }

  ngOnInit(): void {}
  getHeight(){
    const height = document.getElementsByClassName('heightGet')[0]?.clientHeight
    return height
  }
}

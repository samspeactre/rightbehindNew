import { Component, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../../SharedComponents/footer/footer.component';
import { RentalCarouselComponent } from '../../SharedComponents/rental-carousel/rental-carousel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';

import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
// import Swiper from 'swiper';

interface Rule {
  desc: string;
  pets: string;
  parking: string;
}

@Component({
  standalone:true,
  imports: [FooterComponent,RouterModule, RentalCarouselComponent, MatIconModule, MatTab, MatTabGroup, NavbarComponent, MatButtonModule, CarouselModule],
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
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
  ];
utility: any;
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
  ngOnInit(): void {
  }


Appartment = [
  { head: 'New Apartment Nice View', address: 'Quincy St, Brooklyn, NY, USA', bed: '03', bath: '02', sqft: '1,200', price: '25,000' }
];

PropInfo = [
  { type: 'House', LeaseLenght: '2,160 sqft', rent: '200', deposit: '50', bed: '02', bath: '9', sqft: '1200' }
];

Propdetail = [
  { desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis. lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum.' }
];

amenities = {
  facilities: [
    'Air Conditioning',
    'Lawn',
    'Swimming Pool',
    'Barbeque',
    'Microwave',
    'Wide-Open Spaces',
    'TV Cable',
    'Dryer',
    'Outdoor Shower',
    'Washer',
    'Gym',
    // Add other facilities here...
  ]
};

utilities = {
  utility: [
    'Gas', 'Water', 'Electricity', 'Heat', 'Trash Removal', 'Sewer', 'Air Conditioning', 'Cable'
  ]
};

chunkArray(array: any[], size: number) {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
}

rentSpecial = [
  { title: 'House', startDate: '31-03-2024', endDate: '04-04-2024', specialOffer: '50% Off' }
];

feePolicy = [
  { desc: 'The fees below are based on community-supplied data and may exclude additional fees and utilities',
  pets: 'Cats',
  laundry: 'Washer/Dryer-In Unit' }
];


Gallery: string[] = [
  '../../assets/img/popup-gallery.jpg',
  '../../assets/img/popup-gallery.jpg',
  '../../assets/img/popup-gallery.jpg',
  '../../assets/img/popup-gallery.jpg',
  '../../assets/img/popup-gallery.jpg',
  '../../assets/img/popup-gallery.jpg',
  // Add more image URLs as needed
];

@ViewChild('videoPlayer') videoPlayer: any;
videoSource: string = '../../assets/video/popup-video.mp4'; // Set the path to your video file
thumbnailSource: string = '../../assets/img/popup-gallery.jpg'; // Set the path to your thumbnail image
showVideo: boolean = false;

toggleVideo() {
  this.showVideo = true;
  this.videoPlayer.nativeElement.play();
}

contactInfo = [
  { fName: 'Syed', lName: 'Hunain', role: 'Broker', email: 'hunain@gmail.com', phone: '031585226852', contactprefrence: 'Phone', }
];

desc = [
  { para: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus.Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus.Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus.Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus. ', }
]

floorPlan = [
  { planName: 'Build', bed: '02', bath: '02', sqft: '1200', currencyType: 'USD', salePrice: '200', imgSrc: '../../assets/img/floorplan.jpg', desc: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus.Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus.Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor.' }
];

Proplocation = [
  { address: 'Miami, U.S. state in South Florida', country: '02', city: '02', landmark: '1200', zipcode: 'USD',  imgSrc: '../../assets/img/map.png'}
];


contact = [
  { para: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus. ', }
]
}

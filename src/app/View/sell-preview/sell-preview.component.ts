import { RentalCarouselComponent } from '../../SharedComponents/rental-carousel/rental-carousel.component';
import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { FooterComponent } from '../../SharedComponents/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';

import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpService } from '../../Services/http.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { toggleLoader } from '../../Ngrx/data.action';
import { MiniLoadingComponent } from '../../SharedComponents/loaders/mini-loader/mini-loading.component';

@Component({
  standalone: true,
  imports: [FooterComponent, RentalCarouselComponent, MatIconModule, NavbarComponent, MatButtonModule, RouterModule, MiniLoadingComponent],
  selector: 'app-sell-preview',
  templateUrl: './sell-preview.component.html',
  styleUrl: './sell-preview.component.css',
})
export class SellPreviewComponent implements OnInit {
  type!:number;
  id!:number;
  propertyDetails:any;
  loader:boolean = true;
  constructor(private activatedRoute:ActivatedRoute,private http:HttpService, private store:Store){
    this.activatedRoute.queryParams.subscribe((param:any)=>{
      console.log(param,'checlo');
      this.type = Number(param?.type)
      this.id = Number(param?.id)
    })
  }
  cards = [
    {
      imgSrc: '../../assets/img/carousel-img-1.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200SqFt',
      price: '25,000',
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-2.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200SqFt',
      price: '25,000',
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-3.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200SqFt',
      price: '25,000',
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-1.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200SqFt',
      price: '25,000',
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-2.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200SqFt',
      price: '25,000',
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-3.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200SqFt',
      price: '25,000',
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-1.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200SqFt',
      price: '25,000',
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-2.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200SqFt',
      price: '25,000',
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-3.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200SqFt',
      price: '25,000',
      buttonUrl: '',
    },
  ];
  swiper!: Swiper;
  utility: any;
  private destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.initSwiper();
    this.getPropertyDetail()
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getPropertyDetail() {
    this.http.get(`Property/get/${this.id}`, false)
    .pipe(
      takeUntil(this.destroy$),
      finalize(()=>{
        this.loader =false;
      })
    )
    .subscribe(
      (response) => {
        console.log(response);
        this.propertyDetails = response?.model
      }
    );
  }
  initSwiper(): void {
    this.swiper = new Swiper('.swiper-container-rental-preview', {
      // slidesPerView: 1,
      width: 1280,
      spaceBetween: 20,
      loop: true, // Set loop to true for infinite loop
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
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
  }

  Appartment = [
    {
      head: 'New Apartment Nice View',
      address: 'Quincy St, Brooklyn, NY, USA',
      bed: '03',
      bath: '02',
      sqft: '1,200',
      price: '25,000',
    },
  ];

  setPrice = [{ price: '1500' }];

  Gallery: string[] = [
    '../../assets/img/popup-gallery.jpg',
    '../../assets/img/popup-gallery.jpg',
    '../../assets/img/popup-gallery.jpg',
    '../../assets/img/popup-gallery.jpg',
    '../../assets/img/popup-gallery.jpg',
    '../../assets/img/popup-gallery.jpg',
    // Add more image URLs as needed
  ];

  virtualUrl = [{ url: 'www.sample.com' }];

  homeFacts = [
    {
      homeType: 'Portion',
      bed: '02',
      bath: '02',
      Bath3and4: '04',
      Bath1and2: '02',
      Bath1and4: '04',
      finishedSqft: '2000',
      lotSize: '500',
      sqft: '120',
      yearConstructed: '2000',
      remodalYear: '2015',
      dues: 'No',
      baseSqft: '500',
      GarageSqft: '500',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est',
    },
  ];

  openHouse = [
    { date: '24-03-2024', startTime: '12:00 PM', endTime: '3:00 PM' },
  ];

  addInfo = [
    {
      realtedSite: 'www.youtube.com',
      feedback: 'Nice Apartment',
      roomDetails: 'Master Bedroom',
      utilityBills: 'Seperate',
      buildDetails: 'ABC',
    },
  ];

  contactInfo = [{ phone: '0321456987' }];

  Proplocation = [
    {
      address: 'Miami, U.S. state in South Florida',
      country: '02',
      city: '02',
      landmark: '1200',
      zipcode: 'USD',
      imgSrc: '../../assets/img/map.png',
    },
  ];

  contact = [
    {
      para: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus. ',
    },
  ];
}
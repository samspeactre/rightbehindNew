import { RentalCarouselComponent } from '../../SharedComponents/rental-carousel/rental-carousel.component';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../SharedComponents/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';

import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpService } from '../../Services/http.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { toggleLoader } from '../../Ngrx/data.action';
import { MiniLoadingComponent } from '../../SharedComponents/loaders/mini-loader/mini-loading.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { faEllipsisVertical, faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, Location } from '@angular/common';

@Component({
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RentalCarouselComponent, MatIconModule, NavbarComponent, MatButtonModule, RouterModule, MiniLoadingComponent, CarouselModule],
  selector: 'app-sell-preview',
  templateUrl: './sell-preview.component.html',
  styleUrl: './sell-preview.component.scss',
})
export class SellPreviewComponent implements OnInit {
  faHeart=faHeart;
  faShare=faShareAlt
  faEllipsisVertical=faEllipsisVertical
  type!:number;
  id!:number;
  propertyDetails:any;
  loader:boolean = true;
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
      740: {
        items: 4
      }
    },
    nav: false
  }
  constructor(private activatedRoute:ActivatedRoute,private http:HttpService, private store:Store, private location:Location){
    this.activatedRoute.queryParams.subscribe((param:any)=>{
      if(!param?.type||!param?.id){
        this.location.back()
      }
      this.type = Number(param?.type)
      this.id = Number(param?.id)
    })
  }
  private destroy$ = new Subject<void>();
  ngOnInit(): void {
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
        this.propertyDetails = response?.model
      },err=>{
        this.location.back()
      }
    );
  }

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
      imgSrc: '../../assets/img/map.webp',
    },
  ];

  contact = [
    {
      para: 'Lorem ipsum dolor sit amet consectetur. A urna dolor neque quis tortor. Cras auctor mauris tincidunt sed fusce rhoncus. ',
    },
  ];
}

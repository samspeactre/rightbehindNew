import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';
import { RentalCarouselComponent } from '../../SharedComponents/rental-carousel/rental-carousel.component';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faEllipsisVertical, faHeart, faPhoneAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subject, finalize, takeUntil } from 'rxjs';
import { MiniLoadingComponent } from '../../SharedComponents/loaders/mini-loader/mini-loading.component';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { HttpService } from '../../Services/http.service';
import { HelperService, assetUrl } from '../../Services/helper.service';
import { MapComponent } from '../../SharedComponents/map/map.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, NgbAccordionModule, MapComponent, RentalCarouselComponent, MatIconModule, NavbarComponent, MatButtonModule, RouterModule, MiniLoadingComponent, CarouselModule],
  selector: 'app-sell-preview',
  templateUrl: './sell-preview.component.html',
  styleUrl: './sell-preview.component.scss',
})
export class SellPreviewComponent implements OnInit {
  src = assetUrl
  faHeart = faHeart;
  faShare = faShareAlt
  faEllipsisVertical = faEllipsisVertical
  faPhoneAlt = faPhoneAlt
  faEnvelope = faEnvelope
  faCheck = faCheckCircle
  type!: number;
  id!: number;
  propertyDetails: any;
  loader: boolean = true;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
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
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpService, private store: Store, private location: Location, public helper: HelperService) {
    this.activatedRoute.queryParams.subscribe((param: any) => {
      if (!param?.type || !param?.id) {
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
        finalize(() => {
          this.loader = false;
        })
      )
      .subscribe(
        (response) => {
          this.propertyDetails = response?.model;
          setTimeout(() => {
            this.getClass()
          }, 1000);
        }, err => {
          this.location.back()
        }
      );
  }
  getClass() {
    var items = document.querySelectorAll('.labelCheck');
    for (var i = 0; i < items.length; i++) {
      if (i % 4 < 2) {
        items[i].classList.add('white-label');
      } else {
        items[i].classList.add('yellow-label');
      }
    }
  }
  createContact() {
    this.helper.createContact(this.id).subscribe((response) => {
      const id = response?.model?.id;
      if (id) {
        this.router.navigate(['/dashboard/inquiries/chat', id], { queryParams: { name: this.propertyDetails?.propertyContacts[0]?.fullName } });
      }
    })
  }
  clickAnalytic(type: string) {
    const api = type == 'email' ? `PropertyAnalytic/email/${this.id}` : `PropertyAnalytic/phone/${this.id}`
    this.http.get(api, false).subscribe((response) => { })
  }
}

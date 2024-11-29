import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faCheckCircle,
  faEllipsisVertical,
  faHeart,
  faPhoneAlt,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';
import { selectUser } from '../../Ngrx/data.reducer';
import { HelperService } from '../../Services/helper.service';
import { HttpService } from '../../Services/http.service';
import { ResizeService } from '../../Services/resize.service';
import { ContactPopupComponent } from '../../SharedComponents/contact-popup/contact-popup.component';
import { MiniLoadingComponent } from '../../SharedComponents/loaders/mini-loader/mini-loading.component';
import { MapComponent } from '../../SharedComponents/map/map.component';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';
import { RentalCarouselComponent } from '../../SharedComponents/rental-carousel/rental-carousel.component';
@Component({
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    NgbAccordionModule,
    LightboxModule,
    MapComponent,
    RentalCarouselComponent,
    MatIconModule,
    NavbarComponent,
    MatButtonModule,
    RouterModule,
    MiniLoadingComponent,
    CarouselModule,
  ],
  selector: 'app-sell-preview',
  templateUrl: './sell-preview.component.html',
  styleUrl: './sell-preview.component.scss',
})
export class SellPreviewComponent implements OnInit {
  faHeart = faHeart;
  faShare = faShareAlt;
  faEllipsisVertical = faEllipsisVertical;
  faPhoneAlt = faPhoneAlt;
  faEnvelope = faEnvelope;
  faCheck = faCheckCircle;
  type!: any;
  id!: any;
  propertyDetails: any;
  loader: boolean = true;
  user$ = this.store.select(selectUser);
  userDetails: any;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    margin: 5,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      740: {
        items: 4,
      },
    },
    nav: false,
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    public resize: ResizeService,
    private lightbox: Lightbox,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpService,
    private store: Store,
    private location: Location,
    public helper: HelperService
  ) {
    this.activatedRoute.queryParams.subscribe((param: any) => {
      if (!param?.id) {
        this.location.back();
      } else {
        this.id = param?.type && param?.type == 'mls' ? param?.id : Number(param?.id);
      }
      if (param?.type) {
        this.type = param?.type;
      }
    });
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((user) => {
        this.userDetails = user;
      });
  }
  private destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.getPropertyDetail();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  open(index: number): void {
    const images = this.propertyDetails.propertyImages.map((img: any) => ({
      src: img.imageUrl,
      caption: 'Property Images',
      thumb: img.imageUrl,
    }));
    this.lightbox.open(images, index, {
      wrapAround: true,
      showImageNumberLabel: true,
      alwaysShowNavOnTouchDevices: true,
      centerVertically: true,
      fitImageInViewPort: true,
    });
  }

  close(): void {
    this.lightbox.close();
  }
  async share() {
    try {
      await navigator.share({
        title: this.propertyDetails?.title,
        url: `preview/?id=${this.id}&type=${this.type}`,
      });
    } catch (err: any) {
      console.error('Share failed:', err?.message);
    }
  }
  getPropertyDetail() {
    const src = this.type && this.type == 'mls' ? `Property/get/mls/${this.id}` : `Property/get/${this.id}`
    this.http
      .get(src, false)
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
            this.getClass();
          }, 1000);
        },
        (err) => {
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
      const routeData = {
        property: {
          id: this.id,
          title: this.propertyDetails?.title,
          type: this.propertyDetails?.propertyType,
        },
        sender: {
          fullName: this.propertyDetails?.propertyContacts?.[0]?.fullName,
          imageUrl:
            this.propertyDetails?.propertyContacts?.[0]?.imageUrl &&
            this.propertyDetails?.propertyContacts?.[0]?.imageUrl,
        },
        contactId: response?.model?.id,
      };
      this.router.navigate(['/dashboard/inquiries'], {
        queryParams: { data: JSON.stringify(routeData) },
      });
    });
  }
  openPopup(): void {
    this.dialog?.open(ContactPopupComponent, {
      width: window.innerWidth > 1024 ? '420px' : '100%',
      data: { type: 'property', id: this.id },
    });
  }
  clickAnalytic(type: string) {
    const api =
      type == 'email'
        ? `PropertyAnalytic/email/${this.id}`
        : `PropertyAnalytic/phone/${this.id}`;
    this.http.get(api, false).subscribe((response) => {});
  }
}

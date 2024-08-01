import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faHeart,
  faMagnifyingGlassPlus,
  faMapMarkerAlt,
  faShare,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { selectUser } from '../../Ngrx/data.reducer';
import { HelperService } from '../../Services/helper.service';
import { ResizeService } from '../../Services/resize.service';
import { ContactPopupComponent } from '../contact-popup/contact-popup.component';
import { PopupComponent } from '../popup/popup.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { ContactSelectComponent } from '../contact-select/contact-select.component';
import { HttpService } from '../../Services/http.service';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    RouterModule,
    CarouselModule,
  ],
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss',
})
export class PropertyCardComponent {
  faMagnifyingGlassPlus = faMagnifyingGlassPlus;
  faMapMarkerAlt = faMapMarkerAlt;
  user$ = this.store.select(selectUser);
  userDetails: any;
  @Input() card!: any;
  @Input() showBadge: boolean = false;
  @Input() loader: boolean = true;
  @Input() animation: boolean = true;
  @Input() type!: string;
  @Input() background!: string;
  @Input() page!: string;
  @Output() propertyHover = new EventEmitter<any>();
  @Output() propertyHoverLeft = new EventEmitter<any>();
  faChevronCircleLeft = faChevronLeft;
  faChevronCircleRight = faChevronRight;
  private destroy$ = new Subject<void>();
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoHeight: false,
    margin: 5,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
  faHeart = faHeart;
  faShare = faShareAlt;
  constructor(
    private router: Router,
    public resize: ResizeService,
    private store: Store,
    private dialog: MatDialog,
    private helper: HelperService,
    private http: HttpService
  ) {
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
  ngOnInit() {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  openPopup(): void {
    this.dialog?.open(ContactPopupComponent, {
      width: window.innerWidth > 1330 ? '400px' : '100%',
      data: { type: 'property', id: this.card?.id },
      scrollStrategy: new NoopScrollStrategy(),
    });
  }
  naviagteThroughPopup() {
    if (window.innerWidth > 1024) {
      this.dialog?.open(PopupComponent, {
        height: '90%',
        width: '85%',
        data: { card: this.card },
      });
    } else {
      this.navigateAndClose();
    }
  }

  async navigateAndClose() {
    this.router.navigate(['/preview'], {
      queryParams: {
        id: this.card?.listingId || this.card?.id,
        type: this.card?.listingId ? 'mls' : '2',
      },
    });
  }
  async navigateEditAndClose() {
    const data = {
      firstName: this.userDetails.fullName.split(' ')?.[0],
      lastName: this.userDetails.fullName.split(' ')?.[1],
      propertyType: 1,
      unit: this.card?.unit,
      email: this.userDetails.email,
      address: {
        address: this.card?.location,
        city: this.card?.city,
        state: this.card?.state,
        country: this.card?.country,
        zipCode: this.card?.zipCode,
        street: this.card?.street,
      },
      id: this.card?.id,
      latLng: { lat: this.card?.latitude, lng: this.card?.longitude },
      active: 'rent',
      getData: true,
    };
    this.router.navigate(['/rent-add-property'], {
      queryParams: { data: JSON.stringify(data) },
    });
  }
  routeToContact(card: any) {
    this.router.navigate(['/contact-us'], {
      queryParams: { id: card?.id, type: card?.propertyType },
    });
  }
  createContact() {
    this.helper.createContact(this.card?.id).subscribe((response) => {
      const routeData = {
        property: {
          id: this.card?.id,
          title: this.card?.title,
          type: '2',
        },
        sender: {
          fullName: this.card?.propertyContacts?.[0]?.fullName,
          imageUrl:
            this.card?.propertyContacts?.[0]?.imageUrl &&
            this.card?.propertyContacts?.[0]?.imageUrl,
        },
        contactId: response?.model?.id,
      };
      this.router.navigate(['/dashboard/inquiries'], {
        queryParams: { data: JSON.stringify(routeData) },
      });
    });
  }
  hover() {
    this.propertyHover.emit({
      lat: this.card?.latitude,
      lng: this.card?.longitude,
    });
  }
  hoverLeft() {
    this.propertyHoverLeft.emit({
      lat: this.card?.latitude,
      lng: this.card?.longitude,
    });
  }
  favourite(event: MouseEvent) {
    event.stopPropagation();
    if (this.userDetails) {
      this.toggleFavorite();
    } else {
      const dialogRef = this.dialog.open(LoginPopupComponent, {
        height: '490px',
        width: window.innerWidth > 1330 ? '330px' : '100%',
        scrollStrategy: new NoopScrollStrategy(),
        data: 'favourite',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result?.data) {
          this.toggleFavorite();
        }
      });
    }
  }
  async share(event) {
    event.stopPropagation();
    try {
      await navigator.share({
        title: this.card?.title,
        url: `preview/?id=${this.card?.listingId || this.card?.id}&type=2`,
      });
    } catch (err: any) {
      console.error('Share failed:', err?.message);
    }
  }
  openContactOptions() {
    const dialogRef = this.dialog.open(ContactSelectComponent, {
      width: window.innerWidth > 1024 ? '500px' : '100%',
      data: {
        email: this.card.listAgentEmail,
        phone: this.card.listAgentOfficePhone,
      },
      scrollStrategy: new NoopScrollStrategy(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'email' && this.card.listAgentEmail) {
        this.openEmail();
      } else if (result === 'phone' && this.card.listAgentOfficePhone) {
        this.openPhone();
      }
    });
  }

  openEmail() {
    window.location.href = `mailto:${this.card.listAgentEmail}`;
  }

  openPhone() {
    window.location.href = `tel:${this.card.listAgentOfficePhone}`;
  }
  toggleFavorite() {
    const url: string = this.card.favoriteId
      ? 'favoriteproperty/remove'
      : 'favoriteproperty/add';
    const data = {
      propertyId: this.card?.id == 0 ? null : this.card?.id,
      listingId: this.card?.listingId,
    };
    const favData = {
      id: this.card.favoriteId,
    };
    this.http
      .loaderPost(url, this.card.favoriteId ? favData : data, true)
      .subscribe((response: any) => {
        this.card['favoriteId'] = this.card.favoriteId
          ? null
          : response?.model?.id;
      });
  }
}

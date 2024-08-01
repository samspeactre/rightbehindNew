import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEllipsisVertical,
  faHeart,
  faShare,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { HelperService } from '../../Services/helper.service';
import { HttpService } from '../../Services/http.service';
import { MapComponent } from '../map/map.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ResizeService } from '../../Services/resize.service';
import { ContactPopupComponent } from '../contact-popup/contact-popup.component';
import { selectUser } from '../../Ngrx/data.reducer';
import { ContactSelectComponent } from '../contact-select/contact-select.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  standalone: true,
  imports: [
    MatIconModule,
    MapComponent,
    CarouselModule,
    CommonModule,
    MatDialogContent,
    MatButtonModule,
    RouterModule,
    FontAwesomeModule,
    NgbTooltipModule,
  ],
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {
  faHeart = faHeart;
  faShare = faShareAlt;
  faEllipsisVertical = faEllipsisVertical;
  faRedirect = faShare;
  propertyData: any;
  user$ = this.store.select(selectUser);
  userDetails: any;
  private destroy$ = new Subject<void>();
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    private router: Router,
    private store: Store,
    private http: HttpService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public helper: HelperService,
    public resize: ResizeService
  ) {
    this.propertyData = data?.card;
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
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  headings = [
    { id: 'Prop-info', title: 'Property Information' },
    { id: 'Ameneties', title: 'Amenities' },
    { id: 'Map', title: 'map' },
  ];
  chunkedFacilities: any[] = [];
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
        items: 1,
      },
    },
    nav: false,
  };
  ngOnInit() {}

  onHeadingClick(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  chunkArray(array: any[], size: number) {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  }

  navigateAndClose() {
    this.dialog.closeAll();
    setTimeout(() => {
      this.router.navigate(['/preview'], {
        queryParams: {
          id: this.propertyData?.listingId || this.propertyData?.id,
          type: this.propertyData?.listingId ? 'mls' : '2',
        },
      });
    });
  }
  openContactOptions() {
    const dialogRef = this.dialog.open(ContactSelectComponent, {
      width: window.innerWidth > 1024 ? '500px' : '100%',
      data: {
        email: this.propertyData.listAgentEmail,
        phone: this.propertyData.listAgentOfficePhone,
      },
      scrollStrategy: new NoopScrollStrategy(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'email' && this.propertyData.listAgentEmail) {
        this.openEmail();
      } else if (result === 'phone' && this.propertyData.listAgentOfficePhone) {
        this.openPhone();
      }
    });
  }
  openEmail() {
    window.location.href = `mailto:${this.propertyData.listAgentEmail}`;
  }

  openPhone() {
    window.location.href = `tel:${this.propertyData.listAgentOfficePhone}`;
  }
  async share() {
    try {
      await navigator.share({
        title: this.propertyData?.title,
        url: `preview/?id=${
          this.propertyData?.listingId || this.propertyData?.id
        }&type=2`,
      });
    } catch (err: any) {
      console.error('Share failed:', err?.message);
    }
  }

  closePopup(): void {
    this.dialogRef.close();
  }
  createContact() {
    this.helper.createContact(this.propertyData?.id).subscribe((response) => {
      const routeData = {
        property: {
          id: this.propertyData?.id,
          title: this.propertyData?.title,
          type: this.propertyData?.propertyType,
        },
        sender: {
          fullName: this.propertyData?.propertyContacts?.[0]?.fullName,
          imageUrl:
            this.propertyData?.propertyContacts?.[0]?.imageUrl &&
            this.propertyData?.propertyContacts?.[0]?.imageUrl,
        },
        contactId: response?.model?.id,
      };
      this.dialog.closeAll();
      this.router.navigate(['/dashboard/inquiries'], {
        queryParams: { data: JSON.stringify(routeData) },
      });
    });
  }
  openPopup(): void {
    this.dialog.closeAll();
    this.dialog?.open(ContactPopupComponent, {
      width: window.innerWidth > 1024 ? '420px' : '100%',
      data: { type: 'property', id: this.propertyData?.id },
    });
  }
}

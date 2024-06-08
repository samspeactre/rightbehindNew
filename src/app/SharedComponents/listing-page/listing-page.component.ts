import { Component, OnInit } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLabel, MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PopupComponent } from '../../View/popup/popup.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, finalize, takeUntil } from 'rxjs';
import { HttpService } from '../../Services/http.service';
import { BannerComponent } from '../banner/banner.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { mapSrc } from '../../app.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    BannerComponent,
    MapMarker,
    PropertyCardComponent,
    GoogleMap,
    MatIconModule,
    MatOption,
    MatSelect,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    SearchBarComponent,
    NavbarComponent,
    MatButtonModule,
  ],
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.css',
})
export class ListingPageComponent implements OnInit {
  cards = [
    {
      imgSrc: '../../assets/img/carousel-img-1.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200',
      price: 25000,
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-2.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200',
      price: 25000,
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-3.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200',
      price: 25000,
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-1.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200',
      price: 25000,
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-2.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200',
      price: 25000,
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-3.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200',
      price: 25000,
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-1.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200',
      price: 25000,
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-2.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200',
      price: 25000,
      buttonUrl: '',
    },
    {
      imgSrc: '../../assets/img/carousel-img-3.png',
      name: 'New Apartment Nice View',
      tag: 'miami',
      address: 'Quincy St, Brooklyn, NY, USA  ',
      room: '02',
      bath: '03',
      sqft: '1,200',
      price: 25000,
      buttonUrl: '',
    },
  ];
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: -34.4009703,
    lng: 150.4826715,
  };

  light = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#ebe3cd',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#523735',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f1e6',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#c9b2a6',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#dcd2be',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ae9e90',
        },
      ],
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dfd2ae',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dfd2ae',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#93817c',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#a5b076',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#447530',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f1e6',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#fdfcf8',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f8c967',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#e9bc62',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e98d58',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#db8555',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#806b63',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dfd2ae',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8f7d77',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ebe3cd',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dfd2ae',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#b9d3c2',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#92998d',
        },
      ],
    },
  ];
  options: google.maps.MapOptions = {
    styles: this.light,
    mapId: '8bd4969372a2f413',
    disableDefaultUI: false,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    panControl: false,
  };
  zoom = 15;
  pageType!: string;
  private destroy$ = new Subject<void>();
  search: string = '';
  pageNo: number = 1;
  pageSize: number = 5;
  loader: boolean = true;
  noData: boolean = false;
  loadMore: boolean = false;
  loadMoreLoader: boolean = false;
  param: boolean = false;
  mapScriptLoad: boolean = false;
  screenHeight:number = window.innerHeight;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.appendScript();
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['search']) {
        this.search = params['search'];
      }
    });
  }
  ngOnInit() {
    this.loader = true;
    this.getProperties();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.removeScript();
  }

  getProperties() {
    const searchUrl = `Property/get?search=${this.search}&pageNo=${
      this.pageNo
    }&pageSize=${this.pageSize}&type=${
      this.router.url.includes('buy') ? '1' : '2'
    }`;
    const withoutSearchUrl = `Property/get?pageNo=${this.pageNo}&pageSize=${
      this.pageSize
    }&type=${this.router.url.includes('buy') ? '1' : '2'}`;
    this.http
      .loaderGet(
        this.search ? searchUrl : withoutSearchUrl,
        false,
        false,
        false
      )
      .pipe(
        finalize(() => {
          this.loadMoreLoader = false;
          this.loader = false;
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {},
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response: any) => {
          if (response?.model?.properties) {
            const newProperties = response?.model?.properties || [];
            this.cards = [...newProperties];
            this.noData = this.cards.length === 0;
          } else {
            this.noDataError();
          }
          this.loadMore = this.cards?.length < response?.model?.totalResults;
        },
        (err: any) => {
          this.noDataError();
        }
      );
  }
  noDataError() {
    this.cards = [];
    this.noData = true;
  }
  loadMoreProperties() {
    this.pageNo++;
    this.loadMoreLoader = true;
    this.getProperties();
  }

  searchProperties(event: string) {
    this.loader = true;
    this.search = event;
    this.pageNo = 1;
    this.getProperties();
  }

  openPopup(): void {
    this.dialog.open(PopupComponent);
  }
  appendScript(): void {
    const scriptAvailable = document.querySelector(`script[src="${mapSrc}"]`);
    if (!scriptAvailable) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = mapSrc;
      document.body.appendChild(script);
      script.onload = () => {
        this.mapScriptLoad = true;
      };
    } else {
      this.mapScriptLoad = true;
    }
  }
  removeScript(): void {
    const script = document.querySelector(`script[src="${mapSrc}"]`);
    if (script) {
      script.remove();
    }
  }
}

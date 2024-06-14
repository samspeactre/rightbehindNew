import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatLabel, MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { HttpService } from '../../Services/http.service';
import { PopupComponent } from '../popup/popup.component';
import { BannerComponent } from '../banner/banner.component';
import { MiniLoadingComponent } from '../loaders/mini-loader/mini-loading.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MapComponent } from '../map/map.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { types } from '../../Services/helper.service';

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
    MiniLoadingComponent,
    MapComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.scss',
})
export class ListingPageComponent implements OnInit {
  cards: any = [1, 2, 3]
  zoom = 15;
  pageType!: string;
  private destroy$ = new Subject<void>();
  search: any = '';
  pageNo: number = 1;
  pageSize: number = 10;
  loader: boolean = true;
  noData: boolean = false;
  loadMore: boolean = false;
  loadMoreLoader: boolean = false;
  param: boolean = false;
  screenHeight: number = window.innerHeight;
  latLngArray: any;
  types = types;
  minPriceArray: any;
  maxPriceArray: any;
  bedsArray: any;
  bathArray: any;
  sortsArray: any = [
    'Price: Low to High',
    'Price: High to Low',
    'Beds: Low to High',
    'Beds: High to Low',
    'Bathrooms: Low to High',
    'Bathrooms: High to Low',
    'Date: Early to Late',
    'Date: Late to Early'
  ];
  type: any = null;
  minPrice: any = null;
  maxPrice: any = null;
  beds: any = null;
  baths: any = null;
  sort: string = 'Date: Early to Late';
  center: google.maps.LatLngLiteral = {
    lat: -34.4009703,
    lng: 150.4826715,
  };
  @ViewChild('listing', { static: true }) listing!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['search']) {
        this.search = params['search'];
        if (params['search']) {
          this.param = true
        }
        else {
          this.param = false
        }
      }
      this.scrollToListing();
      this.getProperties(false);
    });
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getProperties(loadMore: boolean) {
    if (!loadMore) {
      this.loader = true;
    }
    const urlParams = new URLSearchParams();
    urlParams.set('pageNo', String(this.pageNo));
    urlParams.set('pageSize', String(this.pageSize));
    urlParams.set('type', this.router.url.includes('buy') ? '1' : '2');
    if (this.search) {
      urlParams.set('search', this.search);
    }
    if (this.minPrice !== null && this.minPrice !== undefined) {
      urlParams.set('minPrice', String(this.minPrice));
    }
    if (this.maxPrice !== null && this.maxPrice !== undefined) {
      urlParams.set('maxPrice', String(this.maxPrice));
    }
    if (this.beds !== null && this.beds !== undefined) {
      urlParams.set('noOfBeds', String(this.beds));
    }
    if (this.baths !== null && this.baths !== undefined) {
      urlParams.set('noOfBaths', String(this.baths));
    }
    if (this.type !== null && this.type !== undefined) {
      urlParams.set('type', String(this.type));
    }
    const Url = `Property/get?${urlParams.toString()}`;
    this.http
      .loaderGet(
        Url,
        false,
        true,
        false,
        false
      )
      .pipe(
        finalize(() => {
          this.loadMoreLoader = false;
          this.loader = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response: any) => {
          if (response?.model?.properties) {
            const newProperties = response?.model?.properties || [];
            if (loadMore) {
              newProperties?.map((property: any) => {
                this.cards.push(property)
              })
            }
            else {
              this.cards = [...newProperties];
            }
            if (this.cards?.length) {
              this.latLngArray = this.cards.map((location: any) => ({ lat: location.latitude, lng: location.longitude }))
              let prices = [...new Set(this.cards.map((data: any) => data.price ?? 0))].sort((a: any, b: any) => a - b);
              this.bedsArray = [...new Set(this.cards.map((data: any) => data.noOfBed ?? 0))].sort((a: any, b: any) => a - b);
              this.bathArray = [...new Set(this.cards.map((data: any) => data.noOfBath ?? 0))].sort((a: any, b: any) => a - b);
              let midIndex = Math.ceil(prices.length / 2);
              this.minPriceArray = prices.slice(0, midIndex);
              this.maxPriceArray = prices.slice(midIndex);
            }
            this.sorting()
            this.noData = response?.model?.properties === 0;
          } else {
            if (!loadMore) {
              this.noDataError();
            }
          }
          if (response?.model?.totalResults) {
            this.loadMore = this.cards?.length < response?.model?.totalResults;
          }
        },
        (err: any) => {
          this.loadMore = false;
          if (!loadMore) {
            this.noDataError();
          }
        }
      );
  }
  noDataError() {
    this.cards = [];
    this.noData = true;
  }
  scrollToListing(): void {
    if (this.listing) {
      this.listing.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  loadMoreProperties() {
    this.pageNo++;
    this.loadMoreLoader = true;
    this.getProperties(true);
  }

  searchProperties(event: string) {
    this.search = event;
    if(event){
      this.router.navigate([this.router.url.includes('buy') ? '/buy' : 'rent'], { queryParams: { search: event } });
    }
    else{
      this.router.navigate([this.router.url.includes('buy') ? '/buy' : 'rent']);
    }
  }

  openPopup(): void {
    this.dialog.open(PopupComponent);
  }
  onFilterChange() {
    this.getProperties(false);
  }
  sorting() {
    switch (this.sort) {
      case 'Price: Low to High':
        this.cards.sort((a: any, b: any) => (a.price || 0) - (b.price || 0));
        break;
      case 'Price: High to Low':
        this.cards.sort((a: any, b: any) => (b.price || 0) - (a.price || 0));
        break;
      case 'Beds: Low to High':
        this.cards.sort((a: any, b: any) => (a.noOfBed || 0) - (b.noOfBed || 0));
        break;
      case 'Beds: High to Low':
        this.cards.sort((a: any, b: any) => (b.noOfBed || 0) - (a.noOfBed || 0));
        break;
      case 'Bathrooms: Low to High':
        this.cards.sort((a: any, b: any) => (a.noOfBath || 0) - (b.noOfBath || 0));
        break;
      case 'Bathrooms: High to Low':
        this.cards.sort((a: any, b: any) => (b.noOfBath || 0) - (a.noOfBath || 0));
        break;
      case 'Date: Early to Late':
        this.cards.sort((a: any, b: any) => (new Date(a.createdAt).getTime() || 0) - (new Date(b.createdAt).getTime() || 0));
        break;
      case 'Date: Late to Early':
        this.cards.sort((a: any, b: any) => (new Date(b.createdAt).getTime() || 0) - (new Date(a.createdAt).getTime() || 0));
        break;
      default:
        break;
    }
  }
  reset() {
    this.search = null;
    this.minPrice = null;
    this.maxPrice = null;
    this.beds = null;
    this.baths = null;
    this.sort = 'Date: Early to Late'
    this.getProperties(false);
  }
  isResetDisabled(): boolean {
    return (
      !this.minPrice &&
      !this.maxPrice &&
      !this.beds &&
      !this.baths
    );
  }
}

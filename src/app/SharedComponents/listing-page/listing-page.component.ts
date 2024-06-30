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
import { HelperService, types } from '../../Services/helper.service';
import { MapDrawComponent } from '../mapDraw/mapDraw.component';
import { CardCarouselComponent } from '../card-carousel/card-carousel.component';
import { CommunityCardComponent } from '../community-card/community-card.component';

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
    NgSelectModule,
    MapDrawComponent,
    CommunityCardComponent
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
  showMap: boolean = false;
  search: any = '';
  pageNo: number = 1;
  pageSize: number = 10;
  loader: boolean = true;
  noData: boolean = false;
  loadMore: boolean = false;
  loadMoreLoader: boolean = false;
  param: boolean = false;
  latLngArray: any;
  types = types;
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
  maxPrice: any = null;
  beds: any = null;
  baths: any = null;
  sort: string = 'Date: Early to Late';
  center: google.maps.LatLngLiteral = {
    lat: -34.4009703,
    lng: 150.4826715,
  };
  url!: string;
  screenHeight:number = window.innerHeight   
  @ViewChild('listing', { static: true }) listing!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    public dialog: MatDialog,
    private helper: HelperService
  ) {
    // helper.appendScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBGYeRS6eNJZNzhvtiEcWb7Fmp1d4bm300&sensor=false&libraries=geometry,places&ext=.js')
    // helper.appendScript('https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js');
    this.url = this.router.url; 
    this.showMap = true
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
    // this.helper.removeScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBGYeRS6eNJZNzhvtiEcWb7Fmp1d4bm300&sensor=false&libraries=geometry,places&ext=.js')
    // this.helper.removeScript('https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js')
  }
  getProperties(loadMore: boolean) {
    if (!loadMore) {
      this.loader = true;
    }
    const urlParams = this.buildUrlParams();
    const Url = `Property/get?${urlParams.toString()}`;

    this.http.loaderGet(Url, false, true, true, false)
      .pipe(
        finalize(() => {
          this.loadMoreLoader = false;
          this.loader = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response: any) => this.handleResponse(response, loadMore),
        (err: any) => this.handleError(loadMore)
      );
  }

  private buildUrlParams(): URLSearchParams {
    const urlParams = new URLSearchParams();

    urlParams.set('pageNo', String(this.pageNo));
    urlParams.set('pageSize', String(this.pageSize));
    urlParams.set('type', this.router.url.includes('buy') ? '1' : '2');

    this.addParamIfExists(urlParams, 'search', this.search);
    this.addParamIfExists(urlParams, 'maxPrice', this.maxPrice);
    this.addParamIfExists(urlParams, 'noOfBeds', this.beds);
    this.addParamIfExists(urlParams, 'noOfBaths', this.baths);
    this.addParamIfExists(urlParams, 'type', this.type);

    return urlParams;
  }

  private addParamIfExists(params: URLSearchParams, key: string, value: any): void {
    if (value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  }

  private handleResponse(response: any, loadMore: boolean): void {
    if (response?.model?.properties) {
      const newProperties = response?.model?.properties || [];

      if (loadMore) {
        this.cards = [...this.cards, ...newProperties];
      } else {
        this.cards = newProperties;
      }
      if (this.cards?.length) {
        this.latLngArray = this.cards.map((location: any) => ({
          lat: location.latitude,
          lng: location.longitude
        }));

        this.maxPriceArray = [...new Set(this.cards.map((data: any) => data.price ?? 0))].sort((a: any, b: any) => a - b);
        this.bedsArray = [...new Set(this.cards.map((data: any) => data.noOfBed ?? 0))].sort((a: any, b: any) => a - b);
        this.bathArray = [...new Set(this.cards.map((data: any) => data.noOfBath ?? 0))].sort((a: any, b: any) => a - b);

        this.sorting();
      }

      this.noData = response?.model?.properties?.length === 0;

      if (response?.model?.totalResults) {
        this.loadMore = this.cards?.length < response?.model?.totalResults;
      }
    } else {
      if (!loadMore) {
        this.noDataError();
      }
    }
  }
  private handleError(loadMore: boolean): void {
    this.loadMore = false;
    if (!loadMore) {
      this.noDataError();
    }
  }
  noDataError() {
    this.cards = [];
    this.noData = true;
  }
  scrollToListing(): void {
    if (this.listing) {
      this.listing?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  loadMoreProperties() {
    this.pageNo++;
    this.loadMoreLoader = true;
    this.getProperties(true);
  }

  searchProperties(event: string) {
    this.search = event;
    if (event) {
      this.router.navigate([this.router.url.includes('buy') ? '/buy' : 'rent'], { queryParams: { search: event } });
    }
    else {
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
    this.maxPrice = null;
    this.beds = null;
    this.baths = null;
    this.sort = 'Date: Early to Late'
    this.getProperties(false);
  }
  isResetDisabled(): boolean {
    return (
      !this.maxPrice &&
      !this.beds &&
      !this.baths
    );
  }
}

import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatLabel, MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { faBuilding, faFilter } from '@fortawesome/free-solid-svg-icons';
import { NgSelectModule } from '@ng-select/ng-select';
import { Store } from '@ngrx/store';
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import { Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';
import { selectLocation, selectUser } from '../../Ngrx/data.reducer';
import { types } from '../../Services/helper.service';
import { HttpService } from '../../Services/http.service';
import { ResizeService } from '../../Services/resize.service';
import { BannerComponent } from '../banner/banner.component';
import { CommunityCardComponent } from '../community-card/community-card.component';
import { DummyMapComponent } from '../dummy-map/dummy-map.component';
import { FilterComponent } from '../filter/filter.component';
import { MiniLoadingComponent } from '../loaders/mini-loader/mini-loading.component';
import { MapComponent } from '../map/map.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopupComponent } from '../popup/popup.component';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchBarListingComponent } from '../search-bar-listing/search-bar-listing.component';
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
    CommunityCardComponent,
    FontAwesomeModule,
    NgxTypedWriterModule,
    FilterComponent,
    DummyMapComponent,
    SearchBarListingComponent,
  ],
  selector: 'app-listing-page-rent',
  templateUrl: './listing-page-rent.component.html',
  styleUrl: './listing-page-rent.component.scss',
})
export class ListingPageRentComponent {
  cards: any = [1, 2, 3];
  originalCards: any = [];
  zoom = 15;
  pageType!: string;
  private destroy$ = new Subject<void>();
  showMap: boolean = false;
  showMapClicked: boolean = false;
  faMap = faMap;
  show: boolean = false;
  filterType: string = 'all';
  faBuilding = faBuilding;
  search: any = null;
  place_id: any = 'ChIJEcHIDqKw2YgRZU-t3XHylv8';
  pageNo: number = 1;
  pageSize: number = 40;
  loader: boolean = true;
  loadMore: boolean = false;
  loadMoreLoader: boolean = false;
  param: boolean = false;
  latLngArray: any = [];
  types = types;
  maxPrices: any;
  minPrices: any;
  bedsArray: any;
  bathArray: any;
  faBars = faFilter;
  loadFirstTime: boolean = true;
  highlighted: any;
  removeHighlighted: any;
  sortsArray: any = [
    'Price: Low to High',
    'Price: High to Low',
    'Beds: Low to High',
    'Beds: High to Low',
    'Bathrooms: Low to High',
    'Bathrooms: High to Low',
    'Date: Early to Late',
    'Date: Late to Early',
  ];
  type: any = null;
  maxPrice: any = null;
  minPrice: any = null;
  poly: any = null;
  beds: any = null;
  baths: any = null;
  user$ = this.store.select(selectUser);
  userDetails: any;
  location$ = this.store.select(selectLocation);
  locationDetails: any;
  sort: string = 'Date: Late to Early';
  center: google.maps.LatLngLiteral = {
    lat: 25.761681,
    lng: -80.191788,
  };
  navHeight: number = 0;
  searchHeight: number = 0;
  url!: string;
  screenHeight: number = window.innerHeight;
  @ViewChild('listing', { static: true }) listing!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    public dialog: MatDialog,
    public resize: ResizeService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private store: Store
  ) {
    this.url = this.router.url;
    this.showMap = true;
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
    this.location$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((location) => {
        this.locationDetails = location;
        if (!this.search && this.locationDetails) {
          this.center = {
            lat: this.locationDetails?.lat,
            lng: this.locationDetails?.lng,
          };
          this.search = this.locationDetails.placeName;
          this.place_id = this.locationDetails.placeId;
          this.center = {
            lat: this.locationDetails.lat,
            lng: this.locationDetails.lng,
          };
          this.router.navigate(['rent'], {
            queryParams: {
              search: this.search,
              placeId: this.place_id,
              lat: this.locationDetails.lat,
              lng: this.locationDetails.lng,
            },
          });
        }
      });
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params?.search) {
        this.search = params?.search;
        this.place_id = params?.placeId;
        if (params?.lat && params?.lng) {
          this.center = { lat: Number(params?.lat), lng: Number(params?.lng) };
        }
        if (params?.search) {
          this.param = true;
        } else {
          this.param = false;
        }
        this.scrollToListing();
        this.getProperties(false);
      }
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.searchHeight = document.getElementById('searchHeight').clientHeight;
      this.navHeight =
        document.getElementById('navbarHeight').clientHeight +
        this.searchHeight;
      this.screenHeight = window.innerHeight - this.navHeight;
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getDrawnProperties() {
    const Url = `property/get/poly`;
    this.http
      .loaderPost(Url, { poly: this.poly }, false)
      .pipe(
        finalize(() => {
          this.loadMoreLoader = false;
          this.loader = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((response: any) => {
        this.handleResponse(
          response?.model?.properties,
          false,
          'properties',
          response?.model
        );
      });
  }
  getProperties(loadMore: boolean) {
    if (!loadMore) {
      this.cards = [1, 2, 3];
      this.loader = true;
    }
    const urlParams = this.buildUrlParams();
    const Url = `Property/get?${urlParams.toString()}`;

    this.http
      .loaderGet(Url, this.userDetails ? true : false, true, true, false)
      .pipe(
        finalize(() => {
          this.loadMoreLoader = false;
          this.loader = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response: any) => {
          this.handleResponse(
            response?.model?.properties,
            loadMore,
            'properties',
            response?.model
          );
        },
        (err: any) => this.handleError(loadMore)
      );
  }

  private buildUrlParams(): URLSearchParams {
    const urlParams = new URLSearchParams({
      pageNo: String(this.pageNo),
      pageSize: String(this.pageSize),
      type: '2',
    });

    const optionalParams = {
      search: this.search,
      maxPrice: this.maxPrice,
      minPrice: this.minPrice,
      noOfBeds: this.beds,
      noOfBaths: this.baths,
      propertyType: this.type,
      poly: this.poly,
    };

    for (const [key, value] of Object.entries(optionalParams)) {
      if (value !== undefined && value !== null && value != '') {
        urlParams.set(key, String(value));
      }
    }

    return urlParams;
  }
  private handleResponse(
    response: any,
    loadMore: boolean,
    type: string,
    mainResponse: any
  ): void {
    if (response?.length) {
      const newProperties = response || [];
      if (loadMore) {
        this.cards = [...this.cards, ...newProperties];
      } else {
        this.cards = newProperties;
      }
      if (this.cards?.length) {
        this.latLngArray = this.cards
          .filter(
            (location: any) =>
              location.latitude !== null && location.longitude !== null
          )
          .map((location: any) => ({
            lat: location.latitude,
            lng: location.longitude,
          }));
        this.center = this.latLngArray?.[0];
        if (this.loadFirstTime) {
          const prices = this.cards.map((data) => data.price ?? 0);
          this.minPrices = 0;
          this.maxPrices = 100000000;
          this.loadFirstTime = false;
        }
        this.bedsArray = [
          ...new Set(this.cards.map((data: any) => data.noOfBed ?? 0)),
        ].sort((a: any, b: any) => a - b);
        this.bathArray = [
          ...new Set(this.cards.map((data: any) => data.noOfBath ?? 0)),
        ].sort((a: any, b: any) => a - b);
        this.sorting(null);
      }
      if (!this.place_id) {
        const searchString = this.getSearchString(this.router.url);
        if (searchString) {
          console.log(searchString.split(',')[0]);
          this.place_id = searchString.split(',')[0];
        }
      }
      this.originalCards = this.cards;
      this.loadMore = this.cards?.length < mainResponse?.totalResults;
    } else {
      if (!loadMore) {
        this.noDataError();
      }
    }
  }
  getSearchString(url) {
    const searchPattern = /[?&]placeId=([^&]*)/;
    const match = url.match(searchPattern);
    if (match) {
      let searchString = match[1];
      return searchString;
    }
    return null;
  }
  private handleError(loadMore: boolean): void {
    this.loadMore = false;
    if (!loadMore) {
      this.noDataError();
    }
  }
  noDataError() {
    this.cards = [];
    this.latLngArray = [];
  }
  scrollToListing(): void {
    if (this.listing) {
      this.listing?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
  loadMoreProperties(type: string) {
    this.pageNo++;
    this.loadMoreLoader = true;
    this.getProperties(true);
  }

  searchProperties(event: any) {
    if (event.search && event.place_id && event.center) {
      this.search = event.search;
      this.place_id = event.place_id;
      this.center = event.center;
      this.router.navigate(['rent'], {
        queryParams: {
          search: this.search,
          placeId: this.place_id,
          lat: event?.center?.lat,
          lng: event.center?.lng,
        },
      });
    } else if (event.search && event.place_id) {
      this.search = event.search;
      this.place_id = event.place_id;
      this.router.navigate(['rent'], {
        queryParams: {
          search: this.search,
          placeId: this.place_id,
        },
      });
    } else if (this.locationDetails) {
      this.search = this.locationDetails?.placeName;
      this.place_id = this.locationDetails?.placeId;
      this.center = {
        lat: this.locationDetails?.lat,
        lng: this.locationDetails?.lng,
      };
      this.router.navigate(['rent'], {
        queryParams: {
          search: this.search,
          placeId: this.place_id,
          lat: this.locationDetails?.lat,
          lng: this.locationDetails?.lng,
        },
      });
    } else {
      this.search = 'Miami, FL, USA';
      this.place_id = 'ChIJEcHIDqKw2YgRZU-t3XHylv8';
      this.center = {
        lat: 25.761681,
        lng: -80.191788,
      };
      this.router.navigate(['rent'], {
        queryParams: {
          search: this.search,
          placeId: this.place_id,
          lat: 25.761681,
          lng: -80.191788,
        },
      });
    }
  }

  openPopup(): void {
    this.dialog.open(PopupComponent, {
      scrollStrategy: new NoopScrollStrategy(),
    });
  }
  onFilterChange(event: any, type: any) {
    this[type] = event;
  }
  onRangeFilter() {
    this.closeFil();
    this.getProperties(false);
  }
  sorting(event) {
    if (event) {
      this.sort = event;
    }
    switch (this.sort) {
      case 'Price: Low to High':
        this.cards.sort((a: any, b: any) => (a.price || 0) - (b.price || 0));
        break;
      case 'Price: High to Low':
        this.cards.sort((a: any, b: any) => (b.price || 0) - (a.price || 0));
        break;
      case 'Beds: Low to High':
        this.cards.sort(
          (a: any, b: any) => (a.noOfBed || 0) - (b.noOfBed || 0)
        );
        break;
      case 'Beds: High to Low':
        this.cards.sort(
          (a: any, b: any) => (b.noOfBed || 0) - (a.noOfBed || 0)
        );
        break;
      case 'Bathrooms: Low to High':
        this.cards.sort(
          (a: any, b: any) => (a.noOfBath || 0) - (b.noOfBath || 0)
        );
        break;
      case 'Bathrooms: High to Low':
        this.cards.sort(
          (a: any, b: any) => (b.noOfBath || 0) - (a.noOfBath || 0)
        );
        break;
      case 'Date: Early to Late':
        this.cards.sort(
          (a: any, b: any) =>
            (new Date(a.createdAt).getTime() || 0) -
            (new Date(b.createdAt).getTime() || 0)
        );
        break;
      case 'Date: Late to Early':
        this.cards.sort(
          (a: any, b: any) =>
            (new Date(b.createdAt).getTime() || 0) -
            (new Date(a.createdAt).getTime() || 0)
        );
        break;
      default:
        break;
    }
  }
  reset() {
    this.closeFil();
    this.search = null;
    this.place_id = 'ChIJEcHIDqKw2YgRZU-t3XHylv8';
    this.maxPrice = null;
    this.minPrice = null;
    this.beds = null;
    this.baths = null;
    this.sort = 'Date: Early to Late';
    this.getProperties(false);
  }
  isResetDisabled(): boolean {
    return (
      !this.maxPrice &&
      !this.minPrice &&
      !this.beds &&
      !this.baths &&
      !this.type
    );
  }
  hover(event) {
    this.highlighted = event;
  }
  hoverLeft(event) {
    this.removeHighlighted = event;
  }
  showFil(event) {
    document.body.classList.add('bodyLoader');
    this.show = true;
    this.filterType = event.type;
  }
  closeFil() {
    document.body.classList.remove('bodyLoader');
    this.show = false;
  }
  highlightCard(cardId: string) {
    const elementId = `card-${cardId}`;
    const cardElement = this.elRef.nativeElement.querySelector(`#${elementId}`);
    if (cardElement) {
      const highlightedElements =
        this.elRef.nativeElement.querySelectorAll('.highlightCard');
      highlightedElements.forEach((element: HTMLElement) => {
        this.renderer.removeClass(element, 'highlightCard');
      });
      const rect = cardElement.getBoundingClientRect();
      const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!isInView) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      this.renderer.addClass(cardElement, 'highlightCard');
    }
  }
  drawSearch(event) {
    this.poly = event;
    this.getDrawnProperties();
  }
  resetCordinates(event) {
    this.poly = null;
    if (event) {
      this.getProperties(false);
    } else {
      this.cards = this.originalCards;
    }
  }
}

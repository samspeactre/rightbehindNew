import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import { Subject, finalize, takeUntil } from 'rxjs';
import { types } from '../../Services/helper.service';
import { HttpService } from '../../Services/http.service';
import { ResizeService } from '../../Services/resize.service';
import { BannerComponent } from '../banner/banner.component';
import { CommunityCardComponent } from '../community-card/community-card.component';
import { MiniLoadingComponent } from '../loaders/mini-loader/mini-loading.component';
import { MapComponent } from '../map/map.component';
import { MapDrawComponent } from '../mapDraw/mapDraw.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopupComponent } from '../popup/popup.component';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FilterComponent } from '../filter/filter.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
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
    CommunityCardComponent,
    FontAwesomeModule,
    NgxTypedWriterModule,
    FilterComponent,
  ],
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.scss',
})
export class ListingPageComponent {
  cards: any = [1, 2, 3];
  zoom = 15;
  pageType!: string;
  private destroy$ = new Subject<void>();
  showMap: boolean = false;
  showMapClicked: boolean = false;
  faMap = faMap;
  show: boolean = false;
  filterType: string = 'all';
  faBuilding = faBuilding;
  search: any = '';
  pageNo: number = 1;
  pageSize: number = 20;
  loader: boolean = true;
  noData: boolean = false;
  loadMore: boolean = false;
  loadMoreLoader: boolean = false;
  param: boolean = false;
  latLngArray: any;
  types = types;
  maxPrices: any;
  minPrices: any;
  bedsArray: any;
  bathArray: any;
  faBars = faFilter;
  loadFirstTime: boolean = true;
  highlighted: any;
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
  beds: any = null;
  baths: any = null;
  sort: string = 'Date: Late to Early';
  center: google.maps.LatLngLiteral = {
    lat: -34.4009703,
    lng: 150.4826715,
  };
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
    private renderer: Renderer2
  ) {
    this.url = this.router.url;
    this.showMap = true;
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['search']) {
        this.search = params['search'];
        if (params['search']) {
          this.param = true;
        } else {
          this.param = false;
        }
      }
      this.scrollToListing();
      if (this.url == '/communities') {
        this.getInquiries(false);
      } else {
        this.getProperties(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getProperties(loadMore: boolean) {
    if (!loadMore) {
      this.loader = true;
    }
    if (this.search == '' || !this.search) {
      this.cards = [1, 2, 3];
    }
    const urlParams = this.buildUrlParams();
    const Url = `Property/get?${urlParams.toString()}`;

    this.http
      .loaderGet(Url, false, true, true, false)
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
      type: '2',
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
    if (response) {
      const newProperties = response || [];
      if (loadMore) {
        this.cards = [...this.cards, ...newProperties];
      } else {
        this.cards = newProperties;
      }
      if (this.cards?.length) {
        this.latLngArray = this.cards.map((location: any) => ({
          lat: location.latitude,
          lng: location.longitude,
        }));
        if (type == 'properties') {
          if (this.loadFirstTime) {
            const prices = this.cards.map((data) => data.price ?? 0);
            this.minPrices = Math.min(...prices);
            this.maxPrices = Math.max(...prices);
            this.loadFirstTime = false;
          }
          this.bedsArray = [
            ...new Set(this.cards.map((data: any) => data.noOfBed ?? 0)),
          ].sort((a: any, b: any) => a - b);
          this.bathArray = [
            ...new Set(this.cards.map((data: any) => data.noOfBath ?? 0)),
          ].sort((a: any, b: any) => a - b);
        }
        this.sorting(null);
      }

      this.noData = mainResponse?.properties?.length === 0;
      this.loadMore = this.cards?.length < mainResponse?.totalResults;
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
      this.listing?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
  loadMoreProperties(type: string) {
    this.pageNo++;
    this.loadMoreLoader = true;
    if (type == 'properties') {
      this.getProperties(true);
    } else {
      this.getInquiries(true);
    }
  }

  searchProperties(event: string) {
    this.search = event;
    if (event) {
      this.router.navigate(
        [this.router.url.includes('buy') ? '/buy' : 'rent'],
        { queryParams: { search: event } }
      );
    } else {
      this.router.navigate([this.router.url.includes('buy') ? '/buy' : 'rent']);
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
  getInquiries(loadMore: boolean) {
    if (!loadMore) {
      this.loader = true;
    }
    const urlParams = this.buildUrlParams();
    const Url = `Forum/get?${urlParams.toString()}`;

    this.http
      .loaderGet(Url, false, true, true, false)
      .pipe(
        finalize(() => {
          this.loadMoreLoader = false;
          this.loader = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response: any) =>
          this.handleResponse(
            response?.model?.forums,
            loadMore,
            'communities',
            response?.model
          ),
        (err: any) => this.handleError(loadMore)
      );
  }
  hover(event) {
    this.highlighted = event;
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
}

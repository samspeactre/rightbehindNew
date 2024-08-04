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
import { selectUser } from '../../Ngrx/data.reducer';
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
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.scss',
})
export class ListingPageComponent {
  cards: any = [1, 2, 3];
  originalCards: any = [];
  zoom = 15;
  pageType!: string;
  private destroy$ = new Subject<void>();
  showMap: boolean = false;
  showMapClicked: boolean = false;
  faMap = faMap;
  show: boolean = false;
  faBuilding = faBuilding;
  search: any = '';
  pageNo: number = 1;
  pageSize: number = 40;
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
  removeHighlighted: any;
  type: any = null;
  user$ = this.store.select(selectUser);
  userDetails: any;
  sort: string = 'Date: Late to Early';
  center: google.maps.LatLngLiteral = {
    lat: -34.4009703,
    lng: 150.4826715,
  };
  navHeight: number = 0;
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
      this.getInquiries(false);
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.navHeight = document.getElementById('navbarHeight').clientHeight;
      this.screenHeight =
        window.innerWidth > 1024
          ? window.innerHeight - this.navHeight
          : window.innerHeight;
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private buildUrlParams(): URLSearchParams {
    const urlParams = new URLSearchParams({
      pageNo: String(this.pageNo),
      pageSize: String(this.pageSize),
      type: '2',
    });

    const optionalParams = {
      search: this.search,
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
        this.latLngArray = this.cards
          .filter(
            (location: any) =>
              location.latitude !== null && location.longitude !== null
          )
          .map((location: any) => ({
            lat: location.latitude,
            lng: location.longitude,
          }));
      }

      this.noData = mainResponse?.properties?.length === 0;
      this.originalCards = this.cards;
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
    this.getInquiries(true);
  }

  searchProperties(event: any) {
    this.search = event.search;
    if (event.search) {
      this.router.navigate(['communities'], {
        queryParams: { search: this.search },
      });
    } else {
      this.router.navigate(['communities']);
    }
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
  hoverLeft(event) {
    this.removeHighlighted = event;
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

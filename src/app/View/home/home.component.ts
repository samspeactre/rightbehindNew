import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpService } from '../../Services/http.service';
import { BlogCarouselComponent } from '../../SharedComponents/blog-carousel/blog-carousel.component';
import { CardCarouselComponent } from '../../SharedComponents/card-carousel/card-carousel.component';
import { FooterComponent } from '../../SharedComponents/footer/footer.component';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';
import { RentalCarouselComponent } from '../../SharedComponents/rental-carousel/rental-carousel.component';
import { SearchBarComponent } from '../../SharedComponents/search-bar/search-bar.component';
import { BannerComponent } from '../../SharedComponents/banner/banner.component';
import { MiniLoadingComponent } from '../../SharedComponents/loaders/mini-loader/mini-loading.component';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { CountUpModule } from 'ngx-countup';
import { Store } from '@ngrx/store';
import { selectRental, selectSell } from '../../Ngrx/data.reducer';
import { MapComponent } from '../../SharedComponents/map/map.component';
import { ContactPopupComponent } from '../../SharedComponents/contact-popup/contact-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ResizeService } from '../../Services/resize.service';
import { RentPopupComponent } from '../../SharedComponents/rent-popup/rent-popup.component';
import { CommonModule } from '@angular/common';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { SearchBarListingComponent } from '../../SharedComponents/search-bar-listing/search-bar-listing.component';
@Component({
  standalone: true,
  imports: [
    SearchBarListingComponent,
    NavbarComponent,
    RentalCarouselComponent,
    FooterComponent,
    BlogCarouselComponent,
    CardCarouselComponent,
    SearchBarComponent,
    MatButtonModule,
    BannerComponent,
    MiniLoadingComponent,
    CountUpModule,
    MapComponent,
    CommonModule,
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  counters: { name: string; count: number }[] = [
    { name: ' Property Listings', count: 350 },
    { name: 'Monthly Users', count: 200 },
    { name: 'New Property every Month', count: 30 },
  ];
  faChevronCircleLeft = faChevronLeft;
  faChevronCircleRight = faChevronRight;
  intervalIds: any[] = [];
  scrollPosition: number = 0;
  rent$ = this.store.select(selectRental);
  rent: any;
  sell$ = this.store.select(selectSell);
  sell: any;
  mapHeight: number = 0;
  private destroy$ = new Subject<void>();
  blogArray: any = [];
  blogLatArray: any = [];
  videoArray: any = [];
  videoLatArray: any = [];
  bothArray: any = [];
  bothLatArray: any = [];

  private scrollSubject = new Subject<Event>();
  @ViewChild('secondCol') secondCol!: ElementRef;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.scrollSubject.next(event);
    if (this.mapHeight == 0) {
      this.setMapHeight();
    }
  }
  constructor(
    private router: Router,
    public resize: ResizeService,
    private dialog: MatDialog,
    private http: HttpService,
    private store: Store
  ) {
    this.rent$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((rent) => {
        this.rent = rent;
      });
    this.sell$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((sell) => {
        this.sell = sell;
      });
  }
  ngOnInit() {
    this.scrollSubject.pipe(debounceTime(100)).subscribe(() => {
      const scrollPosition =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      this.scrollPosition = scrollPosition;
    });
    this.wheres();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  searchProperties(event: any) {
    if (event) {
      this.router.navigate(['/rent'], {
        queryParams: { search: event?.search, placeId: event.place_id },
      });
    }
  }
  setMapHeight() {
    if (this.secondCol) {
      this.mapHeight = this.secondCol?.nativeElement.offsetHeight;
    }
  }

  openPopup(): void {
    this.dialog?.open(ContactPopupComponent, {
      width: window.innerWidth > 1024 ? '400px' : '100%',
      data: { type: 'contact' },
      scrollStrategy: new NoopScrollStrategy(),
    });
  }

  openSellPopup(type: string): void {
    this.dialog.open(RentPopupComponent, {
      width: window.innerWidth > 1024 ? '850px' : '100%',
      data: type,
      scrollStrategy: new NoopScrollStrategy(),
    });
  }
  wheres() {
    this.http
      .loaderGet('Home/get/propertyTour', true, true)
      .subscribe((response: any) => {
        this.bothArray = response?.model?.homePropertyTourList?.filter(
          (item: any) => item?.videoUrl && item?.blogUrl
        );
        this.blogArray = response?.model?.homePropertyTourList?.filter(
          (item: any) => !item?.videoUrl && item?.blogUrl
        );
        this.videoArray = response?.model?.homePropertyTourList?.filter(
          (item: any) => item?.videoUrl && !item?.blogUrl
        );
        this.bothArray?.map((item) => {
          this.bothLatArray.push({ lat: item?.latitude, lng: item?.longitude });
        });
        this.videoArray?.map((item) => {
          this.videoLatArray.push({
            lat: item?.latitude,
            lng: item?.longitude,
          });
        });
        this.blogArray?.map((item) => {
          this.blogLatArray.push({ lat: item?.latitude, lng: item?.longitude });
        });
      });
  }
}

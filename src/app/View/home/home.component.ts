import { Component, HostListener, OnDestroy, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
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
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CountUpModule } from 'ngx-countup';
import { Store } from '@ngrx/store';
import { selectRental, selectSell } from '../../Ngrx/data.reducer';
import { MapComponent } from '../../SharedComponents/map/map.component';
import { ContactPopupComponent } from '../../SharedComponents/contact-popup/contact-popup.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  standalone: true,
  imports: [
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
    MatDialogModule
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  counters: { name: string; count: number; }[] = [
    { name: ' Property Listings', count: 350 },
    { name: 'Monthly Users', count: 200 },
    { name: 'New Property every Month', count: 30 },
  ];
  faChevronCircleLeft = faChevronLeft;
  faChevronCircleRight = faChevronRight;
  screenWidth: number = window.innerWidth;
  intervalIds: any[] = [];
  scrollPosition: number = 0;
  rent$ = this.store.select(selectRental);
  rent: any;
  sell$ = this.store.select(selectSell);
  sell: any;
  mapHeight:number = 0;
  windowInnerWidth:number = window.innerWidth;
  private destroy$ = new Subject<void>();
  array = [
    { "lat": 25.853681, "lng": -80.191788 }, // ~10 km north
  { "lat": 25.669681, "lng": -80.191788 }, // ~10 km south
  { "lat": 25.761681, "lng": -80.091788 }, // ~10 km east
  { "lat": 25.761681, "lng": -80.291788 }, // ~10 km west
  { "lat": 25.829681, "lng": -80.115788 }  // ~10 km northeast
  ]
  private scrollSubject = new Subject<Event>();
  @ViewChild('secondCol') secondCol!: ElementRef;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.scrollSubject.next(event);
    if(this.mapHeight == 0){
      this.setMapHeight()
    }
  }
  constructor(private router: Router,private dialog: MatDialog, private http: HttpService, private store: Store) {
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
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.scrollPosition = scrollPosition;
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  searchProperties(event: any) {
    if (event) {
      this.router.navigate(['/buy'], { queryParams: { search: event } });
    }
  }
  setMapHeight() {
    if (this.secondCol) {
      this.mapHeight = this.secondCol.nativeElement.offsetHeight;
    }
  }

  navigateToNextPage() {
    this.router.navigate(['/off-market']);
  }

  openPopup(): void {
    this.dialog?.open(ContactPopupComponent, {
      width: window.innerWidth > 1024 ? '28%' : '100%',
      data: {type:'contact'}
    });
  }
}

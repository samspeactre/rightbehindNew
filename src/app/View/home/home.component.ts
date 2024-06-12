import { Component, HostListener, OnDestroy, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
    CountUpModule
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  counters: { name: string; count: number; }[] = [
    { name: ' Property Listings', count: 350 },
    { name: 'Monthly Users', count: 200 },
    { name: 'New Property every Month', count: 30 },
  ];
  faChevronCircleLeft = faChevronLeft;
  faChevronCircleRight = faChevronRight;
  screenWidth: number = window.innerWidth;
  intervalIds: any[] = [];
  buyCards: any[] = [1, 2, 3, 4];
  sellCards: any[] = [1, 2, 3, 4];
  scrollPosition: number = 0;
  private destroy$ = new Subject<void>();
  dataLoaded: boolean = false;

  private scrollSubject = new Subject<Event>();

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.scrollSubject.next(event);
  }

  constructor(private router: Router, private http: HttpService) { }

  ngOnInit() {
    this.scrollSubject.pipe(debounceTime(100)).subscribe(() => {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.scrollPosition = scrollPosition;
      if (this.scrollPosition > 50 && !this.dataLoaded) {
        this.dataLoaded = true;
        this.getBuyProperties();
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.dataLoaded) {
        this.getBuyProperties();
      }
    }, 10000);
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

  getBuyProperties() {
    this.http
      .get(`Property/get?pageNo=1&pageSize=10&type=1`, false, false)
      .pipe(
        finalize(() => {
          this.getSellProperties();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((response) => {
        if (response?.model?.properties) {
          response.model.properties.forEach((property: any) => {
            this.buyCards.push(property);
          });
        }
      });
  }

  getSellProperties() {
    this.http
      .get(`Property/get?pageNo=1&pageSize=10&type=2`, false, false)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response?.model?.properties) {
          response.model.properties.forEach((property: any) => {
            this.sellCards.push(property);
          });
        }
      });
  }
}

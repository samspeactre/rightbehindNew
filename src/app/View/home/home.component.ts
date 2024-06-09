import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { HttpService } from '../../Services/http.service';
import { BlogCarouselComponent } from '../../SharedComponents/blog-carousel/blog-carousel.component';
import { CardCarouselComponent } from '../../SharedComponents/card-carousel/card-carousel.component';
import { FooterComponent } from '../../SharedComponents/footer/footer.component';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';
import { RentalCarouselComponent } from '../../SharedComponents/rental-carousel/rental-carousel.component';
import { SearchBarComponent } from '../../SharedComponents/search-bar/search-bar.component';
import { BannerComponent } from '../../SharedComponents/banner/banner.component';
import { MiniLoadingComponent } from '../../SharedComponents/loaders/mini-loader/mini-loading.component';

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
    MiniLoadingComponent
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  counters: {
    name: string;
    count: number;
    minCount: number;
    maxCount: number;
  }[] = [
    { name: ' Property Listings', count: 0, minCount: 0, maxCount: 350 },
    { name: 'Monthly Users', count: 0, minCount: 0, maxCount: 200 },
    { name: 'New Property every Month', count: 0, minCount: 0, maxCount: 30 },
  ];
  screenWidth:number = window.innerWidth;
  intervalIds: any[] = [];
  buyCards: any;
  sellCards: any;
  scrollPosition: number = 0;
  loading: boolean = true;
  private destroy$ = new Subject<void>();
  dataLoaded: boolean = false;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.scrollPosition = scrollPosition;
    if (
      this.scrollPosition > 50 &&
      !this.dataLoaded &&
      !this.buyCards?.length &&
      !this.sellCards?.length
    ) {
      this.dataLoaded = true;
      this.getBuyProperties();
    }
  }
  constructor(private router: Router, private http: HttpService) {}
  ngOnInit() {
    this.startCounters();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (
        !this.dataLoaded &&
        !this.buyCards?.length &&
        !this.sellCards?.length
      ) {
        this.getBuyProperties();
      }
    }, 10000);
  }
  ngOnDestroy() {
    this.stopCounters();
    this.destroy$.next();
    this.destroy$.complete();
  }

  startCounters() {
    this.counters.forEach((counter, index) => {
      const intervalId = setInterval(() => {
        if (counter.count < counter.maxCount) {
          counter.count++;
        } else {
          this.stopCounter(index);
        }
      }, 30);
      this.intervalIds.push(intervalId);
    });
  }

  stopCounters() {
    this.intervalIds.forEach((id) => clearInterval(id));
  }

  stopCounter(index: number) {
    clearInterval(this.intervalIds[index]);
  }
  searchProperties(event: any) {
    if(event){
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
      .subscribe(
        (response) => {
          if (response?.model?.properties) {
            const newProperties = response?.model?.properties || [];
            this.buyCards = [...newProperties];
          } else {
            this.noDataError('buyCards');
          }
        },
        (err) => {
          this.noDataError('buyCards');
        }
      );
  }
  getSellProperties() {
    this.http
      .get(`Property/get?pageNo=1&pageSize=10&type=2`, false, false)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (response) => {
          if (response?.model?.properties) {
            const newProperties = response?.model?.properties || [];
            this.sellCards = [...newProperties];
          } else {
            this.noDataError('sellCards');
          }
        },
        (err) => {
          this.noDataError('sellCards');
        }
      );
  }
  noDataError(type: string) {
    if (type == 'sellCards') {
      this.sellCards = [];
    } else {
      this.buyCards = [];
    }
  }
}

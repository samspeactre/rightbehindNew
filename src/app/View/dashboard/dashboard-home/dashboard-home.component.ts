import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faEnvelope,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRightLong,
  faKey,
  faMapMarkerAlt,
  faSearch,
  faTag,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { selectRental, selectUser } from '../../../Ngrx/data.reducer';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';
import { RentalCarouselComponent } from '../../../SharedComponents/rental-carousel/rental-carousel.component';
import { MapComponent } from '../../../SharedComponents/map/map.component';
import { ResizeService } from '../../../Services/resize.service';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from '../../../SharedComponents/property-card/property-card.component';
import { RouterModule } from '@angular/router';
import { HttpService } from '../../../Services/http.service';
@Component({
  standalone: true,
  imports: [
    MatIconModule,
    RentalCarouselComponent,
    RouterModule,
    PropertyCardComponent,
    MatButtonModule,
    CommonModule,
    FontAwesomeModule,
    NgApexchartsModule,
    MapComponent,
  ],
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent {
  display: any;
  faArrowLeft = faArrowRightLong;
  faMapMarker = faMapMarkerAlt;
  faSaleTag = faTag;
  faKey = faKey;
  faUsers = faUsers;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: any;
  faUser = faUser;
  faBell = faBell;
  faEnvelope = faEnvelope;
  faSearch = faSearch;
  user$ = this.store.select(selectUser);
  user: any;
  private destroy$ = new Subject<void>();
  @ViewChild('secondCol') secondCol!: ElementRef;
  mapHeight: number = 0;
  dashboard: any;
  rent: any;
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  constructor(
    private http: HttpService,
    public dialog: MatDialog,
    public resize: ResizeService,
    private store: Store
  ) {
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((user) => {
        this.user = user;
      });
    this.chartOptions = {
      series: [
        {
          name: 'Example Series',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: true,
          barHeight: '15%',
          borderRadius: 2,
          borderRadiusApplication: 'end',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: this.months,
      },
      colors: [
        '#607D8B', // Blue Grey
        '#8BC34A', // Light Green
        '#FF9800', // Orange
        '#E91E63', // Pink
        '#2196F3', // Blue
        '#9C27B0', // Purple
        '#FFC107', // Amber
        '#00BCD4', // Cyan
        '#FFEB3B', // Yellow
        '#795548', // Brown
        '#4CAF50', // Green
        '#F44336'  // Red
      ]
    };
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit() {
    this.getInquiries();
  }
  ngAfterViewInit() {
    if (this.mapHeight == 0) {
      setTimeout(() => {
        this.setMapHeight();
      }, 500);
    }
  }
  setMapHeight() {
    if (this.secondCol) {
      this.mapHeight = this.secondCol?.nativeElement.offsetHeight;
    }
  }
  getInquiries() {
    this.http
      .loaderGet('Property/get/me?pageSize=4&type=2&pageNo=1', true)
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        finalize(() => {
          this.getDashboard();
        })
      )
      .subscribe((response) => {
        this.rent = response?.model?.properties;
      });
  }
  getDashboard() {
    this.http
      .loaderGet('dashboard/property/get', true)
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((response) => {
        this.dashboard = response?.model;
        const propertyCountsData = this.dashboard?.propertyCountsData;
        const data = this.months.map((month) => {
          const monthData = propertyCountsData.find((item: any) =>
            item.month?.includes(month)
          );
          return monthData ? monthData.propertyCount : 0;
        });
        this.chart.updateSeries([
          {
            name: 'Property Counts',
            data: data,
          },
        ]);
        const propertyLatLongDataWithoutId =
          this.dashboard.propertyLatLongData.map((item: any) => ({
            lat: item.latitude,
            lng: item.longitude,
          }));
        this.dashboard = {
          ...this.dashboard,
          propertyLatLongData: propertyLatLongDataWithoutId,
        };
      });
  }
}

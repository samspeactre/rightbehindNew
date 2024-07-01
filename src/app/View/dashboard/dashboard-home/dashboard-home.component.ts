import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightLong, faKey, faMapMarkerAlt, faSearch, faTag } from '@fortawesome/free-solid-svg-icons';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { selectUser } from '../../../Ngrx/data.reducer';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { RentalCarouselComponent } from '../../../SharedComponents/rental-carousel/rental-carousel.component';
import { MapComponent } from '../../../SharedComponents/map/map.component';
import { ResizeService } from '../../../Services/resize.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, FontAwesomeModule, NgApexchartsModule, MapComponent],
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  display: any;
  faArrowLeft = faArrowRightLong
  faMapMarker = faMapMarkerAlt
  faSaleTag = faTag
  faKey = faKey
  @Output() viewAllListingsEvent = new EventEmitter<void>();
  @Output() viewOffMarketEvent = new EventEmitter<void>();
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: any;
  faUser = faUser
  faBell = faBell
  faEnvelope = faEnvelope
  faSearch = faSearch
  user$ = this.store.select(selectUser);
  user: any;
  private destroy$ = new Subject<void>();
  @ViewChild('secondCol') secondCol!: ElementRef;
  mapHeight:number=0;
  constructor(public dialog: MatDialog, public resize:ResizeService, private store: Store) {
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((user) => {
        this.user = user
      })
    this.chartOptions = {
      series: [
        {
          name: 'Example Series',
          data: [10, 20, 30, 40, 50]
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: true,
          barHeight: '15%',
          borderRadius: 2,
          borderRadiusApplication: 'end'
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
      },
      colors: ['#607D8B', '#8BC34A', '#FF9800', '#E91E63', '#2196F3'],
    };
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  viewAllListings() {
    this.viewAllListingsEvent.emit();
  }

  viewOffMarket() {
    this.viewOffMarketEvent.emit();
  }
  Analaytics = [
    { leads: '10', call: '12', emails: '8', view: '5', click: '3', ctr: '5' },
  ]
  ngOnInit() {
    
  }
  ngAfterViewInit(){
    if(this.mapHeight == 0){
      setTimeout(() => {
        this.setMapHeight()
      },500);
    }
  }
  setMapHeight() {
    if (this.secondCol) {
      this.mapHeight = this.secondCol?.nativeElement.offsetHeight;
    }
  }
}

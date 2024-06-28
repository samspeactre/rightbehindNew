import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
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
@Component({
  standalone:true,
  imports:[MatIconModule, MatButtonModule, FontAwesomeModule, NgApexchartsModule],
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  display: any;
  faArrowLeft=faArrowRightLong
  faMapMarker=faMapMarkerAlt
  faSaleTag=faTag
  faKey=faKey
  @Output() viewAllListingsEvent = new EventEmitter<void>();
  @Output() viewOffMarketEvent = new EventEmitter<void>();
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions:any;
  faUser=faUser
  faBell=faBell
  faEnvelope=faEnvelope
  faSearch=faSearch
  user$ = this.store.select(selectUser);
  user: any;
  private destroy$ = new Subject<void>();
  width=window.innerWidth
  constructor(public dialog: MatDialog, private store:Store) {
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
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      horizontal: true,
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  viewAllListings() {
    this.viewAllListingsEvent.emit();
  }

  viewOffMarket(){
    this.viewOffMarketEvent.emit();
  }
  Analaytics = [
    { leads: '10', call:'12', emails: '8', view: '5', click: '3', ctr: '5' },
  ]
  ngOnInit() {
  }
}

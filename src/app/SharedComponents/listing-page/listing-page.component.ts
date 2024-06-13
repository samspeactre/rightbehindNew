import { Component, OnInit } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatLabel, MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { HttpService } from '../../Services/http.service';
import { PopupComponent } from '../../View/popup/popup.component';
import { BannerComponent } from '../banner/banner.component';
import { MiniLoadingComponent } from '../loaders/mini-loader/mini-loading.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MapComponent } from '../map/map.component';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.scss',
})
export class ListingPageComponent implements OnInit {
  cards: any = [1, 2, 3]
  zoom = 15;
  pageType!: string;
  private destroy$ = new Subject<void>();
  search: string = '';
  pageNo: number = 1;
  pageSize: number = 10;
  loader: boolean = true;
  noData: boolean = false;
  loadMore: boolean = false;
  loadMoreLoader: boolean = false;
  param: boolean = false;
  screenHeight: number = window.innerHeight;
  latLngArray:any;
  center: google.maps.LatLngLiteral = {
    lat: -34.4009703,
    lng: 150.4826715,
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['search']) {
        this.search = params['search'];
        if (params['search']) {
          this.param = true
        }
        else {
          this.param = false
        }
      }
    });
  }
  ngOnInit() {
    this.loader = true;
    this.getProperties(false);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProperties(loadMore: boolean) {
    const searchUrl = `Property/get?search=${this.search}&pageNo=${this.pageNo
      }&pageSize=${this.pageSize}&type=${this.router.url.includes('buy') ? '1' : '2'
      }`;
    const withoutSearchUrl = `Property/get?pageNo=${this.pageNo}&pageSize=${this.pageSize
      }&type=${this.router.url.includes('buy') ? '1' : '2'}`;
    this.http
      .loaderGet(
        this.search ? searchUrl : withoutSearchUrl,
        false,
        true,
        false,
        false
      )
      .pipe(
        finalize(() => {
          this.loadMoreLoader = false;
          this.loader = false;
          if (!loadMore && this.param) {
            this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: {},
            });
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response: any) => {
          if (response?.model?.properties) {
            const newProperties = response?.model?.properties || [];
            if (loadMore) {
              newProperties?.map((property: any) => {
                this.cards.push(property)
              })
            }
            else {
              this.cards = [...newProperties];
            }
            this.latLngArray = this.cards.map((location:any) => ({ lat: location.latitude, lng: location.longitude }))
            this.noData = this.cards.length === 0;
          } else {
            if (!loadMore) {
              this.noDataError();
            }
          }
          if(response?.model?.totalResults){
            this.loadMore = this.cards?.length < response?.model?.totalResults;
          }
        },
        (err: any) => {
          this.loadMore = false;
          if (!loadMore) {
            this.noDataError();
          }
        }
      );
  }
  noDataError() {
    this.cards = [];
    this.noData = true;
  }
  loadMoreProperties() {
    this.pageNo++;
    this.loadMoreLoader = true;
    this.getProperties(true);
  }

  searchProperties(event: string) {
    this.loader = true;
    this.search = event;
    this.pageNo = 1;
    this.getProperties(false);
  }

  openPopup(): void {
    this.dialog.open(PopupComponent);
  }

}

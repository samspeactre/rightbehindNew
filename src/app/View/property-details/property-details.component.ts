import { Component } from '@angular/core';
import { FooterComponent } from '../../SharedComponents/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatLabel, MatSelect } from '@angular/material/select';
import { SearchBarComponent } from '../../SharedComponents/search-bar/search-bar.component';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';
import { PropertyCardComponent } from '../../SharedComponents/property-card/property-card.component';
import { HttpService } from '../../Services/http.service';

@Component({
  standalone: true,
  imports: [
    FooterComponent,
    MatIconModule,
    MatOption,
    MatSelect,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    SearchBarComponent,
    NavbarComponent,
    MatButtonModule,
    PropertyCardComponent,
  ],
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css',
})
export class PropertyDetailsComponent {
  pageType!: string;
  private destroy$ = new Subject<void>();
  search: string = '';
  pageNo: number = 1;
  pageSize: number = 5;
  cards: any[] = [1,2,3];
  loader: boolean = true;
  noData: boolean = false;
  loadMore:boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService
  ) {
    this.activatedRoute.data
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((data: any) => {
        this.pageType = data?.type;
        this.getProperties();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProperties() {
    const searchUrl = `Property/get?search=${this.search}&pageNo=${this.pageNo}&pageSize=${this.pageSize}`;
    const withoutSearchUrl = `Property/get?pageNo=${this.pageNo}&pageSize=${this.pageSize}`;
    this.http
      .loaderGet(this.search ? searchUrl : withoutSearchUrl, false, false, false)
      .pipe(
        finalize(() => {
          this.loader = false;
        }),
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((response) => {
        if (response?.model?.properties) {
          const newProperties = response?.model?.properties || [];
          this.cards = [...newProperties];
          this.noData = this.cards.length === 0;
        } else {
          this.cards = [];
          this.noData = true;
        }
      });
  }

  loadMoreProperties() {
    this.pageNo++;
    this.getProperties();
  }

  searchProperties(event: string) {
    this.search = event;
    this.pageNo = 1;
    this.getProperties();
  }
}


import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MiniLoadingComponent } from '../../../SharedComponents/loaders/mini-loader/mini-loading.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../../Services/http.service';
import { ChatPopupComponent } from '../../../SharedComponents/add-chat-popup/add-chat-popup.component';
import { InputComponent } from '../../../SharedComponents/input/input.component';
import { CommunityCardComponent } from '../../../SharedComponents/community-card/community-card.component';
import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    InputComponent,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MiniLoadingComponent,
  ],
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  searchForm: any = this.fb.group({
    search: [''],
  });
  faPlus = faPlus;
  inquiries: any;
  originalInquiries: any;
  p: number = 1;
  totalItems!: number;
  itemsPerPage: number = 7;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.getInquiries();
    this.initializeSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeSearch(): void {
    this.searchForm
      .get('search')
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => {
          return of(this.getInquiries());
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {});
  }

  getInquiries(): void {
    const urlParams = this.buildUrlParams();
    const Url = `Property/get?${urlParams.toString()}`;
    this.http
      .loaderGet(Url, true, true)
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((response) => {
        this.inquiries = response?.model?.properties;
        this.originalInquiries = response?.model?.properties;
        this.totalItems = response?.model?.totalResults;
      });
  }
  private buildUrlParams(): URLSearchParams {
    const urlParams = new URLSearchParams({
      pageNo: String(this.p),
      pageSize: String(this.itemsPerPage),
      type: this.router.url.includes('buy') ? '1' : '2',
    });

    const optionalParams = {
      search: this.searchForm.controls['search'].value,
      type: 2,
    };

    for (const [key, value] of Object.entries(optionalParams)) {
      if (value !== undefined && value !== null && value !== '') {
        urlParams.set(key, String(value));
      }
    }

    return urlParams;
  }
  onPageChange(event: number): void {
    this.p = event;
    this.getInquiries();
  }
}

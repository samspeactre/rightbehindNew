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
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
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
  startDate: any;
  endDate: any;
  maxDate: any;
  totalItems!: number;
  itemsPerPage: number = 7;
  minDate: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private http: HttpService
  ) {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate = this.formatDate(firstDayOfMonth);
    this.endDate = this.formatDate(today);
    this.maxDate = this.formatDate(today);
    this.minDate = this.formatDate(this.getNextDay(firstDayOfMonth));
  }
  onStartDateChange(newStartDate: string) {
    this.startDate = newStartDate;
    const startDateObj = new Date(newStartDate);
    this.minDate = this.formatDate(this.getNextDay(startDateObj));
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  getNextDay(date: Date): Date {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    return nextDay;
  }
  ngOnInit(): void {
    console.log(this.startDate, this.endDate);

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
          return of(this.search());
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {});
  }

  getInquiries(): void {
    const urlParams = this.buildUrlParams();
    const Url = `admindashboard/get/payments?${urlParams.toString()}`;
    this.http
      .loaderGet(Url, true, true)
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((response) => {
        this.inquiries = response?.modelList;
        this.originalInquiries = response?.modelList;
      });
  }
  private buildUrlParams(): URLSearchParams {
    const urlParams = new URLSearchParams({
      startDate: String(this.startDate),
      endDate: String(this.endDate),
    });
    return urlParams;
  }
  search(): void {
    if (!this.searchForm?.controls['search'].value) {
      this.inquiries = this.originalInquiries;
    } else {
      const lowerSearchTerm = this.searchForm?.controls['search'].value.toLowerCase();
      this.inquiries = this.originalInquiries.filter((inquiry:any) => 
        inquiry.id.toString().includes(lowerSearchTerm) ||
        inquiry.paymentNumber.toLowerCase().includes(lowerSearchTerm) ||
        inquiry.status.toLowerCase().includes(lowerSearchTerm) ||
        inquiry.amount.toString().includes(lowerSearchTerm)
      );
    }
  }
}

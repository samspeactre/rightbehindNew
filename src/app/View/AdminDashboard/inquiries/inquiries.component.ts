import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MiniLoadingComponent } from '../../../SharedComponents/loaders/mini-loader/mini-loading.component';
import { faPhoneAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../../Services/http.service';
import { ChatPopupComponent } from '../../../SharedComponents/add-chat-popup/add-chat-popup.component';
import { InputComponent } from '../../../SharedComponents/input/input.component';
import { CommunityCardComponent } from '../../../SharedComponents/community-card/community-card.component';
import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { NgxPaginationModule } from 'ngx-pagination';
import { faEnvelope, faEye } from '@fortawesome/free-regular-svg-icons';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CommunityCardComponent,
    InputComponent,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MiniLoadingComponent,
    NgxPaginationModule
  ],
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.scss'],
})
export class InquiriesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  searchForm: any = this.fb.group({
    search: [''],
  });
  faEnvelope = faEnvelope;
  faPhone = faPhoneAlt;
  faEye = faEye;
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
    const Url = `inquiry/get?${urlParams.toString()}`;
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
        this.totalItems = response?.model?.totalResults;
      });
  }
  private buildUrlParams(): URLSearchParams {
    const urlParams = new URLSearchParams({
      pageNo: String(this.p),
      pageSize: String(this.itemsPerPage),
    });

    const optionalParams = {
      search: this.searchForm.controls['search'].value,
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
  route(contactInfo: string, type: string): void {
    if (type === 'phone') {
      window.location.href = `tel:${contactInfo}`;
    } else if (type === 'email') {
      window.location.href = `mailto:${contactInfo}`;
    }
  }
}

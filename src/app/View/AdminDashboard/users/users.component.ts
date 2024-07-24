import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { HttpService } from '../../../Services/http.service';
import { InputComponent } from '../../../SharedComponents/input/input.component';
import { MiniLoadingComponent } from '../../../SharedComponents/loaders/mini-loader/mini-loading.component';
import { faEdit, faEye } from '@fortawesome/free-regular-svg-icons';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MiniLoadingComponent,
    NgxPaginationModule,
  ],
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  searchForm: any = this.fb.group({
    search: [''],
  });
  faPlus = faPlus;
  faEye = faEye;
  inquiries: any;
  originalInquiries: any;
  p: number = 1;
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
          return of(this.search());
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {});
  }

  getInquiries(): void {
    const Url = `AdminDashboard/user/property/get`;
    this.http
      .loaderGet(Url, true)
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
  onPageChange(event: number): void {
    this.p = event;
  }
  route(id: any) {
    this.router.navigate(['/admin-dashboard/users/user-detail'], {
      queryParams: { id },
    });
  }
  search(): void {
    if (!this.searchForm?.controls['search'].value) {
      this.inquiries = this.originalInquiries;
    } else {
      const lowerSearchTerm = this.searchForm?.controls['search'].value.toLowerCase();
      this.inquiries = this.originalInquiries.filter((inquiry:any) => 
        inquiry.id.toString().includes(lowerSearchTerm) ||
        inquiry.fullName.toLowerCase().includes(lowerSearchTerm) ||
        inquiry.email.toLowerCase().includes(lowerSearchTerm)
      );
    }
  }
}

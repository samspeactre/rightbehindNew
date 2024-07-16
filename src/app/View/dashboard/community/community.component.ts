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
  ],
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  searchForm:any = this.fb.group({
    search: [''],
  });
  faPlus = faPlus;
  inquiries: any;
  originalInquiries: any;

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
    this.searchForm.get('search').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => {
          return of(this.filterInquiries(searchTerm));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {});
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(ChatPopupComponent, {
      height: '595px',
      width: window.innerWidth > 1024 ? '30%' : '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data) {
        this.inquiries.push({
          description: result.data.Description,
          latitude: result.data.Latitude,
          longitude: result.data.Longitude,
          title: result.data.Title,
        });
      }
    });
  }

  private getInquiries(): void {
    this.http
      .loaderGet('Forum/get?pageSize=500&byUser=true', true, true)
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
      )
      .subscribe((response) => {
        this.inquiries = response?.model?.forums;
        this.originalInquiries = response?.model?.forums;
      });
  }

  private filterInquiries(searchTerm: string): void {
    if (!searchTerm) {
      this.inquiries = this.originalInquiries;
    } else {
      this.inquiries = this.originalInquiries.filter((inquiry: any) =>
        (inquiry.city && inquiry.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inquiry.address && inquiry.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inquiry.title && inquiry.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inquiry.description && inquiry.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../../SharedComponents/input/input.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { selectUser } from '../../../Ngrx/data.reducer';
import { Store } from '@ngrx/store';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  finalize,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';
import { HttpService } from '../../../Services/http.service';
import { updateUserData } from '../../../Ngrx/data.action';
import { LoaderService } from '../../../Services/loader.service';
import {
  faPlus,
  faPlusCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { assetUrl } from '../../../Services/helper.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { WhereComponent } from './where/where.component';
@Component({
  standalone: true,
  imports: [
    InputComponent,
    NgxPaginationModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  selector: 'app-wheres',
  templateUrl: './wheres.component.html',
  styleUrl: './wheres.component.scss',
})
export class WheresComponent {
  private destroy$ = new Subject<void>();
  searchForm: any = this.fb.group({
    search: [''],
  });
  inquiries: any;
  originalInquiries: any;
  p: number = 1;
  totalItems!: number;
  itemsPerPage: number = 7;
  faTimes = faTimes;
  faEdit = faEdit;
  faPlus = faPlus;
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
    const urlParams = this.buildUrlParams();
    const Url = `PropertyTour/get?${urlParams.toString()}`;
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
      pageNo: String(1),
      pageSize: String(100000),
    });

    return urlParams;
  }
  onPageChange(event: number): void {
    this.p = event;
  }
  openPopup(type: string, data: any): void {
    const dialogRef = this.dialog.open(WhereComponent, {
      height: '80%',
      width: window.innerWidth > 1024 ? '33%' : '100%',
      data: { status: type, content: data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data) {
        this.getInquiries();
      }
    });
  }
  search(): void {
    if (!this.searchForm?.controls['search'].value) {
      this.inquiries = this.originalInquiries;
    } else {
      const lowerSearchTerm = this.searchForm?.controls['search'].value.toLowerCase();
      this.inquiries = this.originalInquiries.filter((inquiry:any) => 
        inquiry.id.toString().includes(lowerSearchTerm) ||
        inquiry.videoUrl.toLowerCase().includes(lowerSearchTerm) ||
        inquiry.blogUrl.toLowerCase().includes(lowerSearchTerm)
      );
    }
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../../SharedComponents/input/input.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectUser } from '../../../Ngrx/data.reducer';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, distinctUntilChanged, finalize, of, switchMap, takeUntil } from 'rxjs';
import { HttpService } from '../../../Services/http.service';
import { updateUserData } from '../../../Ngrx/data.action';
import { LoaderService } from '../../../Services/loader.service';
import { faPlus, faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { assetUrl } from '../../../Services/helper.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { BlogComponent } from './blog/blog.component';

@Component({
  standalone: true,
  imports: [InputComponent, NgxPaginationModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent { private destroy$ = new Subject<void>();
  searchForm: any = this.fb.group({
    search: [''],
  });
  inquiries: any;
  originalInquiries: any;
  p: number = 1;
  totalItems!: number;
  itemsPerPage: number = 7;
  faTimes=faTimes;
  faEdit=faEdit
  faPlus=faPlus;
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
  openPopup(type: string): void {
    this.dialog.open(BlogComponent, {
      height: '80%',
      width: window.innerWidth > 1024 ? '33%' : '100%',
      data: type,
    });
  }
}
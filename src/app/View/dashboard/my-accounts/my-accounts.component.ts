import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../../../Services/http.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { InputComponent } from '../../../SharedComponents/input/input.component';
import { FormBuilder } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, InputComponent, FontAwesomeModule, NgxPaginationModule],
  selector: 'app-my-accounts',
  templateUrl: './my-accounts.component.html',
  styleUrl: './my-accounts.component.scss',
})
export class MyAccountsComponent {
  searchForm: any = this.fb.group({
    search: [''],
  });
  faEye=faEye;
  itemsPerPage: number = 7;
  private destroy$ = new Subject<void>();
  payments: any = [];
  p: number = 1;
  totalItems!: number;
  constructor(private http: HttpService, private fb:FormBuilder, private router:Router) {}
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit() {
    this.getTransaction();
  }
  getTransaction() {
    this.http
      .loaderGet('payment/get', true, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.payments = response?.model?.payments;
      });
  }
  async navigateAndClose(card:any) {
    this.router.navigate(['/preview'], {
      queryParams: { id: card?.id, type: card?.propertyType },
    });
  }
}

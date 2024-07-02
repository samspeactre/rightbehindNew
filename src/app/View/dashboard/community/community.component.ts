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
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, CommunityCardComponent, InputComponent, FormsModule, FontAwesomeModule, ReactiveFormsModule, MiniLoadingComponent],
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {
  private destroy$ = new Subject<void>();
  searchForm = this.fb.group({
    search: ['']
  });
  faPlus = faPlus;
  inquiries: any;
  constructor(private fb: FormBuilder, private router: Router, public dialog: MatDialog, private http: HttpService) {
    this.getInquiries()
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  openPopup(): void {
    const dialogRef = this.dialog.open(ChatPopupComponent, {
      height: '100%',
      width: window.innerWidth > 1024 ? '33%' : '100%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.data) {
        this.inquiries.push({
          description:result?.data?.Description,
          latitude:result?.data?.Latitude,
          longitude:result?.data?.Longitude,
          title:result?.data?.Title
        })
      }
    });
  }
  getInquiries() {
    this.http.loaderGet('Forum/get?pageSize=500', true, true)
    .pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    )
    .subscribe((response) => {
      this.inquiries = response?.model?.forums
    })
  }
}

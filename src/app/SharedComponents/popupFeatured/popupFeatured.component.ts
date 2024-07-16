import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { HelperService } from '../../Services/helper.service';
import { HttpService } from '../../Services/http.service';
import { MapComponent } from '../map/map.component';

@Component({
  standalone: true,
  imports: [
    MatIconModule,
    MapComponent,
    FontAwesomeModule,
    CommonModule,
    MatDialogContent,
    MatButtonModule,
    RouterModule,
    FontAwesomeModule,
    NgbTooltipModule,
  ],
  selector: 'app-popup-featured',
  templateUrl: './popupFeatured.component.html',
  styleUrl: './popupFeatured.component.scss',
})
export class PopupFeaturedComponent implements OnInit {
  propertyData: any;
  faCheck = faCheckCircle;
  private destroy$ = new Subject<void>();
  packages: any = [1, 2];
  selectedIds: any = { featuredId: null, promotionId: null };
  constructor(
    public dialogRef: MatDialogRef<PopupFeaturedComponent>,
    private router: Router,
    private store: Store,
    private http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public helper: HelperService
  ) {
    this.propertyData = data;
    if(data){
      localStorage.setItem('propertyData',JSON.stringify(data))
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit() {
    this.getFeaturedList();
  }

  navigateAndClose() {
    this.dialogRef.close({ data: true });
  }
  getFeaturedList() {
    this.http
      .loaderGet(`ProductPrice/prices/${this.propertyData?.id}`, true)
      .subscribe((response) => {
        this.packages = response?.modelList;
      });
  }

  onCheckboxChange(item: any): void {
    const checkbox = document.getElementById(
      item.id.toString()
    ) as HTMLInputElement;
    if (checkbox.checked) {
      if (item.name === 'Featured') {
        this.selectedIds.featuredId = item.id;
      } else if (item.name === 'Promotion') {
        this.selectedIds.promotionId = item.id;
      }
    } else {
      if (item.name === 'Featured') {
        this.selectedIds.featuredId = null;
      } else if (item.name === 'Promotion') {
        this.selectedIds.promotionId = null;
      }
    }
  }
  submit() {
    const { featuredId, promotionId } = this.selectedIds;
    let url = `Payment/checkout/${this.propertyData?.id}`;
    if (featuredId) {
      url += `/${featuredId}`;
    }
    if (promotionId) {
      url += `/${promotionId}`;
    }

    this.http.loaderGet(url, true).subscribe((response) => {
      const url = response?.model?.checkoutUrl;
      window.open(url, '_parent');
    });
  }
}

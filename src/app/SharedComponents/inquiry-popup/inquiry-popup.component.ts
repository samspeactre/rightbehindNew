import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { selectUser } from '../../Ngrx/data.reducer';
import { types } from '../../Services/helper.service';
import { MapComponent } from '../map/map.component';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MapComponent,
    FontAwesomeModule
  ],
  selector: 'app-inquiry-popup',
  templateUrl: './inquiry-popup.component.html',
  styleUrl: './inquiry-popup.component.scss',
})
export class InquiryPopupComponent {
  selected: any;
  active: any;
  user$ = this.store.select(selectUser);
  types = types;
  user: any;
  faEnvelope=faEnvelope;
  faPhone=faPhoneAlt
  private destroy$ = new Subject<void>();
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<InquiryPopupComponent>,
    private store: Store,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.active = data;
    this.active = {
      ...this.active,
      latitude: Number(this.active?.latitude),
      longitude: Number(this.active?.longitude),
    };
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  route(contactInfo: string, type: string): void {
    if (type === 'phone') {
      window.location.href = `tel:${contactInfo}`;
    } else if (type === 'email') {
      window.location.href = `mailto:${contactInfo}`;
    }
  }
}

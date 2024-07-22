import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Subject } from 'rxjs';
import { selectUser } from '../../Ngrx/data.reducer';
import { types } from '../../Services/helper.service';
import { InputComponent } from '../input/input.component';
import { MapComponent } from '../map/map.component';
@Component({
  standalone: true,
  imports: [
    InputComponent,
    SweetAlert2Module,
    RouterModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MapComponent,
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
}

import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { selectUser } from '../../Ngrx/data.reducer';
import { types } from '../../Services/helper.service';
import { AuthService } from '../../TsExtras/auth.service';
import { InputComponent } from '../input/input.component';
import { MapComponent } from '../map/map.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { HttpService } from '../../Services/http.service';
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
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpService,
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

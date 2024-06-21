import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
@Component({
  standalone: true,
  imports: [InputComponent,SweetAlert2Module , RouterModule, MatButtonModule, FormsModule, ReactiveFormsModule, CommonModule, MapComponent],
  selector: 'app-rent-popup',
  templateUrl: './rent-popup.component.html',
  styleUrl: './rent-popup.component.scss'
})
export class RentPopupComponent {
  selected: any;
  active: string = 'rent';
  user$ = this.store.select(selectUser);
  types = types;
  propertyForm: any = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    propertyType: ['', Validators.required],
    unit: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    address: ['', Validators.required],
    latLng: ['', Validators.required]
  });
  user: any;
  private destroy$ = new Subject<void>();
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RentPopupComponent>,
    private router: Router, private fb: FormBuilder, private auth: AuthService,
    private store: Store,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((user) => {
        if (user) {
          this.user = user;
          this.propertyForm.patchValue({
            firstName: user?.fullName.split(' ')[0],
            lastName: user?.fullName.split(' ')[1],
            email: user?.email
          })
          this.propertyForm.removeControl('password');
        }
      });
    this.active = data
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  makeActive(type: string) {
    this.active = type;
  }
  onSubmit() {
    if (this.user) {
      this.fireSwal()
    }
    else {
      const data = {
        fullName: this.propertyForm.controls['firstName'].value + ' ' + this.propertyForm.controls['lastName'].value,
        password: this.propertyForm.controls['password'].value,
        email: this.propertyForm.controls['email'].value
      }
      this.auth.register(data)
        .pipe(
          takeUntil(this.destroy$),
          distinctUntilChanged(
            (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
          )
        )
        .subscribe((response: any) => {
          this.auth.login(data)
            .pipe(
              takeUntil(this.destroy$),
              distinctUntilChanged(
                (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
              )
            ).subscribe((loginResponse) => {
              this.auth.handleLoginResponse(loginResponse);
              this.fireSwal()
            });
        });
    }
  }
  fireSwal() {
    Swal.fire({
      text: 'Are you sure this is a residential rental?',
      icon: 'info',
      confirmButtonText: 'Yes, this is a residential rental',
      showCancelButton: true,
      cancelButtonText: 'No, this is not a residential rental'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.navigate()
      }
    });
  }
  navigate() {
    const data = {
      ...this.propertyForm.value,
      active:this.active
    }
    if (this.active == 'rent') {
      this.router.navigate(['/rent-add-property'], { queryParams: { data: JSON.stringify(data)  } });
    }
    else {
      this.router.navigate(['/sell-add-property'], { queryParams: { data: JSON.stringify(data) } });
    }
    this.dialogRef.close();
  }
  setFormValue(event: any, control: string) {
    this.propertyForm.controls[control].setValue(event);
  }
}

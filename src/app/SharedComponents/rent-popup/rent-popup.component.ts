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
  selector: 'app-rent-popup',
  templateUrl: './rent-popup.component.html',
  styleUrl: './rent-popup.component.scss',
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
    unit: [],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    address: ['', Validators.required],
    latLng: ['', Validators.required],
  });
  user: any;
  private destroy$ = new Subject<void>();
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RentPopupComponent>,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpService,
    private store: Store,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.active = data;
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
            email: user?.email,
          });
        }
        if (this.active == 'sell') {
          this.propertyForm.addControl(
            'contactNo',
            new FormControl('', Validators.required)
          );
        }
        else {
          this.propertyForm.get('unit').valueChanges.subscribe((value: any) => {
            if (Number(value) > 20) {
              if (!this.propertyForm.contains('contactNo')) {
                this.propertyForm.addControl('contactNo', new FormControl('', Validators.required));
              }
            } else {
              if (this.propertyForm.contains('contactNo')) {
                this.propertyForm.removeControl('contactNo');
              }
            }
          });
        }
        if (user || this.active == 'sell') {
          this.propertyForm.removeControl('password');
        }
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  makeActive(type: string) {
    this.active = type;
  }

  onSubmit() {
    if (this.active == 'rent') {
      if (this.user) {
        this.fireSwal();
      } else {
        const data = {
          fullName:
            this.propertyForm.controls['firstName'].value +
            ' ' +
            this.propertyForm.controls['lastName'].value,
          password: this.propertyForm.controls['password'].value,
          email: this.propertyForm.controls['email'].value,
        };
        this.auth
          .register(data)
          .pipe(
            takeUntil(this.destroy$),
            distinctUntilChanged(
              (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
            )
          )
          .subscribe((response: any) => {
            this.auth
              .login(data)
              .pipe(
                takeUntil(this.destroy$),
                distinctUntilChanged(
                  (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
                )
              )
              .subscribe((loginResponse) => {
                this.auth.handleLoginResponse(loginResponse);
                this.fireSwal();
              });
          });
      }
    } else {
      this.sendInquiry();
    }
  }

  fireSwal() {
    Swal.fire({
      text: 'Are you sure this is a residential rental?',
      icon: 'info',
      confirmButtonText: 'Yes, this is a residential rental',
      showCancelButton: true,
      cancelButtonText: 'No, this is not a residential rental',
      allowOutsideClick: false
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.fireDisclaimerSwal();
      }
    });
  }
  fireDisclaimerSwal() {
    const unitCount = Number(this.propertyForm?.controls['unit']?.value);
    let message = '';
    if (unitCount === 1) {
      message = "Featured listing for a single unit (90 days): $50 lifetime";
    } else if (unitCount > 1 && unitCount <= 10) {
      message = "Featured listings for multiple units (2-10 units): $150 per month";
    } else if (unitCount > 10 && unitCount <= 20) {
      message = "Featured listings for multiple units (11-20 units): $350 per month";
    } else {
      message = "For more than 20 units, please contact us for a customized quote";
    }

    Swal.fire({
      title: 'Price Overview',
      text: message,
      icon: 'info',
      confirmButtonText: unitCount > 20 ? 'Get A Quote' : 'I Acknowledge',
      showCancelButton: true,
      cancelButtonText: 'Go Back',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        if (unitCount > 20) {
          this.sendInquiry();
        } else {
          this.navigate();
        }
      }
    });
  }
  navigate() {
    const data = {
      ...this.propertyForm.value,
      active: this.active,
    };
    if (this.active == 'rent') {
      this.router.navigate(['/rent-add-property'], {
        queryParams: { data: JSON.stringify(data) },
      });
    } else {
      this.router.navigate(['/sell-add-property'], {
        queryParams: { data: JSON.stringify(data) },
      });
    }
    this.dialogRef.close();
  }
  setFormValue(event: any, control: string) {
    this.propertyForm.controls[control].setValue(event);
  }
  sendInquiry() {
    const data = {
      propertyType: 1,
      firstName: this.propertyForm.controls['firstName'].value,
      lastName: this.propertyForm.controls['lastName'].value,
      email: this.propertyForm.controls['email'].value,
      contactNo: this.propertyForm.controls['contactNo'].value,
      units: Number(this.propertyForm.controls['unit'].value),
      address: this.propertyForm.controls['address'].value?.address,
      latitude: JSON.stringify(this.propertyForm.controls['latLng'].value?.lat),
      longitude: JSON.stringify(
        this.propertyForm.controls['latLng'].value?.lng
      ),
    };
    this.http
      .loaderPost('sellinquiry/create', data, true)
      .subscribe((response) => {
        this.getAQuote(response?.model?.id)
      });
  }
  getAQuote(id:any){
    this.http.loaderPost('QuoteRequest/create',{sellInquiryId:id},true).subscribe((response)=>{
      this.dialogRef.close();
    })
  }
  checkUnitValidator(){
    const unitCount = Number(this.propertyForm?.controls['unit']?.value);
    if (unitCount > 20) {
      return true
    }
    else {
      return false
    }
  }
}

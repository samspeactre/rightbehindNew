import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { selectUser } from '../../Ngrx/data.reducer';
import { HelperService, types } from '../../Services/helper.service';
import { AuthService } from '../../TsExtras/auth.service';
import { InputComponent } from '../input/input.component';
import { MapComponent } from '../map/map.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { HttpService } from '../../Services/http.service';

@Component({
  standalone: true,
  imports: [InputComponent, SweetAlert2Module, RouterModule, MatButtonModule, FormsModule, ReactiveFormsModule, CommonModule, MapComponent],
  selector: 'app-contact-popup',
  templateUrl: './contact-popup.component.html',
  styleUrl: './contact-popup.component.scss'
})
export class ContactPopupComponent {
  selected: any;
  active: any;
  user$ = this.store.select(selectUser);
  types = types;
  propertyForm: any = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });
  user: any;
  private destroy$ = new Subject<void>();
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ContactPopupComponent>,
    private router: Router, private fb: FormBuilder, private auth: AuthService,
    private store: Store,
    private http: HttpService,
    private helper: HelperService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.active = data
    if (this.active?.type === 'property') {
      this.propertyForm.addControl('password', this.fb.control('', [Validators.required, Validators.minLength(8)]));
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSubmit() {
    if (this.active?.type === 'property') {
      const data = {
        fullName: `${this.propertyForm.controls['firstName'].value} ${this.propertyForm.controls['lastName'].value}`,
        password: this.propertyForm.controls['password'].value,
        email: this.propertyForm.controls['email'].value
      };

      this.auth.register(data).pipe(
        takeUntil(this.destroy$),
        switchMap((registerResponse) => this.auth.login(data).pipe(
          takeUntil(this.destroy$),
          switchMap((loginResponse) => {
            this.auth.handleLoginResponse(loginResponse);
            return this.helper.createContact(this.active?.id).pipe(
              takeUntil(this.destroy$),
              switchMap((contactResponse) => {
                const id = contactResponse?.model?.id;
                const messageData = {
                  chatContactId: id,
                  message: this.propertyForm.controls['message'].value
                };
                if (id) {
                  return this.http.loaderPost('Chat/send', messageData, true).pipe(
                    takeUntil(this.destroy$)
                  );
                } else {
                  return of(null);
                }
              })
            );
          })
        ))
      ).subscribe({
        next: () => {
          this.propertyForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('An error occurred:', err);
        }
      });
    } else {
      console.log('hello');
    }
  }
}

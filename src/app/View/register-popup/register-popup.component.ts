import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { addUserData } from '../../Ngrx/data.action';
import { HttpService } from '../../Services/http.service';
import { InputComponent } from '../../SharedComponents/input/input.component';
import { LoginPopupComponent } from '../../SharedComponents/login-popup/login-popup.component';

@Component({
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    InputComponent,
  ],
  selector: 'app-register-popup',
  templateUrl: './register-popup.component.html',
  styleUrl: './register-popup.component.css',
})
export class RegisterPopupComponent {
  registerForm: FormGroup;
  private destroy$ = new Subject<void>();
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterPopupComponent>,
    private fb: FormBuilder,
    private http: HttpService,
    private store: Store
  ) {
    this.registerForm = this.fb.group({
      userAccountTypeId: [2],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      receiveUpdates: [false],
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSubmit(): void {
    this.http
      .loaderPost('Account/signup', this.registerForm.value, false)
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((response) => {
        this.login()
      });
  }

  openLoginPopup(): void {
    // Close the current dialog
    this.dialogRef.close();

    // Open the registration dialog
    this.dialog.open(LoginPopupComponent, {
      height: '85%',
      width: window.innerWidth > 1024 ? '27%' : '100%'
    });
  }
  login(){
    const data = {
      email:this.registerForm.controls['email'].value,
      password:this.registerForm.controls['password'].value
     }
    this.http
      .loaderPost('Account/login', data, false)
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((response) => {
        this.dialogRef.close();
        this.store.dispatch(addUserData({user:response?.model}))
      });
  }
}

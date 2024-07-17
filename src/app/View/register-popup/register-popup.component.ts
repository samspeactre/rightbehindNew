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
import { Subject, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { InputComponent } from '../../SharedComponents/input/input.component';
import { LoginPopupComponent } from '../../SharedComponents/login-popup/login-popup.component';
import { AuthService } from '../../TsExtras/auth.service';
import { ResizeService } from '../../Services/resize.service';

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
    private authService: AuthService,
    public resize:ResizeService
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
    this.authService.register(this.registerForm.value).pipe(
      takeUntil(this.destroy$),
      switchMap((registerResponse: any) => {
        const data = {
          email: this.registerForm.controls['email'].value,
          password: this.registerForm.controls['password'].value
        };
        return this.authService.login(data).pipe(
          takeUntil(this.destroy$)
        );
      })
    ).subscribe({
      next: (loginResponse: any) => {
        this.authService.handleLoginResponse(loginResponse);
        this.dialogRef.close();
      },
      error: (err: any) => {
        console.error('An error occurred:', err);
      }
    });
  }
  openLoginPopup(): void {
    this.dialogRef.close();
    this.dialog.open(LoginPopupComponent, {
      height: '530px',
      width: window.innerWidth > 1024 ? '350px' : '100%'
    });
  }

}

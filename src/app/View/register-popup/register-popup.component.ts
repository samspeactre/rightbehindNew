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
import { MatIconModule } from '@angular/material/icon';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    InputComponent,
    MatIconModule
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
    public resize: ResizeService
  ) {
    this.registerForm = this.fb.group({
      userAccountTypeId: [2],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
    const data = {
      userAccountTypeId: 2,
      fullName: this.registerForm.get('firstName')?.value + ' ' + this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      phoneNumber: this.registerForm.get('phoneNumber')?.value,
      password: this.registerForm.get('password')?.value,
      confirmPassword: this.registerForm.get('confirmPassword')?.value,
      receiveUpdates: this.registerForm.get('receiveUpdates')?.value
    }
    this.authService.register(data).pipe(
      takeUntil(this.destroy$),
      switchMap((registerResponse: any) => {
        const data = {
          email: this.registerForm.controls['email']?.value,
          password: this.registerForm.controls['password']?.value
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
      height: '490px',
      width: window.innerWidth > 1024 ? '350px' : '100%',
      scrollStrategy: new NoopScrollStrategy()
    });
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}

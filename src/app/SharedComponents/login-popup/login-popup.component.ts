import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';
import { HttpService } from '../../Services/http.service';
import { RegisterPopupComponent } from '../../View/register-popup/register-popup.component';
import { HelperService } from '../../Services/helper.service';
import { InputComponent } from '../input/input.component';
import { AuthService } from '../../TsExtras/auth.service';
import { ResizeService } from '../../Services/resize.service';

@Component({
  standalone: true,
  imports: [MatCheckboxModule, InputComponent, MatButtonModule, ReactiveFormsModule],
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterPopupComponent>,
    private fb: FormBuilder,
    private helper: HelperService,
    private auth: AuthService,
    private resize:ResizeService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
      deviceId: [this.helper.detectBrowserName()]
    });
  }

  ngOnInit(): void {
    this.loadCredentials();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      this.auth.login({email, password})
        .pipe(
          takeUntil(this.destroy$),
          distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
        )
        .subscribe((loginResponse: any) => {
          this.auth.handleLoginResponse(loginResponse);
          if (rememberMe) {
            this.saveCredentials(email, password);
          } else {
            this.clearCredentials();
          }
          this.dialogRef.close();
        });
    }
  }

  openRegisterPopup(): void {
    this.dialogRef.close();
    this.dialog.open(RegisterPopupComponent, {
      width: window.innerWidth > 1024 ? '27%' : '100%'
    });
  }

  private saveCredentials(email: string, password: string): void {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  }

  private clearCredentials(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }

  private loadCredentials(): void {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (email && password) {
      this.loginForm.patchValue({
        email,
        password,
        rememberMe: true
      });
    }
  }
}

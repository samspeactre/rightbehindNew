import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';
import { addUserData, toggleLoader } from '../../Ngrx/data.action';
import { HttpService } from '../../Services/http.service';
import { RegisterPopupComponent } from '../../View/register-popup/register-popup.component';
import { InputComponent } from '../input/input.component';
import { HelperService } from '../../Services/helper.service';

@Component({
  standalone: true,
  imports: [MatCheckboxModule, InputComponent, MatButtonModule, ReactiveFormsModule],
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.css',
})
export class LoginPopupComponent {
  loginForm: FormGroup;
  private destroy$ = new Subject<void>();
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterPopupComponent>,
    private fb: FormBuilder,
    private http: HttpService,
    private store: Store,
    private helper:HelperService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      deviceId:[this.helper.detectBrowserName()]
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSubmit(): void {
    this.http
      .loaderPost('Account/login', this.loginForm.value, false)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.store.dispatch(toggleLoader({ show: false }));
        }),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((response) => {
        this.store.dispatch(addUserData({user:response?.model}))
        this.dialogRef.close();
      });
  }
  openRegisterPopup(): void {
    // Close the current dialog
    this.dialogRef.close();

    // Open the registration dialog
    this.dialog.open(RegisterPopupComponent, {
      height: '92%',
      width: '27%',
    });
  }
}

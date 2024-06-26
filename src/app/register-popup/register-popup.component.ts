import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RegisterService} from '../services/register.service'

@Component({
  selector: 'app-register-popup',
  templateUrl: './register-popup.component.html',
  styleUrl: './register-popup.component.css'
})
export class RegisterPopupComponent {

  registerForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterPopupComponent>,
    private fb: FormBuilder,
    private registrationService: RegisterService
  ) {
    this.registerForm = this.fb.group({
      userAccountTypeId:[''],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      // confirmPassword: ['', Validators.required],
      // receiveUpdates: [false]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registrationService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          this.dialogRef.close();
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    }
  }

  openLoginPopup(): void {
    // Close the current dialog
    this.dialogRef.close();

    // Open the registration dialog
    this.dialog.open(LoginPopupComponent, {
      height: '80%',
      width: '27%',
    });
  }
  
}

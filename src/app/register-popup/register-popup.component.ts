import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [MatCheckboxModule, MatLabel, MatFormFieldModule,MatInputModule,MatButtonModule, ReactiveFormsModule],
  selector: 'app-register-popup',
  templateUrl: './register-popup.component.html',
  styleUrl: './register-popup.component.css',
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
      userAccountTypeId: [''],
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
        (response) => {
          console.log('Registration successful', response);
          this.dialogRef.close();
        },
        (error) => {
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

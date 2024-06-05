import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../Services/http.service';
import { LoginPopupComponent } from '../../SharedComponents/login-popup/login-popup.component';
import { InputComponent } from '../../SharedComponents/input/input.component';

@Component({
  standalone: true,
  imports: [MatCheckboxModule, MatLabel, MatFormFieldModule,MatInputModule,MatButtonModule, ReactiveFormsModule, InputComponent],
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
    private http:HttpService
  ) {
    this.registerForm = this.fb.group({
      userAccountTypeId: [2],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8)],
      confirmPassword: ['', Validators.required, Validators.minLength(8)],
      receiveUpdates: [false]
    });
  }

  onSubmit(): void {
    this.http.loaderPost('Account/signup/v2',this.registerForm.value,false,true).subscribe((response)=>{
      console.log(response);
    })
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

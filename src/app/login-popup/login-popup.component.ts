import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterPopupComponent } from '../register-popup/register-popup.component';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.css'
})
export class LoginPopupComponent {
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<LoginPopupComponent>) {}

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

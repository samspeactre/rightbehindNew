import { Component } from '@angular/core';
import { RentPopupComponent } from '../rent-popup/rent-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sell-property-popup',
  templateUrl: './sell-property-popup.component.html',
  styleUrl: './sell-property-popup.component.css'
})
export class SellPropertyPopupComponent {
selected: any;
  router: any;

constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RentPopupComponent>) {}

openRentPopup(): void {
    // Close the current dialog
    this.dialogRef.close();

    // Open the registration dialog
    this.dialog.open(RentPopupComponent, {
      height: '95%',
      width: '33%',
    });
  }

  navigateAndClose() {
    this.dialogRef.close();
    this.router.navigate(['/sell-add-property']);
  }

}

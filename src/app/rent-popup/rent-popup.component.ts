import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SellPropertyPopupComponent } from '../sell-property-popup/sell-property-popup.component';

@Component({
  selector: 'app-rent-popup',
  templateUrl: './rent-popup.component.html',
  styleUrl: './rent-popup.component.css'
})
export class RentPopupComponent {
selected: any;
  router: any;

constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<SellPropertyPopupComponent>) {}

openSellPopup(): void {
    // Close the current dialog
    this.dialogRef.close();

    // Open the registration dialog
    this.dialog.open(SellPropertyPopupComponent, {
      height: '95%',
      width: '33%',
    });
  }

  navigateAndClose() {
    this.dialogRef.close();
    this.router.navigate(['/add-rent-property']);
  }
}

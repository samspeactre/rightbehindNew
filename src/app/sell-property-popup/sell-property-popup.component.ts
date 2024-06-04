import { Component } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { RentPopupComponent } from '../rent-popup/rent-popup.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone:true,
  imports:[MatLabel,MatFormFieldModule,MatInputModule,MatOption,MatSelect],
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

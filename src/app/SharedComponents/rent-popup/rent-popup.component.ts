import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SellPropertyPopupComponent } from '../../View/sell-property-popup/sell-property-popup.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  imports:[MatLabel,RouterModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatOption,MatSelect],
  selector: 'app-rent-popup',
  templateUrl: './rent-popup.component.html',
  styleUrl: './rent-popup.component.css'
})
export class RentPopupComponent {
selected: any;
  router: any;

constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<SellPropertyPopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  console.log(data);
  
}

openSellPopup(): void {
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

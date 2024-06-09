import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { InputComponent } from '../input/input.component';

@Component({
  standalone: true,
  imports: [InputComponent, RouterModule, MatButtonModule, FormsModule,ReactiveFormsModule],
  selector: 'app-rent-popup',
  templateUrl: './rent-popup.component.html',
  styleUrl: './rent-popup.component.css'
})
export class RentPopupComponent {
  selected: any;
  active: string = 'rent';
  types = [
    { name: 'Apartments', value: 1 },
    { name: 'Houses', value: 2 },
    { name: 'Condos', value: 3 },
    { name: 'Townhomes', value: 4 },
    { name: 'Rooms', value: 5 }
  ];
  propertyForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    propertyType: ['', Validators.required],
    unit: [''],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required]
  });
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RentPopupComponent>,
    private router: Router, private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.active = data
  }
  navigateAndClose() {
    this.dialogRef.close();
    this.router.navigateByUrl('/rent-add-property');
  }
  makeActive(type: string) {
    this.active = type;
  }
  onSubmit(){
    console.log(this.propertyForm.value);
    
  }
}

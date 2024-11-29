import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'app-contact-select',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent],
  templateUrl: './contact-select.component.html',
  styleUrl: './contact-select.component.scss',
})
export class ContactSelectComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string; phone: string }
  ) {}

  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }
}

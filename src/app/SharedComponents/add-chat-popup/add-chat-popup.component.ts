import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { selectUser } from '../../Ngrx/data.reducer';
import { types } from '../../Services/helper.service';
import { AuthService } from '../../TsExtras/auth.service';
import { InputComponent } from '../input/input.component';
import { MapComponent } from '../map/map.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
@Component({
  standalone: true,
  imports: [InputComponent,SweetAlert2Module , RouterModule, MatButtonModule, FormsModule, ReactiveFormsModule, CommonModule, MapComponent],
  selector: 'app-add-chat-popup',
  templateUrl: './add-chat-popup.component.html',
  styleUrl: './add-chat-popup.component.scss'
})
export class ChatPopupComponent {
  communityForm: any = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    latLng: ['', Validators.required]
  });
  user: any;
  private destroy$ = new Subject<void>();
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ChatPopupComponent>,
    private router: Router, private fb: FormBuilder, private auth: AuthService,
    private store: Store,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSubmit() {
    
  }
  setFormValue(event: any, control: string) {
    this.communityForm.controls[control].setValue(event);
  }
}

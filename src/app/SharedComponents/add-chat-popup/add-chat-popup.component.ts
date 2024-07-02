import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { AuthService } from '../../TsExtras/auth.service';
import { InputComponent } from '../input/input.component';
import { MapComponent } from '../map/map.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from '../../Services/http.service';
@Component({
  standalone: true,
  imports: [InputComponent, FontAwesomeModule, SweetAlert2Module, RouterModule, MatButtonModule, FormsModule, ReactiveFormsModule, CommonModule, MapComponent],
  selector: 'app-add-chat-popup',
  templateUrl: './add-chat-popup.component.html',
  styleUrl: './add-chat-popup.component.scss'
})
export class ChatPopupComponent {
  communityForm: any = this.fb.group({
    Title: ['', Validators.required],
    Description: ['', Validators.required],
    ForumImage: ['', Validators.required],
    Latitude: ['', Validators.required],
    Longitude: ['', Validators.required],
    Location: ['', Validators.required],
    City: ['', Validators.required],
  });
  user: any;
  faPlus = faPlus
  private destroy$ = new Subject<void>();
  constructor(public dialog: MatDialog, private http:HttpService, public dialogRef: MatDialogRef<ChatPopupComponent>,
    private router: Router, private fb: FormBuilder, private auth: AuthService,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSubmit() {
    const formData = this.convertFormToFormData(this.communityForm.value);
    console.log(formData);
    this.http.loaderPost('Forum/create',formData,true)
    .pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    )
    .subscribe((response)=>{
      this.dialogRef.close({ data:this.communityForm.value });
    })
  }
  setFormValue(event: any, control: string) {
    if (control == 'Location') {
      this.communityForm.patchValue({
        Location: event?.address,
        City: event?.city,
      })
    } else {
      if (control == 'Latitude') {
        this.communityForm.controls[control].setValue(event?.lat);
      } else {
        this.communityForm.controls[control].setValue(event?.lng);
      }
    }
  }
  imgUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.communityForm.patchValue({
          ForumImage: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }
  convertFormToFormData(formValue: any): FormData {
    const formData = new FormData();
    for (const key in formValue) {
      if (formValue.hasOwnProperty(key)) {
        formData.append(key, formValue[key]);
      }
    }
    return formData;
  }
}

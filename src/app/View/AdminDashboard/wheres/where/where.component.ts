import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { InputComponent } from '../../../../SharedComponents/input/input.component';
import { selectUser } from '../../../../Ngrx/data.reducer';
import { HttpService } from '../../../../Services/http.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoaderService } from '../../../../Services/loader.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { assetUrl } from '../../../../Services/helper.service';
import { MapComponent } from '../../../../SharedComponents/map/map.component';

@Component({
  standalone: true,
  imports: [
    InputComponent,
    SweetAlert2Module,
    RouterModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CKEditorModule,
    FontAwesomeModule,
    MapComponent
  ],
  selector: 'app-where',
  templateUrl: './where.component.html',
  styleUrl: './where.component.scss',
})
export class WhereComponent {
  active: string = 'Add';
  user$ = this.store.select(selectUser);
  faPlus = faPlus;
  blogForm: any = this.fb.group({
    videoUrl: [''],
    blogUrl: [''],
    latitude: [25.761681, Validators.required],
    longitude: [-80.191788, Validators.required],
  });
  user: any;
  src = assetUrl;
  private destroy$ = new Subject<void>();
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<WhereComponent>,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpService,
    private store: Store,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.active = data?.status;
    if (this.active == 'Edit') {
      this.editPatch();
    }
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((user) => {
        if (user) {
          this.user = user;
        }
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSubmit() {
    const url = this.data?.status == 'Edit' ? 'PropertyTour/update' : 'PropertyTour/create';
    if (this.data?.status == 'Edit') {
      // data['Id'] = this.blogForm.get('id').value;
    }
    this.http.loaderPost(url, this.blogForm.value, true).subscribe((response) => {
      this.dialogRef.close({ data: true });
    });
  }
  editPatch() {
    console.log(this.data);
    this.blogForm.patchValue({
      blogUrl: this.data?.content?.blogUrl,
      videoUrl: this.data?.content?.videoUrl,
      latitude: this.data?.content?.latitude,
      longitude: this.data?.content?.longitude,
    });
    this.blogForm.addControl('id', new FormControl(this.data?.content?.id));
    console.log(this.blogForm.value);
    
  }
  setFormValue(event: any, control: string) {
    if (control == 'latitude') {
      this.blogForm.controls[control].setValue(event?.lat);
    } else {
      this.blogForm.controls[control].setValue(event?.lng);
    }
  }
}

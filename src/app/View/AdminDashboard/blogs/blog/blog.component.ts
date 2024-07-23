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
  ],
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  active: string = 'Add';
  user$ = this.store.select(selectUser);
  editor = ClassicEditor;
  faPlus = faPlus;
  blogForm: any = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required],
    tags: ['', Validators.required],
  });
  user: any;
  src = assetUrl;
  private destroy$ = new Subject<void>();
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BlogComponent>,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpService,
    private store: Store,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.active = data?.status;
    if (this.active == 'Edit') {
      this.editPatch()
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
    const url = this.data?.status == 'Edit' ? 'Blog/update' : 'Blog/create'
    const data:any = {
      Title:this.blogForm.get('title').value,
      Description:this.blogForm.get('description').value,
      imagePath:this.blogForm.get('image').value,
      Tags:[this.blogForm.get('tags').value],
    }
    if(this.data?.status == 'Edit'){
      data['Id']= this.blogForm.get('id').value
    }
    this.http.loaderPost(url, data, true).subscribe((response)=>{
      this.dialogRef.close({ data:true });
    });
  }
  imgUpload(event: any) {
    LoaderService.loader.next(true);
    this.http
      .blogImageUpload(event?.target?.files[0], this.user?.token)
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        finalize(() => {
          LoaderService.loader.next(false);
        })
      )
      .subscribe((res: any) => {
        this.blogForm.get('image').setValue(this.src + res?.model?.imagePath);
      });
  }
  editPatch() {
    this.blogForm.patchValue({
      title: this.data?.content?.title,
      description: this.data?.content?.description,
      image: this.data?.content?.imagePath,
      tags: this.data?.content?.tags,
    });
    this.blogForm.addControl('id', new FormControl(this.data?.content?.id));    
  }
}

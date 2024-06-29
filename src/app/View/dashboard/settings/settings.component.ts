import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../../SharedComponents/input/input.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectUser } from '../../../Ngrx/data.reducer';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';
import { HttpService } from '../../../Services/http.service';
import { updateUserData } from '../../../Ngrx/data.action';
import { LoaderService } from '../../../Services/loader.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { assetUrl } from '../../../Services/helper.service';

@Component({
  standalone: true,
  imports: [MatIconModule, MatButtonModule, InputComponent, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  user$ = this.store.select(selectUser);
  user: any;
  private destroy$ = new Subject<void>();
  faPlus = faPlusCircle
  settingForm: any = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contact: ['', Validators.minLength(8)],
    country: [''],
    address: [''],
    apt: [''],
    city: [''],
    state: [''],
    zip: [''],
  });
  profileImage: any;
  securityForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  constructor(private fb: FormBuilder, private store: Store, private http: HttpService) {
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((user) => {
        this.user = user;
        this.settingForm.patchValue({
          fullName: user?.fullName,
          email: user?.email,
          contact: user?.contact,
          country: user?.country || user?.userAddresses?.[0]?.country,
          address: user?.address || user?.userAddresses?.[0]?.address,
          apt: user?.apt || user?.userAddresses?.[0]?.apt,
          city: user?.city || user?.userAddresses?.[0]?.city,
          state: user?.state || user?.userAddresses?.[0]?.state,
          zip: user?.zip || user?.userAddresses?.[0]?.zipCode
        })
        this.profileImage = user?.imageUrl && assetUrl + user?.imageUrl
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSubmit() {
    const formData = { ...this.settingForm.value };
    delete formData.email;
    this.http.loaderPost('User/profile/update', formData, true).subscribe((response: any) => {
      this.store.dispatch(updateUserData({ user: formData }));
    })
  }
  imgUpload(event: any) {
    LoaderService.loader.next(true);
    this.http
      .profileImageUpload(event?.target?.files[0], this.user?.token)
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        finalize(() => {
          LoaderService.loader.next(false)
        })
      )
      .subscribe((res: any) => {
        this.store.dispatch(updateUserData({ user: { imageUrl: res?.model?.imageUrl } }));
      });
  }
}
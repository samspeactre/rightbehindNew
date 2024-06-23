import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../../SharedComponents/input/input.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectUser } from '../../../Ngrx/data.reducer';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { HttpService } from '../../../Services/http.service';
import { updateUserData } from '../../../Ngrx/data.action';

@Component({
  standalone: true,
  imports: [MatIconModule, MatButtonModule, InputComponent, FormsModule, ReactiveFormsModule],
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  user$ = this.store.select(selectUser);
  user: any;
  private destroy$ = new Subject<void>();
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
        console.log('====================================');
        console.log(user);
        console.log('====================================');
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
}
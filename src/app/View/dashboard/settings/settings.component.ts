import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../../SharedComponents/input/input.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectUser } from '../../../Ngrx/data.reducer';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

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
  settingForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contact: [''],
    Country: [''],
    Address: [''],
    Apt: [''],
    City: [''],
    State: [''],
    Zip: [''],
  });
  securityForm = this.fb.group({
    password: ['', [Validators.required,Validators.minLength(8)]],
  });
  constructor(private fb: FormBuilder, private store: Store) {
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((user) => {
        console.log(user);
        
        this.user = user;
        this.settingForm.patchValue({
          fullName: user?.fullName,
          email: user?.email,
          contact:user?.contact
        })
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSubmit() {
    console.log('hello');
  }
}
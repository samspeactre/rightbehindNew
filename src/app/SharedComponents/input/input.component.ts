import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
declare var $: any;
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatOption, MatSelect,
    MatLabel,
    MatFormFieldModule,
    FontAwesomeModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() matType: string = 'input';
  @Input() rows: string = '2';
  @Input() cstmStyle!: string;
  @Input() readOnly: boolean = false;
  @Input() form: any;
  @Input() control!: string;
  @Input() placeholder: string = '';
  @Input() label!: string;
  @Input() classes: any;
  @Input() selectedCountryISO: any;
  @Input() password: boolean = false;
  @Input() inputType: string = 'text';
  @Input() NumbersOnly: boolean = false;
  @Input() limit!: number;
  @Input() array!: any;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  isFocused: boolean = false;
  error: boolean = false;
  value!: any;
  errorName!: any;
  loader: boolean = false;
  focusBackground:boolean = false;
  private destroy$ = new Subject<void>();
  constructor(
    private store: Store
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      if (this.form?.controls?.[this.control]?.value?.length > 0) {
        this.isFocused = true;
        this.focusBackground = true;
        this.value = this.form?.controls?.[this.control]?.value;
      }
    }, 500);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.reset();
  }
  togglePlaceholder(state: boolean): void {
    this.error = this.form.controls[this.control].status == 'INVALID';
    for (const key in this.form.controls[this.control].errors) {
      this.errorName = key;
    }
    this.focusBackground = state
    if (state) {
      this.isFocused = state;
    } else {
      if (!this.value) {
        this.isFocused = state;
      }
    }
  }
  reset(): void {
    this.isFocused = false;
    this.error = false;
    this.value = null;
    this.errorName = null;
    this.loader = false;
  }
  write(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.form.controls[this.control].setValue(input.value);
    this.value = input.value;
    this.error = this.form.controls[this.control].status == 'INVALID';
    if (input.value?.length > 0) {
      this.togglePlaceholder(true);
    }
    for (const key in this.form.controls[this.control].errors) {
      this.errorName = key;
    }
  }
  returnFirstLetterCapital(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}
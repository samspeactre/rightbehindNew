import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { selectLoader } from '../../Ngrx/data.reducer';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
declare var $: any;
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() type: string = 'text';
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
  error: boolean = false;
  value!: any;
  errorName!: any;
  loader$ = this.store.select(selectLoader);
  loader: boolean = false;
  private destroy$ = new Subject<void>();
  constructor(private store: Store) {
    this.loader$
      .pipe(
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((loader) => {
        this.loader = loader;
      });
  }
  ngOnInit(): void {
    setTimeout(() => {
      if (this.form?.controls?.[this.control]?.value?.length > 0) {
        this.value = this.form?.controls?.[this.control]?.value;
      }
    }, 500);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.reset();
  }
  reset(): void {
    this.error = false;
    this.value = null;
    this.errorName = null;
    this.loader = false;
  }
  write(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.error = this.form.controls[this.control].status == 'INVALID';
    if(this.form.controls[this.control].errors){
      for (const key in this.form.controls[this.control].errors) {
        this.errorName = key;
      }
    }
  }
  returnFirstLetterCapital(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}

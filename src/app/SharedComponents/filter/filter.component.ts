import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    NgSelectModule,
    FormsModule,
    MatSliderModule,
    FontAwesomeModule,
    CommonModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Input() types!: any;
  @Input() bedsArray!: any;
  @Input() minPrices!: any;
  @Input() maxPrices!: any;
  @Input() bathArray!: any;
  @Input() sortsArray!: any;
  @Input() isResetDisabled!: any;
  @Input() filterType: string = 'all';
  @Input() searching: boolean = false;
  @Output() onChangeFilter = new EventEmitter<any>();
  @Output() onRangeFilter = new EventEmitter<any>();
  @Output() sorted = new EventEmitter<any>();
  @Output() rest = new EventEmitter<any>();
  @Output() closed = new EventEmitter<any>();
  @Input() a;
  @Input() b;
  @Input() c;
  @Input() d;
  @Input() e;
  @Input() f;
  faTimes = faTimes;
  ngOnInit() {}
  onFilterChange(event: any, type: any) {
    if (type == 'minPrice' || type == 'maxPrice') {
      this.onChangeFilter.emit({ event: event?.target?.value, type });
    } else {
      this.onChangeFilter.emit({ event, type });
    }
  }
  sorting(event: any) {
    this.sorted.emit(event);
  }
  reset() {
    this.rest.emit(true);
  }
  close() {
    this.closed.emit(true);
  }
  filter() {
    this.onRangeFilter.emit(true);
  }
}

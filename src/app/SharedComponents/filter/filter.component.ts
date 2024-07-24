import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgSelectModule, FormsModule, MatSliderModule, CommonModule],
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
  @Input() searching: boolean = false;
  @Output() onChangeFilter = new EventEmitter<any>();
  @Output() sorted = new EventEmitter<any>();
  @Output() rest = new EventEmitter<any>();
  @Output() closed = new EventEmitter<any>();
  @Input()a;
  @Input()b;
  @Input()c;
  @Input()d;
  onFilterChange(event: any, type: any) {
    this.onChangeFilter.emit({ event, type });
  }
  sorting(event: any) {
    this.sorted.emit(event);
  }
  reset() {
    this.rest.emit(true);
  }
  close(){
    this.closed.emit(true);
  }
}

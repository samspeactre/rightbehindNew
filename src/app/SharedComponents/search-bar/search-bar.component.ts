import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'
import { ResizeService } from '../../Services/resize.service';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
@Component({
  standalone: true,
  imports: [MatIconModule, FilterComponent, MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule, FormsModule, FontAwesomeModule],
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  mentorSearchQueryUpdate = new Subject<any>();
  @Input() searching: boolean = false;
  @Input() filter: boolean = false;
  @Input() search!: string;
  @Input() show:boolean = false
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() showFilter: EventEmitter<any> = new EventEmitter<any>();
  faBars = faFilter
  private destroy$ = new Subject<void>();

  constructor(public resize:ResizeService) {
    this.mentorSearchQueryUpdate
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
      )
      .subscribe((value) => {
        if (value?.length < 1) {
          this.searchEvent.emit(value)
        }
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  submit() {
    this.searchEvent.emit(this.search)
  }
  showFilt(){
    this.show = !this.show
    this.showFilter.emit(this.show)
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
@Component({
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, FontAwesomeModule],
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  mentorSearchQueryUpdate = new Subject<any>();
  screenWidth:number = window.innerWidth
  @Input() searching: boolean = false;
  @Input() search!: string;
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  faSearch = faSearch
  private destroy$ = new Subject<void>();

  constructor() {
    this.mentorSearchQueryUpdate
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
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
}

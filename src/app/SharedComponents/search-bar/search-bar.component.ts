import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ResizeService } from '../../Services/resize.service';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
@Component({
  standalone: true,
  imports: [
    MatIconModule,
    FilterComponent,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    FormsModule,
    FontAwesomeModule,
  ],
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  mentorSearchQueryUpdate = new Subject<any>();
  @Input() searching: boolean = false;
  @Input() filter: boolean = false;
  @Input() search!: string;
  @Input() show: boolean = false;
  @Input() place_id!: string;
  @ViewChild('autocompleteInput') autocompleteInput!: ElementRef;
  autocomplete!: google.maps.places.Autocomplete;
  autocompleteListener!: google.maps.MapsEventListener;
  @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() showFilter: EventEmitter<any> = new EventEmitter<any>();
  faBars = faFilter;
  faSearch = faSearch;
  autocompleteService: any;
  private destroy$ = new Subject<void>();
  predictions: any[] = [];
  constructor(public resize: ResizeService) {
    this.mentorSearchQueryUpdate
      .pipe(
        debounceTime(100),
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((value) => {
        if (value?.length < 1) {
          this.searchEvent.emit({ search: '', place_id: '' });
          this.predictions = [];
        } else {
          this.autocompleteService.getPlacePredictions(
            { input: value },
            (predictions, status) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                predictions
              ) {
                this.predictions = predictions;
              }
            }
          );
        }
      });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initAutocomplete();
    }, 500);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.autocompleteListener) {
      google.maps.event.removeListener(this.autocompleteListener);
    }
  }
  initAutocomplete(): void {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput?.nativeElement
    );
    this.autocompleteListener = this.autocomplete.addListener(
      'place_changed',
      () => {
        const place = this.autocomplete.getPlace();
        this.place_id = place.place_id;
        this.search = place.formatted_address;
        this.submit();
      }
    );
    this.autocompleteService = new google.maps.places.AutocompleteService();
  }
  submit() {
    this.searchEvent.emit({ search: this.search, place_id: this.place_id });
  }
  showFilt() {
    this.show = true;
    this.showFilter.emit({ cond: this.show, type: 'all' });
  }
  selectFirstSuggestion() {
    if (this.predictions.length > 0) {
      this.search = this.predictions[0].description;
      this.place_id = this.predictions[0].place_id;
      this.submit();
    }
  }
  openPopUp(type) {
    this.show = true;
    this.showFilter.emit({ cond: this.show, type });
  }
}

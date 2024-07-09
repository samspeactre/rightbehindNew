import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PropertyCardComponent } from '../../../SharedComponents/property-card/property-card.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../../Services/http.service';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap, takeUntil } from 'rxjs';
import { InputComponent } from '../../../SharedComponents/input/input.component';
import { FormBuilder } from '@angular/forms';

@Component({
  standalone: true,
  imports: [MatIconModule, InputComponent, MatButtonModule, PropertyCardComponent, MatSelectModule, MatFormFieldModule, NgbNavModule],
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrl: './my-listing.component.scss'
})
export class MyListingComponent {
  searchForm:any = this.fb.group({
    search: [''],
  });
  active:number=1
  properties:any
  private destroy$ = new Subject<void>();
  originalProperties:any
  constructor(private http:HttpService, private fb:FormBuilder){}
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(){
    this.getInquiries()
    this.initializeSearch();
  }
  private initializeSearch(): void {
    this.searchForm.get('search').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => {
          return of(this.filterInquiries(searchTerm));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {});
  }
  getInquiries() {
    this.http.loaderGet('Property/get/me?pageNo=1&pageSize=1000&type=2', true)
    .pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    )
    .subscribe((response) => {
      this.properties = response?.model?.properties
      this.originalProperties = response?.model?.properties
    })
  }
  private filterInquiries(searchTerm: string): void {
    if (!searchTerm) {
      this.properties = this.originalProperties;
    } else {
      this.properties = this.originalProperties.filter((inquiry: any) =>
        (inquiry.city && inquiry.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inquiry.address && inquiry.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inquiry.title && inquiry.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inquiry.description && inquiry.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  }
}

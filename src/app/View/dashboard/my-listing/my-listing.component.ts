import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PropertyCardComponent } from '../../../SharedComponents/property-card/property-card.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../../Services/http.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [MatIconModule, MatButtonModule, PropertyCardComponent, MatSelectModule, MatFormFieldModule, NgbNavModule],
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrl: './my-listing.component.scss'
})
export class MyListingComponent {
  active:number=1
  properties:any
  private destroy$ = new Subject<void>();
  constructor(private http:HttpService){}
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(){
    this.getInquiries()
  }
  getInquiries() {
    this.http.loaderGet('Property/get?pageNo=1&pageSize=1000&type=1', true)
    .pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    )
    .subscribe((response) => {
      this.properties = response?.model?.properties
    })
  }
}

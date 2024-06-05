import { Component } from '@angular/core';
import { FooterComponent } from '../../SharedComponents/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatLabel, MatSelect } from '@angular/material/select';
import { SearchBarComponent } from '../../SharedComponents/search-bar/search-bar.component';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';
import { PropertyCardComponent } from '../../SharedComponents/property-card/property-card.component';
import { HttpService } from '../../Services/http.service';

@Component({
  standalone: true,
  imports: [
    FooterComponent,
    MatIconModule,
    MatOption,
    MatSelect,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    SearchBarComponent,
    NavbarComponent,
    MatButtonModule,
    PropertyCardComponent
  ],
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css',
})
export class PropertyDetailsComponent {
  pageType!: string;
  private destroy$ = new Subject<void>();
  cards = [
    {},
    {},
    {},
  ];
  loader:boolean = true;
  constructor(private activatedRoute: ActivatedRoute, private http:HttpService) {
    this.activatedRoute.data
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((data: any) => {
        this.pageType = data?.type;
        this.getProperties()
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getProperties(){
    this.http
    .loaderGet('Property/get', false, false, false)
    .pipe(
      finalize(()=>{
        this.loader = false
      }),
      takeUntil(this.destroy$),
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    )
    .subscribe((response) => {
      this.cards = response?.model?.properties
      console.log(response);
    });
  }
}

import { Component } from '@angular/core';
import { CountUpModule } from 'ngx-countup';
import { HttpService } from '../../../../Services/http.service';
import { distinctUntilChanged, finalize, Subject, takeUntil } from 'rxjs';
import { PropertyCardComponent } from '../../../../SharedComponents/property-card/property-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-inner',
  standalone: true,
  imports: [
    CountUpModule,
    PropertyCardComponent,
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './user-inner.component.html',
  styleUrl: './user-inner.component.scss',
})
export class UserInnerComponent {
  rent: any = [];
  faArrowLeft = faArrowLeft;
  private destroy$ = new Subject<void>();
  id:any;
  constructor(private http: HttpService, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((response:any)=>{
      this.id = response?.id
    })
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit() {
    this.getInquiries();
  }
  getInquiries() {
    this.http
      .loaderGet(`admindashboard/user/property/get/${this.id}`, true, true)
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((response) => {
        this.rent = response?.model;
      });
  }
}

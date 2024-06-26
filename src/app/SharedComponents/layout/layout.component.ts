import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { LoaderService } from '../../Services/loader.service';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FooterComponent,NavbarComponent,RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  footer: boolean = true;
  header: boolean = true;
  private destroy$ = new Subject<void>();
  constructor(private router:Router, private actiavtedRoute:ActivatedRoute){
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
        let route = this.actiavtedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        route.data
          .pipe(
            distinctUntilChanged(
              (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
            ),
            takeUntil(this.destroy$)
          )
          .subscribe((data: any) => {
            this.footer = data['footer'] || false;
            this.header = data['header'] || false;
          });
      });
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((event: any) => {
        this.footer = false;
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

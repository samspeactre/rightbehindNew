import { ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoader } from './Ngrx/data.reducer';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoaderService } from './services/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loader: boolean = true;
  footer: boolean = true;
  header: boolean = true;
  private destroy$ = new Subject<void>();
  constructor(private store: Store, private cd: ChangeDetectorRef, private actiavtedRoute: ActivatedRoute, private router: Router, private loaderService: LoaderService, private cdr: ChangeDetectorRef) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((event: any) => {
        let route = this.actiavtedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        route.data
          .pipe(distinctUntilChanged(
            (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr),
          ),
            takeUntil(this.destroy$),)
          .subscribe((data: any) => {
            this.footer = data['footer'] || false;
            this.header = data['header'] || false;
          });

      });
      this.observe()
  }
  async observe() {
    LoaderService.loader.subscribe((res: any) => {
      console.log(res);
      
      this.loader = res;
      if (this.loader == true) {
        document.body.classList.add('hideScroll');
      } else {
        document.body.classList.remove('hideScroll');
      }
      this.cd.detectChanges();
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

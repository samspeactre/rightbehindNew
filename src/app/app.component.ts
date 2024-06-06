import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoader } from './Ngrx/data.reducer';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loader$ = this.store.select(selectLoader);
  loader: boolean = true;
  footer: boolean = true;
  private destroy$ = new Subject<void>();
  constructor(private store: Store, private actiavtedRoute: ActivatedRoute, private router: Router) {
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
          });

      });
    this.loader$
      .pipe(
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((loader) => {
        this.loader = loader;
        if (loader) {
          document.body.classList.add('bodyLoader');
        } else {
          document.body.classList.remove('bodyLoader');
        }
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

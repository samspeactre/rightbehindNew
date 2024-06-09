import { ChangeDetectorRef, Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { FooterComponent } from './SharedComponents/footer/footer.component';
import { LoadingComponent } from './SharedComponents/loaders/loading/loading.component';
import { NavbarComponent } from './SharedComponents/navbar/navbar.component';
import { LoaderService } from './services/loader.service';
import { selectSideBar } from './Ngrx/data.reducer';
import { HelperService } from './services/helper.service';
declare var WOW: any;
export const mapSrc =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyCm_NXIOGvZ0nlQ9EBeotrO1ESY3hji6No';
@Component({
  standalone: true,
  imports: [NavbarComponent, FooterComponent, LoadingComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loader: boolean = false;
  footer: boolean = true;
  header: boolean = true;
  sideBar$ = this.store.select(selectSideBar);
  private destroy$ = new Subject<void>();
  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private actiavtedRoute: ActivatedRoute,
    private router: Router,
    private helper: HelperService
  ) {
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
        LoaderService.loader.next(true);
      });
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
        LoaderService.loader.next(false);
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
    if (window.innerWidth < 1024) {
      this.sideBar$
        .pipe(
          distinctUntilChanged(
            (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
          ),
          takeUntil(this.destroy$)
        )
        .subscribe((open) => {
          if (open) {
            document?.body?.classList?.add('sideBarOpenBody');
          } else {
            document?.body?.classList?.remove('sideBarOpenBody');
          }
        });
    }
    this.observe();
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
    this.helper.removeLink("https://fonts.googleapis.com/icon?family=Material+Icons");
    this.helper.removeLink("https://fonts.googleapis.com/icon?family=Material+Icons+Outlined");
    this.helper.removeLink("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");

  }
  ngAfterViewInit(): void {
    new WOW().init();
    setTimeout(() => {
      this.helper.appendLink("https://fonts.googleapis.com/icon?family=Material+Icons");
      this.helper.appendLink("https://fonts.googleapis.com/icon?family=Material+Icons+Outlined");
      this.helper.appendLink("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");
    },500);
  }
}

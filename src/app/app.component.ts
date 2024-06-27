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
import { HelperService } from './Services/helper.service';
import { LoaderService } from './Services/loader.service';
import { FooterComponent } from './SharedComponents/footer/footer.component';
import { LoadingComponent } from './SharedComponents/loaders/loading/loading.component';
import { NavbarComponent } from './SharedComponents/navbar/navbar.component';
declare var WOW: any;
@Component({
  standalone: true,
  imports: [NavbarComponent, FooterComponent, LoadingComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loader: boolean = false;
  private destroy$ = new Subject<void>();
  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private helper: HelperService
  ) {
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
        LoaderService.loader.next(true);
      });
    
    this.observe();
  }
  async observe() {
    LoaderService.loader.subscribe((res: any) => {
      this.loader = res;
      if (this.loader == true) {
        document.body.classList.add('hideScroll');
      } else {
        document.body.classList.remove('hideScroll');
      }
      this.cd.detectChanges();
    });
  }
  ngOnInit(){
    // this.helper.appendScript('')
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

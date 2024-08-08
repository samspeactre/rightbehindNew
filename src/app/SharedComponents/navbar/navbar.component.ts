import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faAt,
  faBars,
  faBarsStaggered,
  faCircleChevronDown,
  faHeadphones,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { removeUserData } from '../../Ngrx/data.action';
import { selectUser } from '../../Ngrx/data.reducer';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { RentPopupComponent } from '../rent-popup/rent-popup.component';
import { AuthService } from '../../TsExtras/auth.service';
import { ResizeService } from '../../Services/resize.service';
import { assetUrl } from '../../Services/helper.service';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
    MatButtonModule,
    FontAwesomeModule,
    NgbDropdownModule,
    CommonModule,
  ],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user$ = this.store.select(selectUser);
  user: any;
  sidebar: boolean = false;
  private destroy$ = new Subject<void>();
  faUser = faUser;
  src = assetUrl;
  faTimes = faTimes;
  faBars = faBars;
  faBarsStaggered = faBarsStaggered;
  faHeadphones = faHeadphones;
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faCircleChevronDown = faCircleChevronDown;
  faAt = faAt;
  sellHide: boolean = false;
  communityHeader: boolean = false;
  url: any;
  dialogRef: any;
  constructor(
    private store: Store,
    public resize: ResizeService,
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private actiavtedRoute: ActivatedRoute
  ) {
    if (this.router.url.includes('rent')) {
      this.communityHeader = true;
    }
    if (this.router.url.includes('-add-property')) {
      this.sellHide = true;
    }
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((user) => {
        this.user = user;
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
        this.url = router.url;
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
            this.sellHide = data['sellHide'] || false;
            this.communityHeader = data['communityHeader'] || false;
          });
      });
  }
  setItem() {
    localStorage.setItem('searchByBar', 'false');
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  navigateToOffMarket(id: any): void {
    if (this.router.url !== '/') {
      this.router.navigateByUrl('/');
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.scrollToElement(id);
        });
    } else {
      this.scrollToElement(id);
    }
  }

  private scrollToElement(id: any): void {
    let tries = 0;
    const maxTries = 10;

    const interval = setInterval(() => {
      tries++;
      const element: any = document.querySelector(id);
      if (element) {
        const topPos = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: topPos,
          behavior: 'smooth',
        });
        clearInterval(interval);
      } else if (tries >= maxTries) {
        console.error(
          `Element with id ${id} not found after ${tries} attempts`
        );
        clearInterval(interval);
      }
    }, 1000);
  }
  socialLinks = [
    { url: 'https://www.facebook.com/', imageUrl: '../../assets/img/fb.png' },
    {
      url: 'https://www.instagram.com/',
      imageUrl: '../../assets/img/insta.png',
    },
    {
      url: 'https://www.linkedin.com/',
      imageUrl: '../../assets/img/linkedin.png',
    },
    { url: '', imageUrl: '../../assets/img/twitter.png' },
  ];

  openPopup(): void {
    this.dialog.open(LoginPopupComponent, {
      width: window.innerWidth > 1330 ? '330px' : '100%',
      scrollStrategy: new NoopScrollStrategy(),
    });
  }

  openSellPopup(type: string): void {
    this.dialog.open(RentPopupComponent, {
      width: window.innerWidth > 1330 ? '850px' : '100%',
      data: type,
      scrollStrategy: new NoopScrollStrategy(),
    });
  }

  logout() {
    this.store.dispatch(removeUserData());
    this.router.navigateByUrl('/');
    this.auth.logout();
  }
  show(condition: boolean) {
    this.sidebar = condition;
    if (condition) {
      document?.body?.classList?.add('bodyLoader', 'backdropFront');
    } else {
      document?.body?.classList?.remove('bodyLoader', 'backdropFront');
    }
  }

  isDropdownOpen = false;
  onDropdownChange(isOpen: boolean) {
    this.isDropdownOpen = isOpen;
  }
}
function closeDialog() {
  throw new Error('Function not implemented.');
}

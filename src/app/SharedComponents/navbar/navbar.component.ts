import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faAt, faBars, faCircleChevronDown, faHeadphones, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { removeUserData, toggleSideBar } from '../../Ngrx/data.action';
import { selectUser } from '../../Ngrx/data.reducer';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { RentPopupComponent } from '../rent-popup/rent-popup.component';
import { AuthService } from '../../TsExtras/auth.service';

@Component({
  standalone: true,
  imports: [MatIconModule, RouterModule, MatButtonModule, FontAwesomeModule, NgbDropdownModule, CommonModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user$ = this.store.select(selectUser);
  user: any;
  sidebar:boolean = false;
  private destroy$ = new Subject<void>();
  faUser=faUser
  faTimes=faTimes
  faBars=faBars
  faHeadphones=faHeadphones
  faFacebook=faFacebook
  faLinkedin=faLinkedin
  faInstagram=faInstagram
  faTwitter=faTwitter
  faCircleChevronDown=faCircleChevronDown
  faAt=faAt
  screenWidth:number = window.innerWidth
  sellHide:boolean = true
  constructor(private store: Store, public dialog: MatDialog, private auth:AuthService, private router:Router, private actiavtedRoute:ActivatedRoute) {
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
      if(this.router.url.includes('-add-property')){
        this.sellHide = true;
      }
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
            this.sellHide = data['sellHide'] || false;
          });
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
    let dialogRef = this.dialog.open(LoginPopupComponent, {
      height: '85%',
      width: window.innerWidth > 1024 ? '27%' : '100%',
      
    });
  }

  openSellPopup(type:string): void {
    let dialogRef = this.dialog.open(RentPopupComponent, {
      height: '95%',
      width: window.innerWidth > 1024 ? '33%' : '100%',
      data:type,
    });
  }
  logout(){
    this.store.dispatch(removeUserData());
    this.router.navigateByUrl('/')
    this.auth.logout()
  }
  show(condition:boolean){
    this.sidebar = condition
    this.store.dispatch(toggleSideBar({open:condition}))
  }
}

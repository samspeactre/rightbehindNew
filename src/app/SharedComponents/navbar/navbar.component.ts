import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faAt, faBars, faHeadphones, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { removeUserData, toggleSideBar } from '../../Ngrx/data.action';
import { selectUser } from '../../Ngrx/data.reducer';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { RentPopupComponent } from '../rent-popup/rent-popup.component';

@Component({
  standalone: true,
  imports: [MatIconModule, RouterModule, MatButtonModule, FontAwesomeModule, NgbDropdownModule, CommonModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
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
  faAt=faAt
  screenWidth:number = window.innerWidth
  constructor(private store: Store, public dialog: MatDialog) {
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((user) => {
        console.log(user);
        
        this.user = user;
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
      height: '80%',
      width: window.innerWidth > 1024 ? '27%' : '100%',
      closeOnNavigation:true
    });
  }

  openSellPopup(type:string): void {
    let dialogRef = this.dialog.open(RentPopupComponent, {
      height: '95%',
      width: window.innerWidth > 1024 ? '33%' : '100%',
      data:type
    });
  }
  logout(){
    this.store.dispatch(removeUserData());
  }
  show(condition:boolean){
    this.sidebar = condition
    this.store.dispatch(toggleSideBar({open:condition}))
  }
}

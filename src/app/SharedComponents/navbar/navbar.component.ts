import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { SellPropertyPopupComponent } from '../../View/sell-property-popup/sell-property-popup.component';
import { MatIconModule } from '@angular/material/icon';
import {faUser } from '@fortawesome/free-regular-svg-icons'
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { selectUser } from '../../Ngrx/data.reducer';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { removeUserData } from '../../Ngrx/data.action';
import { RentPopupComponent } from '../rent-popup/rent-popup.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  imports: [MatIconModule, RouterModule, MatButtonModule, FontAwesomeModule, NgbDropdownModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user$ = this.store.select(selectUser);
  user: any;
  private destroy$ = new Subject<void>();
  faUser=faUser
  faHeadphones=faHeadphones
  faFacebook=faFacebook
  faLinkedin=faLinkedin
  faInstagram=faInstagram
  faTwitter=faTwitter
  faAt=faAt
  constructor(private store: Store, public dialog: MatDialog) {
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
      width: '27%',
    });
  }

  openSellPopup(type:string): void {
    let dialogRef = this.dialog.open(RentPopupComponent, {
      height: '95%',
      width: '33%',
      data:type
    });
  }
  logout(){
    this.store.dispatch(removeUserData());
  }
}

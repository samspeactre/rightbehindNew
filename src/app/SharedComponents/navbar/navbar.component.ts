import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { SellPropertyPopupComponent } from '../../View/sell-property-popup/sell-property-popup.component';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { selectUser } from '../../Ngrx/data.reducer';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { removeUserData } from '../../Ngrx/data.action';

@Component({
  standalone: true,
  imports: [MatIconModule, RouterModule, MatButtonModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user$ = this.store.select(selectUser);
  user: any;
  private destroy$ = new Subject<void>();
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

  openSellPopup(): void {
    let dialogRef = this.dialog.open(SellPropertyPopupComponent, {
      height: '95%',
      width: '33%',
    });
  }
  logout(){
    this.store.dispatch(removeUserData());
  }
}

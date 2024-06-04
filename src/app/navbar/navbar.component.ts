import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { SellPropertyPopupComponent } from '../sell-property-popup/sell-property-popup.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone:true,
  imports:[CommonModule,MatIconModule,MatButtonModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})


export class NavbarComponent {

  constructor(public dialog: MatDialog){}

  socialLinks = [
    { url: 'https://www.facebook.com/', imageUrl: '../../assets/img/fb.png' },
    { url: 'https://www.instagram.com/', imageUrl: '../../assets/img/insta.png' },
    { url: 'https://www.linkedin.com/', imageUrl: '../../assets/img/linkedin.png' },
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

}

import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { OffMarketCarouselComponent } from '../off-market-carousel/off-market-carousel.component';
import { OffmarketSearchComponent } from '../offmarket-search/offmarket-search.component';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-off-market',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    OffMarketCarouselComponent,
    OffmarketSearchComponent,
    LoginPopupComponent,
    MatDialogModule
  ],
  templateUrl: './off-market.component.html',
  styleUrls: ['./off-market.component.scss']
})
export class OffMarketComponent {
  
  @ViewChild('carouselSection') carouselSection!: ElementRef;

  constructor(private router: Router, private renderer: Renderer2, private dialog: MatDialog) { } // Inject MatDialog

  findMarketList = [
    'With a vast supply of off-market properties including foreclosures, tenant-occupied rentals and more, you’ll find what you’re looking for.',
    'Use helpful property filters to narrow down listings to match your criteria.',
    'Work with a property locator or bird dog who can find off-market properties for you.',
    'Access to off-market properties including foreclosures and tenant-occupied rentals.'
  ];

  connectOwnerList = [
    'All the current property owner information you need is readily available including phone numbers and emails.',
    'Directly connect with property owners through the platform to quickly start negotiations and finalize deals.',
    'Reach out directly to property owners via phone to discuss potential sales.',
    'Attend property auctions to meet and network with owners interested in selling.',
    'Visit properties in person to speak directly with owners about selling their property.'
  ];

  marketInsight = [
    'Stay updated with market trends specific to off-market properties.',
    'Utilize our data to identify emerging opportunities and make strategic investment decisions.',
    'Get expert analysis and predictions for investment guidance..',
    'Explore market reports and neighborhood demographics.',
    'Participate in webinars and live Q&A sessions with real estate experts to deepen your market knowledge.'
  ];

  scrollToCarousel() {
    if (this.carouselSection) {
      this.carouselSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openLoginPopup(): void {
    this.dialog.open(LoginPopupComponent, {
      height: '85%',
      width: window.innerWidth > 1024 ? '27%' : '100%',
      data: 'any'
    });
  }
}

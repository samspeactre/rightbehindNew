import { MatButtonModule } from '@angular/material/button';
import { Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../View/popup/popup.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../../Services/http.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { Store } from '@ngrx/store';
import { setPopupIdState } from '../../Ngrx/data.action';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    PropertyCardComponent,
  ],
  selector: 'app-rental-carousel',
  templateUrl: './rental-carousel.component.html',
  styleUrl: './rental-carousel.component.css',
})
export class RentalCarouselComponent implements OnInit {
  @Input() cards: any = [1, 2, 3, 4, 5];
  swiper!: Swiper;
  @Input() type!: string;
  @Input() background!: string;
  noData: boolean = false;
  constructor(
    public dialog: MatDialog,
    private http: HttpService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initSwiper();
  }

  initSwiper(): void {
    this.swiper = new Swiper('.swiper-container-rental', {
      // slidesPerView: 1,
      width: 1068,
      spaceBetween: 15,
      loop: true, // Set loop to true for infinite loop
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination-rental',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next-rental',
        prevEl: '.swiper-button-prev-rental',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        320: {
          slidesPerView: 2,
        },
        600: {
          slidesPerView: 3,
        },
      },
    });
    this.swiper.slidesPerViewDynamic();
  }
  slideNext() {
    this.swiper.slideNext();
  }
  slidePrev() {
    this.swiper.slidePrev();
  }
  openPopup(card: any): void {
    let dialogRef = this.dialog.open(PopupComponent, {
      height: '650px',
      width: '98%',
      data: { card: card }
    });
  }
}

// openPopup(): void {
//   this.dialog.open(PopupComponent,({width: "100%", height: "80vw", panelClass:"custom-dialogue"}));
// }

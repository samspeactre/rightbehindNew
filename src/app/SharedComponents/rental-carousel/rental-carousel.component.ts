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
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    PropertyCardComponent,
    CarouselModule
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
  isDragging: boolean = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 20,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  }
  constructor(
    public dialog: MatDialog,
    private http: HttpService,
    private store: Store
  ) { }

  ngOnInit(): void {
    console.log(this.type);

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

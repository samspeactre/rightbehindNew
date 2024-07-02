import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HttpService } from '../../Services/http.service';
import { PopupComponent } from '../popup/popup.component';
import { PropertyCardComponent } from '../property-card/property-card.component';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    PropertyCardComponent,
    CarouselModule,
    CommonModule,
    FontAwesomeModule
  ],
  selector: 'app-rental-carousel',
  templateUrl: './rental-carousel.component.html',
  styleUrl: './rental-carousel.component.scss',
})
export class RentalCarouselComponent implements OnInit {
  @Input() cards: any = [1, 2, 3, 4, 5];
  @Input() type!: string;
  @Input() background!: string;
  @Input() heading!: string;
  faChevronCircleLeft=faChevronLeft
  faChevronCircleRight=faChevronRight
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
      740: {
        items: 3
      },
      1024:{
        items: 4
      }
    },
    nav: false
  }
  constructor(
    public dialog: MatDialog,
    private http: HttpService,
    private store: Store
  ) { }

  ngOnInit(): void {}
  public ngAfterViewInit(): void {window.dispatchEvent(new Event('resize'));}
}

// openPopup(): void {
//   this.dialog.open(PopupComponent,({width: "100%", height: "80vw", panelClass:"custom-dialogue"}));
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardCarouselComponent } from '../../app/card-carousel/card-carousel.component';
import {} from '../../app/card-carousel/card-carousel.component';
import { BlogCarouselComponent } from '../../app/blog-carousel/blog-carousel.component';
import { FooterComponent } from '../footer/footer.component';
import { SellerCarouselComponent } from '../seller-carousel/seller-carousel.component';

import { NavbarComponent } from '../navbar/navbar.component';
import { RentalCarouselComponent } from '../rental-carousel/rental-carousel.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    NavbarComponent,
    RentalCarouselComponent,
    FooterComponent,
    BlogCarouselComponent,
    CardCarouselComponent,
    SellerCarouselComponent,
    SearchBarComponent,
    MatButtonModule
],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  counters: {
    name: string;
    count: number;
    minCount: number;
    maxCount: number;
  }[] = [
    { name: ' Property Listings', count: 0, minCount: 0, maxCount: 350 },
    { name: 'Monthly Users', count: 0, minCount: 0, maxCount: 200 },
    { name: 'New Property every Month', count: 0, minCount: 0, maxCount: 30 },
  ];
  intervalIds: any[] = [];

  ngOnInit() {
    this.startCounters();
  }

  ngOnDestroy() {
    this.stopCounters();
  }

  startCounters() {
    this.counters.forEach((counter, index) => {
      const intervalId = setInterval(() => {
        if (counter.count < counter.maxCount) {
          counter.count++;
        } else {
          this.stopCounter(index);
        }
      }, 30); // Interval duration
      this.intervalIds.push(intervalId);
    });
  }

  stopCounters() {
    this.intervalIds.forEach((id) => clearInterval(id));
  }

  stopCounter(index: number) {
    clearInterval(this.intervalIds[index]);
  }
}

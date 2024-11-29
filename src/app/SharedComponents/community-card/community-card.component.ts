import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MapComponent } from '../map/map.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    CarouselModule,
    FontAwesomeModule,
    MapComponent,
  ],
  selector: 'app-community-card',
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.scss',
})
export class CommunityCardComponent {
  @Input() loader: boolean = true;
  @Input() animation: boolean = true;
  @Input() item: any;
  @Output() propertyHover = new EventEmitter<any>();
  url!: string;
  constructor(private router: Router) {}
  ngOnInit() {
    this.url = this.router.url;
  }
  routeToCommunity() {
    this.router.navigate(['/communities/community'], {
      queryParams: {
        id: this.item?.id,
        title: this.item?.title,
        city: this.item?.city,
        imagePath: this.item?.imagePath,
        userExistInForum: this.item?.userExistInForum,
      },
    });
  }
  hover(){
    this.propertyHover.emit({ lat: this.item?.latitude, lng: this.item?.longitude })
  }
}

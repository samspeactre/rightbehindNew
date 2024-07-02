
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronCircleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MapComponent } from '../map/map.component';

@Component({
  standalone: true,
  imports: [RouterModule, MatIconModule, MatButtonModule, CarouselModule, FontAwesomeModule, MapComponent],
  selector: 'app-community-card',
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.scss'
})
export class CommunityCardComponent {
  @Input() loader:boolean = true;
  @Input() item:any;
  url!:string;
  constructor(private router:Router){}
  ngOnInit(){
    this.url = this.router.url;
  }
  routeToCommunity(){
    this.router.navigate(['/communities/community'], { queryParams: { id:this.item?.id,title:this.item?.title } });
  }
}

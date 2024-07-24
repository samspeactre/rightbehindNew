
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronCircleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MapComponent } from '../map/map.component';
import { CommunityCardComponent } from '../community-card/community-card.component';
import { HttpService } from '../../Services/http.service';
import { Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';

@Component({
  standalone:true,
  imports: [RouterModule, CommunityCardComponent, MatIconModule, MatButtonModule, CarouselModule, FontAwesomeModule, MapComponent],
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrl: './card-carousel.component.scss'
})
export class CardCarouselComponent implements OnInit{
  cards:any=[1,2,3,4,5]
  faChevronCircleLeft=faChevronLeft
  faChevronCircleRight=faChevronRight
  faChevronCircleRight2=faChevronCircleRight
  loader:boolean = false;
  private destroy$ = new Subject<void>();
  customOptions: OwlOptions = {
    loop: false,
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
      }
    },
    nav: false
  }
  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.getInquiries()
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getHeight(){
    const height = document.getElementsByClassName('heightGet')[0]?.clientHeight
    return height
  }
  getInquiries() {
    this.loader = true
    this.http.get('Forum/get?pageSize=5&byUser=false', false)
    .pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      ),
      finalize(()=>{
        this.loader = false
      })
    )
    .subscribe((response) => {
      this.cards = response?.model?.forums
    })
  }
}

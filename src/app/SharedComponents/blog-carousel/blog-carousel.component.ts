import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { finalize } from 'rxjs';
import { HttpService } from '../../Services/http.service';

@Component({
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
    MatButtonModule,
    CarouselModule,
    CommonModule,
    FontAwesomeModule,
  ],
  selector: 'app-blog-carousel',
  templateUrl: './blog-carousel.component.html',
  styleUrls: ['./blog-carousel.component.scss'],
})
export class BlogCarouselComponent implements OnInit {
  faArrowRight = faArrowRight;
  loading: boolean = true;
  cards = [
    {
      imgSrc: '',
      date: 'March 2024',
      badge: 'Marketing',
      name: 'How behavioral-based solutions minimize your marketing budget.',
      description:
        ' Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet....',
      buttonUrl: '',
    },
    {
      imgSrc: '',
      date: 'April 2024',
      badge: 'Marketing',
      name: 'Consistency is the key to achieving marketing success.',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet.... ',
      buttonUrl: '',
    },
    {
      imgSrc: '',
      date: 'March 2024',
      badge: 'Marketing',
      name: 'How behavioral-based solutions minimize your marketing budget.',
      description:
        ' Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet....',
      buttonUrl: '',
    },
  ];
  faChevronCircleLeft = faChevronLeft;
  faChevronCircleRight = faChevronRight;
  customOptions: OwlOptions = {
    loop: true,
    skip_validateItems: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 20,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
    },
    nav: false,
  };
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getBlogs();
  }
  getBlogs() {
    this.http
      .loaderGet('Blog/get', false)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (response) => {
          this.cards = response?.model?.blogs;
        },
        (err) => {
          this.cards = [];
        }
      );
  }
  getTruncatedDescription(description: string, length: number): string {
    if (!description) {
      return '';
    }
    return description.length > length
      ? description.slice(0, length) + '...'
      : description;
  }
}

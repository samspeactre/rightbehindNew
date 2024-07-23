import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HttpService } from '../../Services/http.service';

@Component({
  standalone: true,
  imports: [MatIconModule, RouterModule, MatButtonModule, CarouselModule, FontAwesomeModule],
  selector: 'app-blog-carousel',
  templateUrl: './blog-carousel.component.html',
  styleUrls: ['./blog-carousel.component.scss']
})

export class BlogCarouselComponent implements OnInit {
  faArrowRight=faArrowRight
  cards = [
    { imgSrc: '../../assets/img/blog-1.webp', date: 'March 2024', badge: 'Marketing', name: 'How behavioral-based solutions minimize your marketing budget.', description: ' Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet....', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-2.webp', date: 'April 2024', badge: 'Marketing', name: 'Consistency is the key to achieving marketing success.', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet.... ', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-1.webp', date: 'March 2024', badge: 'Marketing', name: 'How behavioral-based solutions minimize your marketing budget.', description: ' Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet....', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-2.webp', date: 'April 2024', badge: 'Marketing', name: 'Consistency is the key to achieving marketing success.', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet.... ', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-1.webp', date: 'March 2024', badge: 'Marketing', name: 'How behavioral-based solutions minimize your marketing budget.', description: ' Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet....', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-2.webp', date: 'April 2024', badge: 'Marketing', name: 'Consistency is the key to achieving marketing success.', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet.... ', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-1.webp', date: 'March 2024', badge: 'Marketing', name: 'How behavioral-based solutions minimize your marketing budget.', description: ' Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet....', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-2.webp', date: 'April 2024', badge: 'Marketing', name: 'Consistency is the key to achieving marketing success.', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet.... ', buttonUrl: '', },
 
    // Add more card data as needed
  ];
  faChevronCircleLeft=faChevronLeft
  faChevronCircleRight=faChevronRight
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
        items: 1
      },
      740: {
        items: 3
      }
    },
    nav: false
  }
  constructor(private router: Router, private http:HttpService) { }

  ngOnInit(): void {
    this.getBlogs()
  }
  getBlogs(){
    this.http.loaderGet('Blog/get',false).subscribe((response)=>{
      console.log(response);
    })
  }
  navigateToBlogInner() {
    this.router.navigate(['/blog-inner']);
  }
}

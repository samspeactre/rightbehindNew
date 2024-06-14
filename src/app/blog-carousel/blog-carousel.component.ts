import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-blog-carousel',
  templateUrl: './blog-carousel.component.html',
  styleUrl: './blog-carousel.component.css'
})
export class BlogCarouselComponent implements OnInit {
  cards = [
    { imgSrc: '../../assets/img/blog-1.png', date: 'March 2024', badge: 'Marketing', name: 'How behavioral-based solutions minimize your marketing budget.', description: ' Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet....', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-2.png', date: 'April 2024', badge: 'Marketing', name: 'Consistency is the key to achieving marketing success.', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet.... ', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-1.png', date: 'March 2024', badge: 'Marketing', name: 'How behavioral-based solutions minimize your marketing budget.', description: ' Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet....', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-2.png', date: 'April 2024', badge: 'Marketing', name: 'Consistency is the key to achieving marketing success.', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet.... ', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-1.png', date: 'March 2024', badge: 'Marketing', name: 'How behavioral-based solutions minimize your marketing budget.', description: ' Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet....', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-2.png', date: 'April 2024', badge: 'Marketing', name: 'Consistency is the key to achieving marketing success.', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet.... ', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-1.png', date: 'March 2024', badge: 'Marketing', name: 'How behavioral-based solutions minimize your marketing budget.', description: ' Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet....', buttonUrl: '', },
    { imgSrc: '../../assets/img/blog-2.png', date: 'April 2024', badge: 'Marketing', name: 'Consistency is the key to achieving marketing success.', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet.... ', buttonUrl: '', },
 
    // Add more card data as needed
  ];
  swiper!: Swiper;

  constructor() { }

  ngOnInit(): void {
    this.initSwiper();
  }

  initSwiper(): void {
    this.swiper = new Swiper(".swiper-container", {
      // slidesPerView: 1,
      width: 2130,
      spaceBetween: 32,
      loop: true, // Set loop to true for infinite loop
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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
 
  }
  slideNext() {
    this.swiper.slideNext()
  }
  slidePrev() {
    this.swiper.slidePrev()
  }
}

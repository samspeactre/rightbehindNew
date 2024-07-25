import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MiniLoadingComponent } from '../../SharedComponents/loaders/mini-loader/mini-loading.component';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';
import { RentalCarouselComponent } from '../../SharedComponents/rental-carousel/rental-carousel.component';
import { HttpService } from '../../Services/http.service';

@Component({
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RentalCarouselComponent, FontAwesomeModule, MatIconModule, NavbarComponent, MatButtonModule, RouterModule, MiniLoadingComponent, CarouselModule],
  selector: 'app-blog-inner',
  templateUrl: './blog-inner.component.html',
  styleUrl: './blog-inner.component.scss',

})
export class BlogInnerComponent {
  faUser=faUser
  id:any;
  blog:any;
  constructor(private activatedRoute:ActivatedRoute, private http:HttpService){
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      this.id = res?.id
    })
  }
  ngOnInit(){
    this.getBlog()
  }
  getBlog(){
    this.http.loaderGet(`Blog/get/${this.id}`,true).subscribe((response:any)=>{
      console.log(response);
      this.blog = response?.model
    })
  }
}

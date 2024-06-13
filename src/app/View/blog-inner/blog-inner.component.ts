import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';
import { RentalCarouselComponent } from '../../SharedComponents/rental-carousel/rental-carousel.component';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical, faHeart, faPhoneAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subject, finalize, takeUntil } from 'rxjs';
import { MiniLoadingComponent } from '../../SharedComponents/loaders/mini-loader/mini-loading.component';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { HttpService } from '../../Services/http.service';
import { HelperService } from '../../Services/helper.service';

@Component({
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RentalCarouselComponent, FontAwesomeModule, MatIconModule, NavbarComponent, MatButtonModule, RouterModule, MiniLoadingComponent, CarouselModule],
  selector: 'app-blog-inner',
  templateUrl: './blog-inner.component.html',
  styleUrl: './blog-inner.component.scss',

})
export class BlogInnerComponent {
  faUser=faUser
}

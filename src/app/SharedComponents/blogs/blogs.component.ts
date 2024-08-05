import { Component } from '@angular/core';
import { BannerComponent } from '../../SharedComponents/banner/banner.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    BannerComponent,
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {

}

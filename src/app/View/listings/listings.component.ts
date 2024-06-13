import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';
import { FooterComponent } from '../../SharedComponents/footer/footer.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BannerComponent } from '../../SharedComponents/banner/banner.component';

@Component({
  standalone:true,
  imports:[MatIconModule,MatFormFieldModule,MatInputModule,NavbarComponent, BannerComponent, FooterComponent,MatButtonModule],
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent {

}

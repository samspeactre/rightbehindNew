import { Component } from '@angular/core';
import { FooterComponent } from '../../SharedComponents/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatLabel, MatSelect } from '@angular/material/select';
import { SearchBarComponent } from '../../SharedComponents/search-bar/search-bar.component';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone:true,
  imports: [FooterComponent, MatIconModule, MatOption, MatSelect, MatLabel, MatFormFieldModule, MatInputModule, SearchBarComponent, NavbarComponent, MatButtonModule],
  selector: 'app-selling-property',
  templateUrl: './selling-property.component.html',
  styleUrl: './selling-property.component.css'
})
export class SellingPropertyComponent {
  cards = [
    { imgSrc: '../../assets/img/carousel-img-1.png', badge:'1 Month Free🔥',  name: 'New Apartment Nice View', desc: 'Quincy St, Brooklyn, NY, USA', bed: '03', bath: '02', sqft: '1,200', price: '25,000', buttonUrl: '',  },
    { imgSrc: '../../assets/img/carousel-img-2.png', badge:'2 Month Free🔥',  name: 'New Apartment Nice View', desc: 'Quincy St, Brooklyn, NY, USA', bed: '03', bath: '02', sqft: '1,200', price: '25,000', buttonUrl: '',  },
    { imgSrc: '../../assets/img/carousel-img-3.png', badge:'1 Month Free🔥',  name: 'New Apartment Nice View', desc: 'Quincy St, Brooklyn, NY, USA', bed: '03', bath: '02', sqft: '1,200', price: '25,000', buttonUrl: '',  },
    { imgSrc: '../../assets/img/carousel-img-1.png', badge:'2 Month Free🔥',  name: 'New Apartment Nice View', desc: 'Quincy St, Brooklyn, NY, USA', bed: '03', bath: '02', sqft: '1,200', price: '25,000', buttonUrl: '',  },
    { imgSrc: '../../assets/img/carousel-img-2.png', badge:'1 Month Free🔥',  name: 'New Apartment Nice View', desc: 'Quincy St, Brooklyn, NY, USA', bed: '03', bath: '02', sqft: '1,200', price: '25,000', buttonUrl: '',  },
    { imgSrc: '../../assets/img/carousel-img-3.png', badge:'2 Month Free🔥',  name: 'New Apartment Nice View', desc: 'Quincy St, Brooklyn, NY, USA', bed: '03', bath: '02', sqft: '1,200', price: '25,000', buttonUrl: '',  },
   
 
  ];
}

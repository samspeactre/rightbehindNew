import { Component } from '@angular/core';

@Component({
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

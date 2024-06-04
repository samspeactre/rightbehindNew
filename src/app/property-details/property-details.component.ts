import { Component } from '@angular/core';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css'
})
export class PropertyDetailsComponent {
  cards = [
    { imgSrc: '../../assets/img/carousel-img-1.png', badge:'1 Month Free🔥',  name: 'New Apartment Nice View', desc: 'Quincy St, Brooklyn, NY, USA', bed: '03', bath: '02', sqft: '1,200', price: '25,000', buttonUrl: '',  },
    { imgSrc: '../../assets/img/carousel-img-2.png', badge:'2 Month Free🔥',  name: 'New Apartment Nice View', desc: 'Quincy St, Brooklyn, NY, USA', bed: '03', bath: '02', sqft: '1,200', price: '25,000', buttonUrl: '',  },
    { imgSrc: '../../assets/img/carousel-img-3.png', badge:'1 Month Free🔥',  name: 'New Apartment Nice View', desc: 'Quincy St, Brooklyn, NY, USA', bed: '03', bath: '02', sqft: '1,200', price: '25,000', buttonUrl: '',  },
    { imgSrc: '../../assets/img/carousel-img-1.png', badge:'2 Month Free🔥',  name: 'New Apartment Nice View', desc: 'Quincy St, Brooklyn, NY, USA', bed: '03', bath: '02', sqft: '1,200', price: '25,000', buttonUrl: '',  },
    { imgSrc: '../../assets/img/carousel-img-2.png', badge:'1 Month Free🔥',  name: 'New Apartment Nice View', desc: 'Quincy St, Brooklyn, NY, USA', bed: '03', bath: '02', sqft: '1,200', price: '25,000', buttonUrl: '',  },
    { imgSrc: '../../assets/img/carousel-img-3.png', badge:'2 Month Free🔥',  name: 'New Apartment Nice View', desc: 'Quincy St, Brooklyn, NY, USA', bed: '03', bath: '02', sqft: '1,200', price: '25,000', buttonUrl: '',  },
   
 
  ];
}

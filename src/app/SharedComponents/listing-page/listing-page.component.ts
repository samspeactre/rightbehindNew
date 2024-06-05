import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../View/popup/popup.component';
import { FooterComponent } from '../footer/footer.component';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatLabel, MatSelect } from '@angular/material/select';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone:true,
  imports: [FooterComponent, MapMarker, GoogleMap, RouterModule, MatIconModule, MatOption, MatSelect, MatLabel, MatFormFieldModule, MatInputModule, SearchBarComponent, NavbarComponent, MatButtonModule],
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.css'
})
export class ListingPageComponent implements OnInit {
  cards = [
    { imgSrc: '../../assets/img/carousel-img-1.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200', price: '25,000', buttonUrl: '' },
    { imgSrc: '../../assets/img/carousel-img-2.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200', price: '25,000', buttonUrl: '' },
    { imgSrc: '../../assets/img/carousel-img-3.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200', price: '25,000', buttonUrl: '' },
    { imgSrc: '../../assets/img/carousel-img-1.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200', price: '25,000', buttonUrl: '' },
    { imgSrc: '../../assets/img/carousel-img-2.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200', price: '25,000', buttonUrl: '' },
    { imgSrc: '../../assets/img/carousel-img-3.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200', price: '25,000', buttonUrl: '' },
    { imgSrc: '../../assets/img/carousel-img-1.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200', price: '25,000', buttonUrl: '' },
    { imgSrc: '../../assets/img/carousel-img-2.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200', price: '25,000', buttonUrl: '' },
    { imgSrc: '../../assets/img/carousel-img-3.png', name: 'New Apartment Nice View', tag: 'miami', address: 'Quincy St, Brooklyn, NY, USA  ', room: '02', bath: '03', sqft: '1,200', price: '25,000', buttonUrl: '' },


    // Add more card data as needed
  ];
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: -34.40097030,
    lng: 150.48267150
  };

  light = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
  ]
  options: google.maps.MapOptions = {
    styles: this.light,
    mapId: "8bd4969372a2f413",
    disableDefaultUI: false,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    panControl: false
  }
  zoom = 15;
  mapTypeId: google.maps.MapTypeId = google.maps.MapTypeId.TERRAIN;
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: any = {
    draggable: true
  };
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  addMarker(event: any) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }
  moveMap(event: any) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: any) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  openPopup(): void {
    this.dialog.open(PopupComponent);
  }

}

import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeftLong, faArrowRightLong, faKey, faMapMarker, faMapMarkerAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts'
@Component({
  standalone:true,
  imports:[MatIconModule, MatButtonModule, FontAwesomeModule, NgApexchartsModule],
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  display: any;
  faArrowLeft=faArrowRightLong
  faMapMarker=faMapMarkerAlt
  faSaleTag=faTag
  faKey=faKey
  @Output() viewAllListingsEvent = new EventEmitter<void>();
  @Output() viewOffMarketEvent = new EventEmitter<void>();
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions:any;

  constructor(public dialog: MatDialog) {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      horizontal: true,
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };
  }
  viewAllListings() {
    this.viewAllListingsEvent.emit();
  }

  viewOffMarket(){
    this.viewOffMarketEvent.emit();
  }

  cards = [
    { imgSrc: '../../assets/img/carousel-img-1.png', title: 'New Apartment Nice View', address: 'Quincy St, Brooklyn, NY, USA', bed: '02', bath: '03', sqft: '1200', price: '25000' },
    { imgSrc: '../../assets/img/carousel-img-2.png', title: 'New Apartment Nice View', address: 'Quincy St, Brooklyn, NY, USA', bed: '02', bath: '03', sqft: '1200', price: '25000' },
    { imgSrc: '../../assets/img/carousel-img-3.png', title: 'New Apartment Nice View', address: 'Quincy St, Brooklyn, NY, USA', bed: '02', bath: '03', sqft: '1200', price: '25000' },
  ]

  Analaytics = [
    { leads: '10', call:'12', emails: '8', view: '5', click: '3', ctr: '5' },
  ]

  // center: google.maps.LatLngLiteral = {
  //   lat: -34.40097030,
  //   lng: 150.48267150
  // };

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
  // options: google.maps.MapOptions = {
  //   styles: this.light,
  //   mapId: "8bd4969372a2f413",
  //   disableDefaultUI: false,
  //   mapTypeControl: true,
  //   streetViewControl: false,
  //   fullscreenControl: false,
  //   panControl: false
  // }
  zoom = 15;
  // mapTypeId: google.maps.MapTypeId = google.maps.MapTypeId.TERRAIN;
  // markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: any = {
    draggable: true
  };
  ngOnInit() {
  }
  addMarker(event: any) {
    // if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }
  moveMap(event: any) {
    // if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: any) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}

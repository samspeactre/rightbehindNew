import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 };
  @Input() zoom: number = 8;
  @Input() height: any;
  @Input() addMarker: boolean = false;
  @Input() draggable: boolean = false;
  display!: google.maps.LatLngLiteral;
  @ViewChild(GoogleMap) map!: GoogleMap;
  mapScriptLoad: boolean = false;
  markerOptions: google.maps.MarkerOptions = { draggable: true, clickable: true, crossOnDrag: true, optimized: true };
  
  @Input() markerPositions: google.maps.LatLngLiteral[] = [{ lat: 24, lng: 12 }];
  constructor() { }
  moveMap(event: any) {
    this.center = (event.latLng.toJSON());
  }

  move(event: any) {
    this.display = event.latLng.toJSON();
  }
  ngOnInit(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyBGYeRS6eNJZNzhvtiEcWb7Fmp1d4bm300',
      version: 'weekly',
    });

    loader.load().then(() => {
      this.mapScriptLoad = true;
      this.initMap();
    }).catch(err => {
      console.error('Error loading Google Maps script:', err);
    });
  }

  ngOnDestroy(): void {
  }

  initMap(): void {
    if (this.map && this.map.googleMap) {
      this.map.googleMap.setCenter(this.center);
      this.map.googleMap.setZoom(this.zoom);
    }
  }

  addMarkerPoint(event: any): void {
    this.markerPositions = [event.latLng.toJSON()];
  }
  onMarkerDragEnd(event: google.maps.MapMouseEvent, marker: google.maps.LatLngLiteral): void {
    console.log('Marker Dragged:', marker, event);
  }
}

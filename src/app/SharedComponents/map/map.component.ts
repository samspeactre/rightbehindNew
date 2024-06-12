import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { Loader } from '@googlemaps/js-api-loader';
export const key = 'AIzaSyBGYeRS6eNJZNzhvtiEcWb7Fmp1d4bm300'
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, GoogleMap, MapMarker],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 };
  @Input() zoom: number = 8;
  @Input() height: any;
  @Input() addMarker: boolean = false;
  @Input() draggable: boolean = false;
  @Input() search: boolean = false;
  @Input() markerPositions: google.maps.LatLngLiteral[] = [{ lat: 24, lng: 12 }];
  @Output() mapMarkerCordinates = new EventEmitter<any>();
  @Output() mapSearchLocation = new EventEmitter<string>();
  display!: google.maps.LatLngLiteral;
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild('autocompleteInput') autocompleteInput!: ElementRef;
  mapScriptLoad: boolean = false;
  markerOptions!: google.maps.MarkerOptions;
  autocomplete!: google.maps.places.Autocomplete;
  autocompleteListener!: google.maps.MapsEventListener;
  isFocused: boolean = false;
  value: string =''
  constructor(private http: HttpClient) { }
  moveMap(event: any) {
    this.center = (event.latLng.toJSON());
  }

  move(event: any) {
    this.display = event.latLng.toJSON();
  }
  ngOnInit(): void {
    const loader = new Loader({
      apiKey: key,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      this.mapScriptLoad = true;
      this.initMap();
    }).catch(err => {
      console.error('Error loading Google Maps script:', err);
    });
  }

  ngOnDestroy(): void {
    if (this.autocompleteListener) {
      google.maps.event.removeListener(this.autocompleteListener);
    }
  }

  initMap(): void {
    this.markerOptions = { draggable: this.draggable, clickable: true, crossOnDrag: true, optimized: true };
    if (this.map && this.map.googleMap) {
      this.map.googleMap.setCenter(this.center);
      this.map.googleMap.setZoom(this.zoom);
    }
    if (this.search) {
      this.initAutocomplete()
    }
  }
  initAutocomplete(): void {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.nativeElement);
    this.autocompleteListener = this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        this.center = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        this.addMarkerPoint({ latLng: place.geometry.location });
        this.mapSearchLocation.emit(place.formatted_address)
      }
    });
  }
  addMarkerPoint(event: any): void {
    this.markerPositions = [event.latLng.toJSON()];
    this.getSearchName(event.latLng.toJSON())
    this.mapMarkerCordinates.next(event.latLng.toJSON())
  }
  onMarkerDragEnd(event: any): void {
    const draggedPosition = event.latLng.toJSON();
    this.getSearchName(draggedPosition)
  }
  write(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    if (input.value?.length > 0) {
      this.togglePlaceholder(true);
    }
  }
  togglePlaceholder(state: boolean): void {
    if (state) {
      this.isFocused = state;
    } else {
      if (!this.value) {
        this.isFocused = state;
      }
    }
  }
  getSearchName(location: { lat: number, lng: number }): void {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${key}`;
    this.http.get(geocodeUrl).subscribe((response: any) => {
      if (response.status === 'OK' && response.results.length > 0) {
        const placeName = response.results[0].formatted_address;
        this.mapMarkerCordinates.next(location)
        this.mapSearchLocation.emit(placeName)
        this.value = placeName;
        this.isFocused = true;
      } else {
        console.error('Error in reverse geocoding:', response);
      }
    }, (error) => {
      console.error('Geocoding API error:', error);
    });
  }
}

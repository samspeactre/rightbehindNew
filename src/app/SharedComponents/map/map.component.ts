import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  GoogleMap,
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { PropertyCardMapComponent } from '../property-card-map/property-card-map.component';

export const key = 'AIzaSyBGYeRS6eNJZNzhvtiEcWb7Fmp1d4bm300';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMapsModule,
    GoogleMap,
    MapInfoWindow,
    MapMarker,
    CommonModule,
    PropertyCardMapComponent,
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() center: google.maps.LatLngLiteral = {
    lat: 25.761681,
    lng: -80.191788,
  };
  @Input() zoom: number = 10;
  @Input() height: any;
  @Input() addMarker: boolean = false;
  @Input() draggable: boolean = false;
  @Input() mapDraggable: boolean = true;
  @Input() search: boolean = false;
  @Input() markerPositions: google.maps.LatLngLiteral[] = [];
  @Input() communityMarkerPositions: google.maps.LatLngLiteral[] = [];
  @Input() blogArray: google.maps.LatLngLiteral[] = [];
  @Input() videoArray: google.maps.LatLngLiteral[] = [];
  @Input() bothArray: google.maps.LatLngLiteral[] = [];
  @Input() infoWindow: any = [];
  @Input() infoContents: any = [];
  @Input() bothContents: any = [];
  @Input() blogContents: any = [];
  @Input() videoContents: any = [];
  @Input() video: boolean = false;
  @Input() blog: boolean = false;
  @Input() community: boolean = false;
  @Output() mapMarkerCordinates = new EventEmitter<any>();
  @Output() mapSearchLocation = new EventEmitter<any>();
  display!: google.maps.LatLngLiteral;
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild('autocompleteInput') autocompleteInput!: ElementRef;
  propertyMarkerOptions!: google.maps.MarkerOptions;
  communityMarkerOptions!: google.maps.MarkerOptions;
  blogMarkerOptions!: google.maps.MarkerOptions;
  bothMarkerOptions!: google.maps.MarkerOptions;
  autocomplete!: google.maps.places.Autocomplete;
  autocompleteListener!: google.maps.MapsEventListener;
  isFocused: boolean = false;
  index!: any;
  type: any;
  @Input() value: string = '';
  @ViewChild(MapInfoWindow) infosWindow!: MapInfoWindow;

  constructor(private http: HttpClient) {}

  moveMap(event: any) {
    this.center = event.latLng.toJSON();
  }

  move(event: any) {
    this.display = event.latLng.toJSON();
  }

  ngOnInit(): void {
    this.initMap();
    if (this.value) {
      this.isFocused = true;
    }
  }

  ngOnDestroy(): void {
    if (this.autocompleteListener) {
      google.maps.event.removeListener(this.autocompleteListener);
    }
  }

  initMap(): void {
    this.propertyMarkerOptions = {
      draggable: this.draggable,
      clickable: true,
      crossOnDrag: true,
      optimized: true,
      icon: {
        url: '/assets/img/propertyMar.webp',
        scaledSize: new google.maps.Size(50, 50),
      },
    };

    this.communityMarkerOptions = {
      draggable: this.draggable,
      clickable: true,
      crossOnDrag: true,
      optimized: true,
      icon: {
        url: '/assets/img/markerC.webp',
        scaledSize: new google.maps.Size(50, 50),
      },
    };
    this.bothMarkerOptions = {
      draggable: this.draggable,
      clickable: true,
      crossOnDrag: true,
      optimized: true,
      icon: {
        url: '/assets/img/bryanMar.webp',
        scaledSize: new google.maps.Size(50, 50),
      },
    };
    this.blogMarkerOptions = {
      draggable: this.draggable,
      clickable: true,
      crossOnDrag: true,
      optimized: true,
      icon: {
        url: '/assets/img/blogMar.webp',
        scaledSize: new google.maps.Size(50, 50),
      },
    };
    if (this.map && this.map.googleMap) {
      this.map.googleMap.setCenter(this.center);
      this.map.googleMap.setZoom(this.zoom);
      this.map.googleMap.setOptions({ disableDefaultUI: true });
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.search) {
        this.initAutocomplete();
      }
    }, 500);
  }
  initAutocomplete(): void {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput?.nativeElement
    );
    this.autocompleteListener = this.autocomplete.addListener(
      'place_changed',
      () => {
        const place = this.autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          this.center = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          this.addMarkerPoint({ latLng: place.geometry.location });
          this.mapSearchLocation.emit({
            address: place.formatted_address,
            ...this.returnLocationDetails(place.address_components),
          });
          this.mapSearchLocation.emit(place.formatted_address);
        }
      }
    );
  }

  addMarkerPoint(event: any): void {
    if (this.community) {
      this.communityMarkerPositions = [event.latLng.toJSON()];
    } else {
      this.markerPositions = [event.latLng.toJSON()];
    }
    this.getSearchName(event.latLng.toJSON());
    this.mapMarkerCordinates.next(event.latLng.toJSON());
  }

  onMarkerDragEnd(event: any): void {
    const draggedPosition = event.latLng.toJSON();
    this.getSearchName(draggedPosition);
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

  getSearchName(location: { lat: number; lng: number }): void {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${key}`;
    this.http.get(geocodeUrl).subscribe(
      (response: any) => {
        if (response.status === 'OK' && response.results.length > 0) {
          const placeName = response.results[0].formatted_address;
          this.mapMarkerCordinates.next(location);
          this.mapSearchLocation.emit({
            address: placeName,
            ...this.returnLocationDetails(
              response.results[0].address_components
            ),
          });
          this.value = placeName;
          this.isFocused = true;
        } else {
          console.error('Error in reverse geocoding:', response);
        }
      },
      (error) => {
        console.error('Geocoding API error:', error);
      }
    );
  }

  returnLocationDetails(addressComponents: any): any {
    let city = '';
    let country = '';
    let street = '';
    let zipCode = '';
    let state = '';

    for (const component of addressComponents) {
      if (component.types.includes('locality')) {
        city = component.long_name;
      }
      if (component.types.includes('country')) {
        country = component.long_name;
      }
      if (component.types.includes('route')) {
        street = component.long_name;
      }
      if (component.types.includes('postal_code')) {
        zipCode = component.long_name;
      }
      if (component.types.includes('administrative_area_level_1')) {
        state = component.long_name;
      }
    }
    return { city, country, street, zipCode, state };
  }

  openInfoWindow(marker: MapMarker, i: number) {
    this.infosWindow.open(marker);
    this.index = i;
  }
  openMapInfoWindow(marker: MapMarker, i: number, type: string) {
    this.infosWindow.open(marker);
    this.index = i;
    this.type = type;
  }
  open(type) {
    if (type == 'blog') {
      window.open(this.blogContents?.[this.index]?.blogUrl);
    } else if (type == 'video') {
      window.open(this.videoContents?.[this.index]?.videoUrl);
    } else {
      window.open(this.bothContents?.[this.index]?.bothUrl);
    }
  }
}

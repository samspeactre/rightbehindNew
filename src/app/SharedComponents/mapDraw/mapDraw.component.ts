import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ResizeService } from '../../Services/resize.service';
import { CommunityCardMapComponent } from '../community-card-map/community-card-map.component';
import { PropertyCardMapComponent } from '../property-card-map/property-card-map.component';

declare const google: any;

@Component({
  selector: 'app-map-draw',
  standalone: true,
  imports: [GoogleMapsModule, FontAwesomeModule],
  templateUrl: './mapDraw.component.html',
  styleUrls: ['./mapDraw.component.scss'],
})
export class MapDrawComponent implements OnInit, OnDestroy {
  private _center: google.maps.LatLngLiteral = {
    lat: 25.761681,
    lng: -80.191788,
  };
  @Input() center: google.maps.LatLngLiteral = this._center;
  @Input() infoContents: any[] = [];
  @Input() height: any;
  @Input() community: boolean = false;
  @Output() propertyHover = new EventEmitter<any>();
  @Output() drawCordinates = new EventEmitter<any>();
  @Input() markerPositions: any[] = [];
  @Input() communityMarkerPositions: any[] = [];

  markers: any[] = [];
  communityMarkers: any[] = [];
  originalMarkers: any[] = [];
  googleMarkers: any[] = [];
  drawnShapes: google.maps.Polygon[] = [];
  poly: any;
  map: any;
  private currentInfoWindow: google.maps.InfoWindow | null = null;
  mapOptions: any = {
    zoom: 13,
    center: this._center,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    gestureHandling: 'greedy',
    draggable: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };
  drawingMode: boolean = false;

  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    public resize: ResizeService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.clearDrawing();
  }

  async ngAfterViewInit() {
    await this.initiateMap();
    if (!this.communityMarkers.length) {
      this.setupButtonClickListeners();
    }
  }

  async initiateMap() {
    this.map = new google.maps.Map(
      document.getElementById('map_canvas'),
      this.mapOptions
    );
    document.getElementById('drawpoly').addEventListener('click', (e) => {
      e.preventDefault();
      this.disable();
      google.maps.event.addDomListener(this.map.getDiv(), 'mousedown', () => {
        this.drawFreeHandCheck();
      });
      google.maps.event.addDomListener(this.map.getDiv(), 'touchstart', () => {
        this.drawFreeHandCheck();
      });
    });
    this.placeMarkers();
  }

  setupButtonClickListeners() {
    document.getElementById('drawpoly').addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleDrawingMode();
    });

    document.getElementById('clearButton').addEventListener('click', (e) => {
      e.preventDefault();
      this.clearDrawing();
    });
  }

  placeMarkers() {
    this.clearMarkers();
    this.createMarkers(this.markers, '/assets/img/propertyMar.webp');
    this.createMarkers(this.communityMarkers, '/assets/img/markerC.webp');
  }

  createMarkers(markerDataArray: any[], iconUrl: string) {
    markerDataArray.forEach((markerData, index) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerData.lat, markerData.lng),
        map: this.map,
        icon: iconUrl,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: this.createInfoWindowContent(index),
      });

      marker.addListener('click', () => {
        if (this.currentInfoWindow) {
          this.currentInfoWindow.close();
        }
        infoWindow.open(this.map, marker);
        this.currentInfoWindow = infoWindow;
        this.propertyHover.emit(
          this.infoContents[index]?.listingId || this.infoContents[index]?.id
        );
        this.map.setCenter(marker.getPosition());
        this.map.setZoom(13);
      });
      markerData.markerInstance = marker;
      markerData.infoWindowInstance = infoWindow;
      this.googleMarkers.push(marker);
    });
  }

  createInfoWindowContent(index: number): HTMLElement {
    const component: any = this.community
      ? CommunityCardMapComponent
      : PropertyCardMapComponent;
    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef: any = factory.create(this.injector);
    componentRef.instance.card = this.infoContents[index];
    componentRef.instance.loader = false;
    componentRef.instance.routeDirect = true;
    this.appRef.attachView(componentRef.hostView);
    const div = document.createElement('div');
    div.appendChild(componentRef.location.nativeElement);
    return div;
  }

  clearMarkers() {
    this.googleMarkers.forEach((marker) => marker.setMap(null));
    this.googleMarkers = [];
  }

  disableMapInteractions() {
    this.map.setOptions({
      draggable: false,
      zoomControl: true,
      scrollwheel: false,
      disableDoubleClickZoom: false,
      draggableCursor: 'crosshair',
    });
  }

  enableMapInteractions() {
    this.map.setOptions({
      draggable: true,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
      draggableCursor: 'default',
    });
  }

  closeInfoWindows() {
    if (this.currentInfoWindow) {
      this.currentInfoWindow.close();
      this.currentInfoWindow = null;
    }
  }

  toggleDrawingMode() {
    if (!this.drawingMode) {
      this.originalMarkers = [...this.markers];
      this.clearMarkers();
      this.drawingMode = true;
      this.disablePageScroll();
    } else {
      this.clearDrawing();
    }
  }

  clearDrawing() {
    this.mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(this._center?.lat, this._center?.lng),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      gestureHandling: 'greedy',
      draggable: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    };
    this.map.setOptions(this.mapOptions);
    this.enableMapInteractions();
    this.clearMarkers();
    this.clearShapes();
    this.markers = [...this.originalMarkers];
    this.placeMarkers();
    document.getElementById('clearButton').style.display = 'none';
    document.getElementById('drawpoly').style.display = 'block';
    this.drawingMode = false;
    this.enablePageScroll();
  }

  clearShapes() {
    this.drawnShapes.forEach((shape) => shape.setMap(null));
    this.drawnShapes = [];
  }

  drawFreeHandCheck(): void {
    this.poly = new google.maps.Polyline({ map: this.map, clickable: false });

    const move = google.maps.event.addListener(
      this.map,
      'mousemove',
      (e: any) => {
        this.poly.getPath().push(e.latLng);
      }
    );

    const touchMove = google.maps.event.addListener(
      this.map,
      'touchmove',
      (e: any) => {
        e.preventDefault();
        this.poly.getPath().push(e.latLng);
      }
    );

    google.maps.event.addListenerOnce(this.map, 'mouseup', (e: any) => {
      google.maps.event.removeListener(move);
      google.maps.event.removeListener(touchMove);
      const path = this.poly.getPath();
      this.poly.setMap(null);
      this.poly = new google.maps.Polygon({ map: this.map, path: path });
      this.drawnShapes.push(this.poly);

      // Log the latLng coordinates of the drawn shape
      const coordinates = path.getArray().map((latLng: any) => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }));
      console.log('Drawn Shape Coordinates:', coordinates);

      document.getElementById('drawpoly').style.display = 'none';
      document.getElementById('clearButton').style.display = 'block';
      this.enable();
    });
  }

  disablePageScroll() {
    document.body.style.overflow = 'hidden';
  }

  enablePageScroll() {
    document.body.style.overflow = 'auto';
  }
  disable(): void {
    this.disablePageScroll();
    this.map.setOptions({
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: false,
    });
  }

  enable(): void {
    this.enablePageScroll();
    this.map.setOptions({
      draggable: true,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
    });
  }
}

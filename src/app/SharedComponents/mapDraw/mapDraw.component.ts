import { CommonModule } from '@angular/common';
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  GoogleMap,
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PropertyCardMapComponent } from '../property-card-map/property-card-map.component';
import { CommunityCardMapComponent } from '../community-card-map/community-card-map.component';
import { ResizeService } from '../../Services/resize.service';

declare const google: any;
declare var $: any;

@Component({
  selector: 'app-map-draw',
  standalone: true,
  imports: [
    GoogleMapsModule,
    GoogleMap,
    MapInfoWindow,
    MapMarker,
    CommonModule,
    PropertyCardMapComponent,
    FontAwesomeModule,
  ],
  templateUrl: './mapDraw.component.html',
  styleUrls: ['./mapDraw.component.scss'],
})
export class MapDrawComponent implements OnInit, OnDestroy {
  private _center: google.maps.LatLngLiteral = {
    lat: 25.761681,
    lng: -80.191788,
  };
  @Input() set highlighted(data: any) {
    if (data) {
      this.zoomToHighlightedMarker(data);
    }
  }
  @Input()
  get center(): google.maps.LatLngLiteral {
    return this._center;
  }

  set center(value: google.maps.LatLngLiteral) {
    this._center = value;
    if (this.mapOptions) {
      this.mapOptions.center = this._center;
    }
    if (this.map) {
      this.map.setCenter(this._center);
    }
  }
  @Input() infoContents: any[] = [];
  @Input() height: any;
  @Input() community: boolean = false;
  @Input() set markerPositions(data: any[]) {
    if (data) {
      this.markers = data;
      this.placeMarkers();
    }
  }
  @Input() set communityMarkerPositions(data: any[]) {
    if (data) {
      this.communityMarkers = data;
      this.placeMarkers();
    }
  }

  markers: any[] = [];
  communityMarkers: any[] = [];
  originalMarkers: any[] = [];
  googleMarkers: any[] = [];
  drawnShapes: google.maps.Polygon[] = [];
  map: any;
  private currentInfoWindow: google.maps.InfoWindow | null = null;
  mapOptions: any = {
    zoom: 15,
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
  shapeCoordinates: google.maps.LatLngLiteral[] = [];
  shapePromise: Promise<google.maps.LatLngLiteral[]> | undefined;
  faEdit = faEdit;
  faTrash = faTrash;
  drawingMode: boolean = false;
  private mapMouseMoveListener: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    public resize: ResizeService
  ) {}

  async ngOnInit() {}

  ngOnDestroy() {
    this.clearDrawing();
    if (this.mapMouseMoveListener) {
      google.maps.event.removeListener(this.mapMouseMoveListener);
    }
  }
  async ngAfterViewInit() {
    await this.initiateMap();
    if (!this.communityMarkers?.length) {
      this.setupButtonClickListeners();
    }
  }
  // zoomToHighlightedMarker(highlighted) {
  //   if (!this.map || !highlighted) return;
  //   const marker =
  //     this.markers.find(
  //       (m) => m?.lat == highlighted.lat && m?.lng == highlighted.lng
  //     ) ||
  //     this.communityMarkers.find(
  //       (m) => m?.lat === highlighted?.lat && m?.lng === highlighted?.lng
  //     );
  //   if (marker && marker.markerInstance) {
  //     const position = marker.markerInstance.getPosition();
  //     if (position) {
  //       this.map.setCenter(position);
  //       google.maps.event.trigger(marker.markerInstance, 'click');
  //     }
  //   }
  // }
  zoomToHighlightedMarker(highlighted: any) {
    if (!this.map || !highlighted) return;

    const marker =
      this.markers.find(
        (m) => m?.lat == highlighted.lat && m?.lng == highlighted.lng
      ) ||
      this.communityMarkers.find(
        (m) => m?.lat === highlighted?.lat && m?.lng === highlighted?.lng
      );

    if (marker && marker.markerInstance) {
      const position = marker.markerInstance.getPosition();
      if (position) {
        this.map.setCenter(position);

        // const currentIcon = marker.markerInstance.getIcon();

        // marker.markerInstance.setIcon({
        //   url: currentIcon.url || currentIcon,
        //   scaledSize: new google.maps.Size(70, 70)
        // });

        // setTimeout(() => {
        //   marker.markerInstance.setIcon({
        //     url: currentIcon.url || currentIcon,
        //     scaledSize: currentIcon.scaledSize || new google.maps.Size(50, 50)
        //   });
        // }, 3000);
      }
    }
  }

  async initiateMap() {
    this.map = new google.maps.Map(
      document.getElementById('map_canvas'),
      this.mapOptions
    );
    this.placeMarkers();
  }

  setupButtonClickListeners() {
    $('#editButton').click((e: any) => {
      e.preventDefault();
      this.toggleDrawingMode();
    });

    $('#clearButton').click((e: any) => {
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
        this.map.setCenter(marker.getPosition());
        this.map.setZoom(12);
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
      this.again(this.drawFreeHand.bind(this));
      this.disablePageScroll();
    } else {
      this.clearDrawing();
    }
  }

  drawFreeHand() {
    const isTouchable =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchable) {
      this.map.setOptions({ scrollwheel: false });
    }

    const poly = new google.maps.Polyline({
      map: this.map,
      clickable: false,
      strokeColor: '#f3392c',
      strokeOpacity: 0.8,
      strokeWeight: 2,
    });
    const path = poly.getPath();
    this.shapeCoordinates = [];
    this.mapMouseMoveListener = google.maps.event.addListener(
      this.map,
      'mousemove',
      (e: any) => {
        path.push(e.latLng);
        this.shapeCoordinates.push({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      }
    );

    google.maps.event.addListenerOnce(this.map, 'mouseup', () => {
      google.maps.event.removeListener(this.mapMouseMoveListener);
      poly.setMap(null);
      const polygon = new google.maps.Polygon({
        map: this.map,
        path,
        strokeColor: '#f3392c',
        fillColor: '#f3392c',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
      });
      this.drawnShapes.push(polygon);
      google.maps.event.clearListeners(this.map.getDiv(), 'mousedown');
      this.enableMapInteractions();
      this.shapePromise = Promise.resolve(this.shapeCoordinates);
      console.log('Drawn Shape Coordinates:', this.shapeCoordinates);

      const bounds = new google.maps.LatLngBounds();
      this.shapeCoordinates.forEach((coord) => bounds.extend(coord));
      this.map.fitBounds(bounds);
      $('#editButton').hide();
      $('#clearButton').show();
      this.enablePageScroll();
    });
  }

  clearDrawing() {
    this.mapOptions = {
      zoom: 15,
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
    $('#clearButton').hide();
    $('#editButton').show();
    this.drawingMode = false;
    this.enablePageScroll();
  }

  clearShapes() {
    this.drawnShapes.forEach((shape) => shape.setMap(null));
    this.drawnShapes = [];
  }

  again(drawFreeHand: () => void) {
    this.disableMapInteractions();
    google.maps.event.addDomListener(this.map.getDiv(), 'mousedown', (e: any) =>
      drawFreeHand()
    );
  }

  getShapeCoordinates(): Promise<google.maps.LatLngLiteral[]> {
    return this.shapePromise || Promise.resolve([]);
  }

  getBoundsRadius(bounds: any) {
    const r = 6378.8;
    const ne_lat = bounds.getNorthEast().lat() / 57.2958;
    const ne_lng = bounds.getNorthEast().lng() / 57.2958;
    const c_lat = bounds.getCenter().lat() / 57.2958;
    const c_lng = bounds.getCenter().lng() / 57.2958;
    return (
      r *
      Math.acos(
        Math.sin(c_lat) * Math.sin(ne_lat) +
          Math.cos(c_lat) * Math.cos(ne_lat) * Math.cos(ne_lng - c_lng)
      ) *
      1000
    );
  }
  disablePageScroll() {
    document.body.style.overflow = 'hidden';
  }

  enablePageScroll() {
    document.body.style.overflow = 'auto';
  }
}

import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PropertyCardMapComponent } from '../property-card-map/property-card-map.component';
import { CommunityCardMapComponent } from '../community-card-map/community-card-map.component';
import { ResizeService } from '../../Services/resize.service';

declare var google: any;

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-dummy-map',
  templateUrl: './dummy-map.component.html',
  styleUrls: ['./dummy-map.component.scss'],
})
export class DummyMapComponent implements OnInit {
  map: any;
  featureLayer: any;
  poly: any;
  private _center: google.maps.LatLngLiteral = {
    lat: 25.761681,
    lng: -80.191788,
  };
  @Input() set highlighted(data: any) {
    if (data) {
      this.zoomToHighlightedMarker(data);
    }
  }
  @Input() set removeHighlighted(data: any) {
    if (data) {
      this.removeHighlightedMarker(data);
    }
  }
  @Input()
  get center(): google.maps.LatLngLiteral {
    return this._center;
  }

  set center(value: google.maps.LatLngLiteral) {
    if (value) {
      this._center = value;
    }
    if (this.mapOptions) {
      this.mapOptions.center = this._center;
    }
    if (this.map && this._center) {
      this.map.setCenter(this._center);
    }
  }
  infoContentsArray: any[] = [];
  @Input() height: any;
  @Input() community: boolean = false;
  @Output() propertyHover = new EventEmitter<any>();
  @Output() drawCordinates = new EventEmitter<any>();
  @Output() resetDrawCordinates = new EventEmitter<any>();
  @Input() set infoContents(data: any) {
    if (data) {
      this.infoContentsArray = data;
      if (
        (this.markers?.length || this.communityMarkers?.length) &&
        this.infoContentsArray?.length
      ) {
        this.placeMarkers();
      }
    }
  }
  @Input() set markerPositions(data: any[]) {
    if (data) {
      this.markers = data;
      if (this.markers?.length && this.infoContentsArray?.length) {
        this.placeMarkers();
      }
    }
  }
  @Input() set place_id(data: string) {
    if (data) {
      this.placeId = data;
    }
  }
  @Input() set communityMarkerPositions(data: any[]) {
    if (data) {
      this.communityMarkers = data;
      if (this.communityMarkers?.length && this.infoContentsArray?.length) {
        this.placeMarkers();
      }
    }
  }
  @Input() set highlightedAreaCoordinates(coordinates: any[]) {
    if (coordinates) {
      this.setHighlightedArea();
    }
  }
  placeId: string = '';
  markers: any[] = [];
  communityMarkers: any[] = [];
  originalMarkers: any[] = [];
  googleMarkers: any[] = [];
  highlightedArea: any;
  faEdit = faEdit;
  faTrash = faTrash;
  drawing: boolean = false;
  @Input() disabled: boolean = false;
  private currentInfoWindow: google.maps.InfoWindow | null = null;
  mapOptions: any = {
    zoom: 13,
    center: this._center,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapId: 'a6d3d2caf60f2217',
    gestureHandling: 'greedy',
    draggable: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    public resize: ResizeService
  ) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  disablePageScroll() {
    document.body.style.overflow = 'hidden';
  }

  enablePageScroll() {
    document.body.style.overflow = 'auto';
  }

  drawFreeHand(): void {
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
      const coordinates = path.getArray().map((latLng: any) => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }));
      this.drawCordinates.emit(JSON.stringify(coordinates));
      this.poly.setMap(null);
      this.poly = new google.maps.Polygon({ map: this.map, path: path });
      google.maps.event.clearListeners(this.map.getDiv(), 'mousedown');
      google.maps.event.clearListeners(this.map.getDiv(), 'touchstart');
      this.enable();
    });
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

  clearShapes(): void {
    if (this.poly) {
      this.poly.setMap(null);
      this.poly = null;
      this.resetDrawCordinates.emit(true);
    } else {
      this.resetDrawCordinates.emit(false);
      this.placeMarkers();
    }
    this.enable();
    this.drawing = false;
  }

  initializeMap(): void {
    this.map = new google.maps.Map(document.getElementById('map_canvas'));
    this.map.setOptions(this.mapOptions);
    document.getElementById('drawpoly').addEventListener('click', (e) => {
      e.preventDefault();
      this.disable();
      this.drawing = true;
      this.clearMarkers();
      google.maps.event.addDomListener(
        this.map.getDiv(),
        'mousedown',
        (e: any) => {
          this.drawFreeHand();
        }
      );

      google.maps.event.addDomListener(
        this.map.getDiv(),
        'touchstart',
        (e: any) => {
          this.drawFreeHand();
        }
      );
    });

    document.getElementById('clearButton').addEventListener('click', (e) => {
      e.preventDefault();
      this.clearShapes();
    });
    this.featureLayer = this.map.getFeatureLayer('LOCALITY');
    this.placeMarkers();
  }
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

        const currentIcon = marker.markerInstance.getIcon();

        marker.markerInstance.setIcon({
          url: currentIcon.url || currentIcon,
          scaledSize: new google.maps.Size(55, 55),
        });
      }
    }
  }
  removeHighlightedMarker(highlighted: any) {
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
        const currentIcon = marker.markerInstance.getIcon();
        marker.markerInstance.setIcon({
          url: currentIcon.url || currentIcon,
          scaledSize: new google.maps.Size(40, 40),
        });
      }
    }
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
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(40, 40),
        },
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
          this.infoContentsArray[index]?.listingId ||
            this.infoContentsArray[index]?.id
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
    console.log(this.infoContentsArray[index], index);
    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef: any = factory.create(this.injector);
    componentRef.instance.card = this.infoContentsArray[index];
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

  setHighlightedArea(): void {
    console.log(this.placeId);
    const featureStyleOptions = {
      strokeColor: '#810FCB',
      strokeOpacity: 1.0,
      strokeWeight: 3.0,
      fillColor: '#810FCB',
      fillOpacity: 0.5,
    };
    //@ts-ignore
    this.featureLayer.style = (options) => {
      if (options.feature.placeId == this.placeId) {
        return featureStyleOptions;
      }
    };
  }
}

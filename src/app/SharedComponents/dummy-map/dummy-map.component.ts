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
  infoContentsArray: any[] = [];
  types: any = ['LOCALITY'];
  @Input() height: any;
  @Input() community: boolean = false;
  @Output() propertyHover = new EventEmitter<any>();
  @Output() drawCordinates = new EventEmitter<any>();
  @Output() resetDrawCordinates = new EventEmitter<any>();
  @Input() set infoContents(data: any) {
    this.infoContentsArray = data;
    if (
      (this.markers?.length || this.communityMarkers?.length) &&
      this.infoContentsArray?.length
    ) {
      this.placeMarkers();
    }
  }
  @Input() set markerPositions(data: any[]) {
    this.markers = data;
    console.log(data, 'data')
    if (this.markers?.length && this.infoContentsArray?.length) {
      this.placeMarkers();
    } else {
      this.clearMarkers();
    }
  }
  @Input() set place_id(data: string) {
    if (data) {
      this.placeId = data;
    }
  }
  @Input() set communityMarkerPositions(data: any[]) {
    this.communityMarkers = data;
    if (this.communityMarkers?.length && this.infoContentsArray?.length) {
      this.placeMarkers();
    } else {
      this.clearMarkers();
    }
  }
  @Input() set placeTypes(data: any[]) {
    this.types = data;
    if (this.map) {
      this.types.map((item: any) => {
        this.setFeaturLayer(item);
      });
    }
  }
  @Input() set setPolygon(data: any[]) {
    if (this.map) {
      this.setPolygonOnMap(data);
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
    zoom: 14,
    center: this._center,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapId: '4d9b0fd688ab8d67',
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
    // document.body.style.overflow = 'hidden';
  }

  enablePageScroll() {
    // document.body.style.overflow = 'auto';
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
    const styledMapType = new google.maps.StyledMapType(
      [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'administrative.land_parcel',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'transit.station',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi.business',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi.government',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi.school',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi.sports_complex',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi.park',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi.attraction',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi.medical',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi.place_of_worship',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi.cafe',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi.restaurant',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi.bar',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi.night_club',
          stylers: [{ visibility: 'off' }],
        },
      ],
      { name: 'Styled Map' }
    );

    this.map = new google.maps.Map(document.getElementById('map_canvas'));
    this.map.mapTypes.set('styled_map', styledMapType);
    this.map.setMapTypeId('styled_map');
    this.map.setOptions(this.mapOptions);
    this.types.map((item: any) => {
      this.setFeaturLayer(item);
    });
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
    this.poly = new google.maps.Polyline({ map: this.map, clickable: false });
    this.placeMarkers();
  }
  setFeaturLayer(featureName) {
    if (
      (this.map && featureName.toLowerCase().includes('locality')) ||
      featureName.toLowerCase().includes('country') ||
      featureName.toLowerCase().includes('postal') ||
      featureName.toLowerCase().includes('school') ||
      featureName.toLowerCase().includes('administrative')
    ) {
      this.featureLayer = this.map.getFeatureLayer(featureName.toUpperCase());
    }
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
    if (this.markers?.length) {
      this.createMarkers(this.markers, '/assets/img/solid-map-icon.svg');
    }
    if (this.communityMarkers?.length) {
      this.createMarkers(this.communityMarkers, '/assets/img/markerC.webp');
    }
  }

  async createMarkers(markerDataArray: any[], iconUrl: string) {
    await markerDataArray.forEach((markerData, index) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerData.lat, markerData.lng),
        map: this.map,
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(40, 40), // Marker size
        },
      });
  
      const priceLabel = new google.maps.OverlayView();
  
      priceLabel.onAdd = function () {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.transform = 'translate(-50%, 0)'; // Center the label horizontally
        div.style.backgroundColor = 'white';
        div.style.padding = '2px 5px';
        div.style.borderRadius = '3px';
        div.style.boxShadow = '0px 2px 6px rgba(0,0,0,0.3)';
        div.style.fontSize = '14px';
        div.style.fontWeight = 'bold';
        div.style.color = '#000';
        div.classList.add('markerPrice')
        div.innerText = `$${markerData.price}`;
        this.div = div;
  
        const panes = this.getPanes();
        panes.floatPane.appendChild(div);
      };
  
      priceLabel.draw = function () {
        const position = this.getProjection().fromLatLngToDivPixel(marker.getPosition() as google.maps.LatLng);
        if (position) {
          this.div.style.left = position.x + 'px';
          this.div.style.top = position.y + '50px'; // Adjust as needed
        }
      };
  
      priceLabel.onRemove = function () {
        this.div.parentNode!.removeChild(this.div);
      };
  
      priceLabel.setMap(this.map);

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
        this.map.setZoom(14);
      });
      markerData.infoWindowInstance = infoWindow;
  
      // Store marker and priceLabel references if needed
      markerData.markerInstance = marker;
      markerData.priceLabelInstance = priceLabel;
      this.googleMarkers.push(marker);
    });
  }
  

  createInfoWindowContent(index: number): HTMLElement {
    const component: any = this.community
      ? CommunityCardMapComponent
      : PropertyCardMapComponent;
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
    const elements = document.querySelectorAll('.markerPrice');
    elements.forEach(element => {
      element.remove();
    });
  }

  // setHighlightedArea(): void {
  //   if (this.map) {
  //     const featureStyleOptions = {
  //       strokeColor: '#ff3932',
  //       strokeOpacity: 1,
  //       strokeWeight: 1.5,
  //       fillColor: '#ff3932',
  //       fillOpacity: 0.1,
  //     };
  //     if (this.featureLayer) {
  //       //@ts-ignore
  //       this.featureLayer.style = (options) => {
  //         console.log(
  //           options.feature.placeId,
  //           this.placeId,
  //           options.feature.placeId == this.placeId
  //         );

  //         if (options.feature.placeId == this.placeId) {
  //           return featureStyleOptions;
  //         }
  //       };
  //       this.map.data.setStyle(this.featureLayer.style);
  //     }
  //   }
  // }
  // removeHighlightArea() {
  //   this.featureLayer.style = (options: { feature: { placeId: string } }) => {
  //     return null;
  //   };
  // }
  drawPolygonWithCoordinates(coordinates: google.maps.LatLngLiteral[]): void {
    this.poly.setMap(null);
    this.poly = new google.maps.Polygon({
      paths: coordinates,
      strokeColor: '#ff3932',
      strokeOpacity: 0.5,
      strokeWeight: 1,
      fillColor: '#ff3932',
      fillOpacity: 0.1,
    });
    this.poly.setMap(this.map);
  }
  async setPolygonOnMap(coordinates) {
    console.log(coordinates);
    this.drawPolygonWithCoordinates(coordinates);
  }
}

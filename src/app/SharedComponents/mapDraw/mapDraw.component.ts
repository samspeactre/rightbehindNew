import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, ViewContainerRef, ComponentFactoryResolver, Injector, ApplicationRef } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { HelperService } from '../../Services/helper.service';
import { PropertyCardMapComponent } from '../property-card-map/property-card-map.component';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
declare const google: any;
declare var $: any;

@Component({
  selector: 'app-map-draw',
  standalone: true,
  imports: [GoogleMapsModule, GoogleMap, MapInfoWindow, MapMarker, CommonModule, PropertyCardMapComponent, FontAwesomeModule],
  templateUrl: './mapDraw.component.html',
  styleUrls: ['./mapDraw.component.scss']
})
export class MapDrawComponent {
  markers: any
  @Input() center: google.maps.LatLngLiteral = { lat: 25.761681, lng: -80.191788 };
  // @Input() markerPositions: any = [];
  @Input() set markerPositions(data: any) {
    if (data) {
      this.markers = data;
    }
  }
  @Input() infoContents: any = [];
  faEdit = faEdit;
  faTrash = faTrash;
  googleMarkers: any;
  markerCluster: any;
  oldMarkers: any;
  shapeCoordinates: any = [];
  cordinatesArray: any = [];
  shapePromise: any;
  map: any;
  mapOptions: any = {
    zoom: 10,
    center: { lat: 25.761681, lng: -80.191788 },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  mapLoader: boolean = true;
  apiLoaded: any;

  constructor(
    private cd: ChangeDetectorRef,
    private helper: HelperService,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) { }

  async ngOnInit() {
    await this.initiateMap();
  }

  getBoundsRadius = (bounds: any) => {
    var r = 6378.8;
    var ne_lat = bounds.getNorthEast().lat() / 57.2958;
    var ne_lng = bounds.getNorthEast().lng() / 57.2958;
    var c_lat = bounds.getCenter().lat() / 57.2958;
    var c_lng = bounds.getCenter().lng() / 57.2958;
    var r_km =
      r *
      Math.acos(
        Math.sin(c_lat) * Math.sin(ne_lat) +
        Math.cos(c_lat) * Math.cos(ne_lat) * Math.cos(ne_lng - c_lng)
      );
    return r_km * 1000;
  };

  async initiateMap() {
    this.mapLoader = false;
    let shapeCreated: boolean = false;
    let poly: any;
    const drawFreeHand = () => {
      poly = new google.maps.Polyline({ map: this.map, clickable: false });
      const path = poly.getPath();
      this.shapeCoordinates = [];
      this.cordinatesArray = [];
      const move = google.maps.event.addListener(this.map, 'mousemove', (e: any) => {
        path.push(e.latLng);
        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();
        this.shapeCoordinates.push({ lat: lat, lng: lng });
        this.cordinatesArray.push({ lat: lat, long: lng });
      });

      google.maps.event.addListenerOnce(this.map, 'mouseup', (e: any) => {
        google.maps.event.removeListener(move);
        poly.setMap(null);
        poly = new google.maps.Polygon({ map: this.map, path: path });
        google.maps.event.clearListeners(this.map.getDiv(), 'mousedown');
        this.enable();
        this.shapePromise = Promise.resolve(this.shapeCoordinates);
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < this.shapeCoordinates.length; i++) {
          bounds.extend(this.shapeCoordinates[i]);
        }
        this.map.fitBounds(bounds);
        let data = {
          cor: { lat: bounds.getCenter().lat(), lng: bounds.getCenter().lng(), radius: this.getBoundsRadius(bounds) },
          poly: this.cordinatesArray
        };
        $('#drawpoly button').css('display', 'block');
        $('#clearButton').css('display', 'block');
        shapeCreated = true;
      });
    };

    this.map = new google.maps.Map(
      document.getElementById('map_canvas'),
      this.mapOptions
    );
    this.placeMarkers();
    $('#drawpoly button').click(async (e: any) => {
      this.markers?.forEach((markerData: any) => {
        markerData.markerInstance.setMap(null);
      });
      this.googleMarkers = [];
      $('#drawpoly button').css('display', 'none');
      e.preventDefault();
      if (shapeCreated) {
        this.markers = [];
        this.removeMarkers();
        poly?.setMap(null);
        this.enable();
        shapeCreated = false;
        this.again(drawFreeHand);
        this.oldMarkers = this.markers;
      } else {
        this.again(drawFreeHand);
      }
    });

    $('#clearButton').click(async (e: any) => {
      this.mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(
          this.markers?.[0]?.lat || 25.761681,
          this.markers?.[0]?.lng || -80.191788
        ),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      e.preventDefault();
      poly.setMap(null);
      google.maps.event.clearListeners(this.map.getDiv(), 'mousedown');
      this.enable();
      $('#clearButton').css('display', 'none');
      $('#editButton').css('display', 'block');
    });
  }

  placeMarkers() {
    this.removeMarkers();
    this.googleMarkers = [];
    if (this.markers && this.markers?.length > 0) {
      for (let i = 0; i < this.markers?.length; i++) {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            this.markers[i].lat,
            this.markers[i].lng
          ),
          map: this.map,
        });

        const infoWindowContent = this.createInfoWindowContent(i);
        const infoWindow = new google.maps.InfoWindow({
          content: infoWindowContent,
        });

        marker.addListener('click', () => {
          this.closeInfoWindows();
          infoWindow.open(this.map, marker);
          this.map.setCenter(marker.getPosition());
          this.map.setZoom(12);
        });
        this.markers[i].markerInstance = marker;
        this.markers[i].infoWindowInstance = infoWindow;
        this.googleMarkers.push(marker);
      }
    }
  }

  createInfoWindowContent(index: number): HTMLElement {
    const factory = this.resolver.resolveComponentFactory(PropertyCardMapComponent);
    const componentRef: any = factory.create(this.injector);
    componentRef.instance.card = this.infoContents[index];
    componentRef.instance.loader = false;
    componentRef.instance.routeDirect = true;
    this.appRef.attachView(componentRef.hostView);
    const div = document.createElement('div');
    div.appendChild(componentRef.location.nativeElement);
    return div;
  }

  removeMarkers() {
    if (this.markers && this.markers?.length > 0) {
      for (let i = 0; i < this.markers?.length; i++) {
        if (this.markers[i].markerInstance) {
          this.markers[i].markerInstance.setMap(null);
        }
      }
    }
  }

  disable() {
    this.map.setOptions({
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: false,
      draggableCursor: 'crosshair',
    });
  }

  enable() {
    this.map.setOptions({
      draggable: true,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
      draggableCursor: 'default',
    });
  }

  closeInfoWindows() {
    if (this.markers && this.markers?.length > 0) {
      for (let i = 0; i < this.markers?.length; i++) {
        if (this.markers[i].infoWindowInstance) {
          this.markers[i].infoWindowInstance.close();
        }
      }
    }
  }

  again(drawFreeHand: any) {
    this.disable();
    google.maps.event.addDomListener(
      this.map.getDiv(),
      'mousedown',
      (e: any) => {
        drawFreeHand();
      }
    );
  }

  getShapeCoordinates(): Promise<google.maps.LatLng[]> {
    return this.shapePromise || Promise.resolve([]);
  }
}

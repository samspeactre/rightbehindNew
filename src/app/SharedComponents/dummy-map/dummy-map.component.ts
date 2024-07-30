// dummy-map.component.ts
import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  standalone: true,
  selector: 'app-dummy-map',
  templateUrl: './dummy-map.component.html',
  styleUrls: ['./dummy-map.component.scss'],
})
export class DummyMapComponent implements OnInit {
  map: any;
  poly: any;

  constructor() {}

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
        e.preventDefault(); // Prevent default scrolling
        this.poly.getPath().push(e.latLng);
      }
    );

    google.maps.event.addListenerOnce(this.map, 'mouseup', (e: any) => {
      google.maps.event.removeListener(move);
      google.maps.event.removeListener(touchMove);
      const path = this.poly.getPath();
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

  initializeMap(): void {
    const mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(52.5498783, 13.425209099999961),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(
      document.getElementById('map_canvas'),
      mapOptions
    );

    document.getElementById('drawpoly').addEventListener('click', (e) => {
      e.preventDefault();
      this.disable();

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
  }
}

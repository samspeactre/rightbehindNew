import { Injectable } from '@angular/core';
declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class MapService {
  // Define the color for the highlighted area
  private readonly HIGHLIGHT_COLOR = '#FF0000';

  constructor() {}

  // Method to draw a polygon on the map
  drawPolygon(
    map: google.maps.Map,
    coordinates: google.maps.LatLngLiteral[]
  ): google.maps.Polygon {
    const polygon = new google.maps.Polygon({
      paths: coordinates,
      strokeColor: this.HIGHLIGHT_COLOR,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: this.HIGHLIGHT_COLOR,
      fillOpacity: 0.35,
      map,
    });
    return polygon;
  }

  // Method to clear a specific polygon from the map
  clearPolygon(polygon: google.maps.Polygon) {
    polygon.setMap(null);
  }

  // Method to fit the map bounds to the polygon
  fitBoundsToPolygon(
    map: google.maps.Map,
    coordinates: google.maps.LatLngLiteral[]
  ) {
    const bounds = new google.maps.LatLngBounds();
    coordinates.forEach((coord) => bounds.extend(coord));
    map.fitBounds(bounds);
  }
}

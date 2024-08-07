import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { addCurrenLocation } from '../Ngrx/data.action';
import { key } from '../SharedComponents/map/map.component';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiKey = key;

  constructor(private store: Store, private http: HttpClient) {}

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          if (result.state === 'granted') {
            this.getLocation(resolve, reject);
          } else if (result.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                if (position) {
                  this.getLocation(resolve, reject);
                }
              },
              (error) => {
                console.error(error);
                reject(error);
              }
            );
          } else {
            reject('Geolocation permission denied.');
          }
        });
      } else {
        reject('Geolocation permissions API is not supported by this browser.');
      }
    });
  }

  private getLocation(
    resolve: (location: { lat: number; lng: number }) => void,
    reject: (reason?: any) => void
  ) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.reverseGeocode(location.lat, location.lng)
            .then((placeName: any) => {
              const locationData = {
                ...location,
                placeName: placeName?.formatted_address,
                placeId: placeName?.place_id,
              };
              this.store.dispatch(addCurrenLocation({ data: locationData }));
              resolve(locationData);
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        }
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  }

  private reverseGeocode(lat: number, lng: number): Promise<string> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`;
    return this.http
      .get<any>(url)
      .toPromise()
      .then((response) => {
        if (response.status === 'OK' && response.results.length > 0) {
          return response.results[0];
        } else {
          throw new Error('No address found');
        }
      });
  }
}

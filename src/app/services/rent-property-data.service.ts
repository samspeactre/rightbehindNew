// src/app/property.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private propertyData: any = {};

  setPropertyData(data: any) {
    this.propertyData = data;
  }

  getPropertyData() {
    return this.propertyData;
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { HttpService } from './http.service';
export const types = [
  { name: 'Apartments', value: 1 },
  { name: 'Houses', value: 2 },
  { name: 'Condos', value: 3 },
  { name: 'Townhomes', value: 4 },
  { name: 'Rooms', value: 5 },
];
export const assetUrl = 'https://recursing-allen.74-208-96-50.plesk.page';
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private destroy$ = new Subject<void>();
  constructor(private http: HttpService) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  detectBrowserName() {
    const userAgent = navigator.userAgent;
    if (/Edg\/\d+/.test(userAgent)) {
      return 'Microsoft Edge';
    }

    if (/MSIE/i.test(userAgent) || /Trident/i.test(userAgent)) {
      return 'Internet Explorer';
    }

    if (/Opera/i.test(userAgent) || /OPR/i.test(userAgent)) {
      return 'Opera';
    }

    if (/Chrome/i.test(userAgent)) {
      return 'Google Chrome';
    }

    if (/Firefox/i.test(userAgent)) {
      return 'Mozilla Firefox';
    }

    if (/Safari/i.test(userAgent)) {
      return 'Apple Safari';
    }

    return 'Unknown';
  }
  appendLink(href: string) {
    const linkAvailable = document.querySelector(`link[href="${href}"]`);
    if (!linkAvailable) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }
  removeLink(href: string) {
    const link = document.querySelector(`link[href="${href}"]`);
    if (link) {
      link.remove();
    }
  }
  returnType(id: number) {
    const type = types.find((type: any) => type?.value == id);
    return type?.name;
  }
  createContact(propertyId: number): Observable<any> {
    const data = {
      propertyId: propertyId,
    };
    return this.http.loaderPost('ChatContact/create', data, true).pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );
  }
}

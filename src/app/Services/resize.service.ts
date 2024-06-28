// resize.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  private windowSizeSubject = new BehaviorSubject<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  windowSize$ = this.windowSizeSubject.asObservable();

  onResize() {
    this.windowSizeSubject.next({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  get isWidthGreaterThan1024(): Observable<boolean> {
    return this.windowSize$.pipe(
      map((size:any) => size.width > 1024)
    );
  }
}

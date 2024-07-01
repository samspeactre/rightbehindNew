import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarElement = new Subject<ElementRef>();
  sidebarElement$ = this.sidebarElement.asObservable();

  setSidebarElement(element: ElementRef) {
    this.sidebarElement.next(element);
  }
}

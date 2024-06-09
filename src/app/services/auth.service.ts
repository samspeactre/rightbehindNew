import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logoutSubject = new Subject<void>();

  logout() {
    this.logoutSubject.next();
  }

  getLogoutObservable() {
    return this.logoutSubject.asObservable();
  }
}
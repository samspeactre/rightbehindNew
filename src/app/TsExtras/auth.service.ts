import { Injectable } from '@angular/core';
import { Observable, Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { addUserData } from '../Ngrx/data.action';
import { HttpService } from '../Services/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private destroy$ = new Subject<void>();
  constructor(private http: HttpService, private store: Store) { }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private logoutSubject = new Subject<void>();

  logout() {
    this.logoutSubject.next();
  }

  getLogoutObservable() {
    return this.logoutSubject.asObservable();
  }
  register(registerForm: any): Observable<any> {
    return this.http.loaderPost('Account/signup', registerForm, false).pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    );
  }

  login(loginData:any): Observable<any> {
    const data = {
      email: loginData?.email,
      password: loginData?.password
    };
    return this.http.loaderPost('Account/login', data, false).pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    );
  }

  handleLoginResponse(response: any): void {
    this.store.dispatch(addUserData({ user: response?.model }));
  }
}
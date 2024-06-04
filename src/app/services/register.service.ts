import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    console.log('user data:', user);
    user.userAccountTypeId = 2;
    return this.http.post('https://stgapiv2.mentoga.com/api/Account/signup/v2', user);
  }
}

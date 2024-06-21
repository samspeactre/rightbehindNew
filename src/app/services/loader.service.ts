import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
public static loader:Subject <any> =new Subject <any>();
public static dashboardHeight:Subject <any> =new Subject <any>();
  constructor() { }
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  detectBrowserName() {
    const userAgent = navigator.userAgent;
    if (/Edg\/\d+/.test(userAgent)) {
      return "Microsoft Edge";
    }

    if (/MSIE/i.test(userAgent) || /Trident/i.test(userAgent)) {
      return "Internet Explorer";
    }

    if (/Opera/i.test(userAgent) || /OPR/i.test(userAgent)) {
      return "Opera";
    }

    if (/Chrome/i.test(userAgent)) {
      return "Google Chrome";
    }

    if (/Firefox/i.test(userAgent)) {
      return "Mozilla Firefox";
    }

    if (/Safari/i.test(userAgent)) {
      return "Apple Safari";
    }

    return "Unknown";
  }
}

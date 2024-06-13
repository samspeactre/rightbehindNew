import { Injectable } from '@angular/core';
export const types = [
  { name: 'Apartments', value: 1 },
  { name: 'Houses', value: 2 },
  { name: 'Condos', value: 3 },
  { name: 'Townhomes', value: 4 },
  { name: 'Rooms', value: 5 }
];
export const assetUrl = 'https://recursing-allen.74-208-96-50.plesk.page'
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
  appendScript(src: string): void {
    const scriptAvailable = document.querySelector(`script[src="${src}"]`);
    if (!scriptAvailable) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      document.body.appendChild(script);
    }
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
  removeScript(src: string): void {
    const script = document.querySelector(`script[src="${src}"]`);
    if (script) {
      script.remove();
    }
  }
  removeLink(href: string) {
    const link = document.querySelector(`link[href="${href}"]`);
    if (link) {
      link.remove();
    }
  }
  returnType(id: number) {
    const type = types.find((type: any) => type?.value == id)
    return type?.name
  }
}

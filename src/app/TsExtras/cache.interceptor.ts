import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Check if the request is a GET request
    if (req.method === 'GET') {
      // Check if the request has the 'clearCache' parameter
      const clearCache = req.params.get('clearCache') === 'true';
      // If 'clearCache' is true, remove the cached response for this request
      if (clearCache) {
        this.clearCacheForUrl(req.urlWithParams);
      }
      // Generate a unique key for the request based on the URL and method
      const cacheKey = req.urlWithParams;

      // Check if the response is already cached
      const cachedResponse = this.cache.get(cacheKey);
      if (cachedResponse) {
        return of(cachedResponse.clone());
      }
      // If not cached, make the request and cache the response
      return next.handle(req).pipe(
        switchMap((event) => {
          if (event instanceof HttpResponse) {
            this.cache.set(cacheKey, event.clone());
          }
          return of(event);
        }),
        // Listen for logout events and clear the cache
        tap(() => {
          this.authService.getLogoutObservable().subscribe(() => {
            this.cache.clear();
          });
        }),
      );
    } else {
      return next.handle(req);
    }
  }

  clearCacheForUrl(url: string): void {
    if (this.cache.has(url)) {
      this.cache.delete(url);
    }
  }
}
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { selectUser } from '../Ngrx/data.reducer';
import { LoaderService } from './loader.service';
export const baseUrl = 'https://recursing-allen.74-208-96-50.plesk.page/api/'
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  user$ = this.store.select(selectUser);
  userDetails: any;
  private destroy$ = new Subject<void>();
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private store: Store,
    private loaderService: LoaderService
  ) {
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((user) => {
        this.userDetails = user;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }
  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  get headerToken() {
    const token = this.userDetails?.token;
    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      }),
    };
  }
  loaderPost(link: string, data: any, token: boolean, toaster: boolean = true, loader: boolean = true) {
    if (loader) {
      LoaderService.loader.next(true);
    }
    return this.http
      .post(
        baseUrl + link,
        data,
        token ? this.headerToken : this.header,
      )
      .pipe(
        tap((res: any) => {
          if (toaster) {
            if (res?.userMessage) {
              this.toastr.success(res.userMessage);
            } else if (res?.successMessage) {
              this.toastr.success(res.successMessage);
            } else if (res?.errorMessage) {
              this.toastr.error(res.errorMessage);
            }
          }
          if (loader) {
            LoaderService.loader.next(false);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (loader) {
            LoaderService.loader.next(false);
          }
          if (toaster) {
            this.errorShown(error)
          }
          return throwError(error.message || 'Server error');
        }),
      );
  }
  loaderGet(url: string, token: boolean, clearCache: boolean = false, toastr: boolean = false, loader: boolean = true) {
    if (loader) {
      LoaderService.loader.next(true);
    }
    const CACHE_SIZE = 1;
    const params = clearCache
      ? new HttpParams().set('clearCache', 'true')
      : undefined;
    const headers = token ? this.headerToken : this.header;
    return this.http.get(baseUrl + url, { ...headers, params }).pipe(
      shareReplay({ refCount: true, bufferSize: CACHE_SIZE }),
      tap((res: any) => {
        if (toastr) {
          if (res?.userMessage || res?.successMessage) {
            this.toastr.success(res?.userMessage || res?.successMessage);
          }
        }
        if (loader) {
          LoaderService.loader.next(false);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (toastr && error) {
          this.errorShown(error)
        }
        if (loader) {
          LoaderService.loader.next(false);
        }
        return throwError(error.message || 'Server error');
      }),
    );
  }
  get(url: string, token: boolean, clearCache: boolean = false, toaster: boolean = false) {
    const CACHE_SIZE = 1;
    const params = clearCache
      ? new HttpParams().set('clearCache', 'true')
      : undefined;
    const headers = token ? this.headerToken : this.header;
    return this.http.get(baseUrl + url, { ...headers, params }).pipe(
      shareReplay({ refCount: true, bufferSize: CACHE_SIZE }),
      tap((res: any) => {
        // if (res?.message || res?.messsage) {
        //   this.toastr.success(res?.message ? res?.message : res?.messsage);
        // }
      }),
      catchError((error: HttpErrorResponse) => {
        if (toaster) {
          this.errorShown(error)
        }
        return throwError(error || 'Server error');
      }),
    );
  }
  post(link: string, data: any, token: boolean, toaster: boolean) {
    return this.http
      .post(
        baseUrl + link,
        data,
        token ? this.headerToken : this.header,
      )
      .pipe(
        tap((res: any) => {
          if (toaster) {
            if (res?.userMessage) {
              this.toastr.success(res.userMessage);
            } else if (res?.successMessage) {
              this.toastr.success(res.successMessage);
            } else if (res?.errorMessage) {
              this.toastr.error(res.errorMessage);
            }
          }
        }),
        catchError((error: HttpErrorResponse) => {
          LoaderService.loader.next(false);
          if (toaster) {
            this.errorShown(error)
          }
          return throwError(error || 'Server error');
        }),
      );
  }
  errorShown(error: any) {
    if (error?.error?.length) {
      error?.error?.map((err: any) => {
        if (err?.userMessage) {
          this.toastr.error(err?.userMessage);
        }
      });
    } else if (error?.error?.userMessage) {
      this.toastr.error(error?.error?.userMessage);
    } else if (error?.error?.errors) {
      for (const key in error?.error?.errors) {
        if (error?.error?.errors[key]?.length) {
          this.toastr.error(error?.error?.errors[key][0]);
        }
      }
    }
  }
}

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
import { toggleLoader } from '../Ngrx/data.action';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  user$ = this.store.select(selectUser);
  userDetails: any;
  private destroy$ = new Subject<void>();
  url:string = 'https://stgapiv2.mentoga.com/api/'
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private store: Store,
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
  loaderPost(link: string, data: any, token: boolean, toaster: boolean, loader:boolean = true) {
    if(loader){
      this.store.dispatch(toggleLoader({ show: true }));
    }
    return this.http
      .post(
        this.url + link,
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
          if (toaster) {
            if(loader){
              this.store.dispatch(toggleLoader({ show: false }));
            }
            this.errorShown(error)
          }
          return throwError(error.message || 'Server error');
        }),
      );
  }
  loaderGet(url: string, token: boolean, toastr: boolean = false, loader:boolean = true) {
    if(loader){
      this.store.dispatch(toggleLoader({ show: true }));       
    }
    const headers = token ? this.headerToken : this.header;
    return this.http.get(this.url + url, headers ).pipe(
      shareReplay({ refCount: true }),
      tap((res: any) => {
        if (toastr) {
          this.toastr.success(res?.userMessage || res?.successMessage);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (toastr) {
          this.toastr.error(error?.error?.userMessage || error?.error?.errorMessage);
        }
        if(loader){
          this.store.dispatch(toggleLoader({ show: false }));   
        }
        this.errorShown(error)
        return throwError(error.message || 'Server error');
      }),
    );
  }
  get(url: string, token: boolean, clearCache: boolean) {
    const headers = token ? this.headerToken : this.header;
    return this.http.get(this.url + url, headers).pipe(
      shareReplay({ refCount: true }),
      tap((res: any) => {
        // if (res?.message || res?.messsage) {
        //   this.toastr.success(res?.message ? res?.message : res?.messsage);
        // }
      }),
      catchError((error: HttpErrorResponse) => {
        this.store.dispatch(toggleLoader({ show: false }));
        return throwError(error || 'Server error');
      }),
    );
  }
  post(link: string, data: any, token: boolean, toaster: boolean) {
    return this.http
      .post(
        this.url + link,
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
          this.store.dispatch(toggleLoader({ show: false }));
          if (toaster) {
            this.errorShown(error)
          }
          return throwError(error || 'Server error');
        }),
      );
  }
  errorShown(error:any){
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

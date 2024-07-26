import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { addRental, addSell } from './Ngrx/data.action';
import { RentalReducer, SellReducer, userReducer } from './Ngrx/data.reducer';
import { CacheInterceptor } from './TsExtras/cache.interceptor';
import { routes } from './app.routes';
import { StarRatingModule } from 'angular-star-rating';
import { AuthInterceptor } from './TsExtras/auth.interceptor';
const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
};
const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

const initializeApp = (httpClient: HttpClient, store: Store): (() => Observable<any>) => {
  return () => {
    return new Observable((observer) => {
      httpClient.get('https://recursing-allen.74-208-96-50.plesk.page/api/Property/get?pageNo=7&pageSize=10&type=2').pipe(
        tap((response: any) => {
          if (response?.model?.properties) {
            const properties = response.model.properties;
            store.dispatch(addRental({ data: properties }));
          }
        })
      ).subscribe({
        complete: () => {
          observer.next();
          observer.complete();
          // httpClient.get('https://recursing-allen.74-208-96-50.plesk.page/api/Property/get?pageNo=1&pageSize=10&type=1').pipe(
          //   tap((response: any) => {
          //     if (response?.model?.properties) {
          //       const properties = response.model.properties;
          //       store.dispatch(addSell({ data: properties }));
          //     }
          //   })
          // ).subscribe();
        }
      });
    });
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    provideRouter(routes, inMemoryScrollingFeature, withPreloading(QuicklinkStrategy)),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [HttpClient, Store],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    importProvidersFrom(
      QuicklinkModule,
      StoreModule.forRoot({
        user: userReducer,
        rent: RentalReducer,
        sell: SellReducer
      }),
      StarRatingModule.forRoot(),
      ToastrModule.forRoot({
        timeOut: 2000,
        positionClass: 'toast-bottom-left',
        maxOpened: 1,
        autoDismiss: true,
        preventDuplicates: true,
        includeTitleDuplicates: true,
      })
    ),
  ],
};

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { ToastrModule } from 'ngx-toastr';
import {
  RentalReducer,
  SellReducer,
  popupStateReducer,
  searchStateReducer,
  sideBarReducer,
  userReducer,
} from './Ngrx/data.reducer';
import { routes } from './app.routes';
import { CacheInterceptor } from './TsExtras/cache.interceptor';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
};
const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);
export const appConfig: ApplicationConfig = {
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    provideRouter(
      routes,
      inMemoryScrollingFeature,
      withPreloading(QuicklinkStrategy)
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
    importProvidersFrom(
      QuicklinkModule,
      StoreModule.forRoot({
        user: userReducer,
        rent:RentalReducer,
        sell:SellReducer,
        search: searchStateReducer,
        popup: popupStateReducer,
        sideBar: sideBarReducer,
      }),
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

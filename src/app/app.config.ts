import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { ToastrModule } from 'ngx-toastr';
import {
  LoaderReducer,
  popupStateReducer,
  searchStateReducer,
  sideBarReducer,
  userReducer,
} from './Ngrx/data.reducer';
import { routes } from './app.routes';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
};
const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      inMemoryScrollingFeature,
      withPreloading(QuicklinkStrategy)
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    importProvidersFrom(
      QuicklinkModule,
      StoreModule.forRoot({
        user: userReducer,
        loader: LoaderReducer,
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

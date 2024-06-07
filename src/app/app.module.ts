import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import {
  LoaderReducer,
  popupStateReducer,
  searchStateReducer,
  userReducer,
} from './Ngrx/data.reducer';
import { LoadingComponent } from './SharedComponents/loaders/loading/loading.component';
import { FileSizePipe } from './TsExtras/file-size.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './SharedComponents/footer/footer.component';
import { NavbarComponent } from './SharedComponents/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FileSizePipe, AppComponent],
  imports: [
    LoadingComponent,
    FooterComponent,
    NavbarComponent,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      user: userReducer,
      loader: LoaderReducer,
      search: searchStateReducer,
      popup: popupStateReducer,
    }),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      maxOpened: 1,
      autoDismiss: true,
      preventDuplicates: true,
      includeTitleDuplicates: true,
    }),
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import {
  LoaderReducer,
  searchStateReducer,
  userReducer,
} from './Ngrx/data.reducer';
import { LoadingComponent } from './SharedComponents/loaders/loading/loading.component';
import { FileSizePipe } from './TsExtras/file-size.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './SharedComponents/footer/footer.component';

@NgModule({
  declarations: [FileSizePipe, AppComponent],
  imports: [
    LoadingComponent,
    FooterComponent,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      user: userReducer,
      loader: LoaderReducer,
      search: searchStateReducer,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatInputModule } from '@angular/material/input';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselComponent } from './carousel/carousel.component';
import { NgxCarouselComponent } from './ngx-carousel/ngx-carousel.component';
import { CardCarouselComponent } from './card-carousel/card-carousel.component';
import { BlogCarouselComponent } from './blog-carousel/blog-carousel.component';
import { FooterComponent } from './footer/footer.component';
import { RentalCarouselComponent } from './rental-carousel/rental-carousel.component';
import { SellerCarouselComponent } from './seller-carousel/seller-carousel.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { ListingsComponent } from './listings/listings.component';
import { PopupComponent } from './popup/popup.component';
import { ListingPageComponent } from './listing-page/listing-page.component';
import { MatSelectModule } from '@angular/material/select';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSizePipe } from '../app/property-file/file-size.pipe';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { RegisterPopupComponent } from './register-popup/register-popup.component';
import { SellPropertyPopupComponent } from './sell-property-popup/sell-property-popup.component';
import { RentPopupComponent } from './rent-popup/rent-popup.component';
import { PreviewComponent } from './preview/preview.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from './services/register.service';
import {MatTabsModule} from '@angular/material/tabs';
import { SellingPropertyComponent } from './selling-property/selling-property.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { RentPropertyPageComponent } from './rent-property-page/rent-property-page.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SellAddPropertyComponent } from './sell-add-property/sell-add-property.component';
import { SellPreviewComponent } from './sell-preview/sell-preview.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashNavComponent } from './dash-nav/dash-nav.component';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardListingsComponent } from './dashboard-listings/dashboard-listings.component';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';
import { OffMarketComponent } from './off-market/off-market.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SearchBarComponent,
    CarouselComponent,
    CardCarouselComponent,
    BlogCarouselComponent,
    FooterComponent,
    RentalCarouselComponent,
    SellerCarouselComponent,
    PropertyDetailsComponent,
    ListingsComponent,
    PopupComponent,
    ListingPageComponent,
    FileSizePipe,
    ContactUsComponent,
    LoginPopupComponent,
    RegisterPopupComponent,
    SellPropertyPopupComponent,
    RentPopupComponent,
    PreviewComponent,
    SellingPropertyComponent,
    LoginPageComponent,
    SignupPageComponent,
    RentPropertyPageComponent,
    SellAddPropertyComponent,
    SellPreviewComponent,
    DashboardComponent,
    DashNavComponent,
    DashboardHomeComponent,
    DashboardListingsComponent,
    OffMarketComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SlickCarouselModule,
    NgxCarouselComponent,
    MatSelectModule,
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    CanvasJSAngularChartsModule
    

    
  ],
  exports: [NgxCarouselComponent],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

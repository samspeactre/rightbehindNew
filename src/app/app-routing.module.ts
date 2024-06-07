import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogCarouselComponent } from './SharedComponents/blog-carousel/blog-carousel.component';
import { CardCarouselComponent } from './SharedComponents/card-carousel/card-carousel.component';
import { CarouselComponent } from './SharedComponents/carousel/carousel.component';
import { ListingPageComponent } from './SharedComponents/listing-page/listing-page.component';
import { LoginPageComponent } from './SharedComponents/login-page/login-page.component';
import { RentalCarouselComponent } from './SharedComponents/rental-carousel/rental-carousel.component';
import { ContactUsComponent } from './View/contact-us/contact-us.component';
import { DashboardComponent } from './View/dashboard/dashboard.component';
import { HomeComponent } from './View/home/home.component';
import { ListingsComponent } from './View/listings/listings.component';
import { PopupComponent } from './View/popup/popup.component';
import { PreviewComponent } from './View/preview/preview.component';
import { PropertyDetailsComponent } from './View/property-details/property-details.component';
import { RentPropertyPageComponent } from './View/rent-property-page/rent-property-page.component';
import { SellAddPropertyComponent } from './View/sell-add-property/sell-add-property.component';
import { SellPreviewComponent } from './View/sell-preview/sell-preview.component';
import { SignupPageComponent } from './View/signup-page/signup-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data:{footer:true,header:true} },
  { path: 'buy', component: ListingPageComponent, data:{footer:true,header:true} },
  { path: 'rent', component: ListingPageComponent, data:{footer:true,header:true} },
  { path: 'carousel', component: CarouselComponent },
  { path: 'card-carousel', component: CardCarouselComponent },
  { path: 'blog-carousel', component: BlogCarouselComponent },
  { path: 'rent-carousel', component: RentalCarouselComponent },
  { path: 'property-details', component: PropertyDetailsComponent, data:{footer:true, header:true} },
  { path: 'selling-detail', component: PropertyDetailsComponent, data:{footer:true, header:true} },
  { path: 'buy-property', component: PropertyDetailsComponent, data:{footer:true, header:true} },
  { path: 'listing', component: ListingsComponent,data:{header:true} },
  { path: 'popup', component: PopupComponent },
  { path: 'listing-page', component: ListingPageComponent, data:{footer:true,header:true} },
  { path: 'contact-us', component: ContactUsComponent, data:{footer:true,header:true} },
  { path: 'rent-preview', component: PreviewComponent, data:{footer:true, header:true} },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'rent-add-property', component: RentPropertyPageComponent, data:{footer:true,header:true} },
  { path: 'sell-add-property', component: SellAddPropertyComponent, data:{footer:true, header:true} },
  { path: 'preview', component: SellPreviewComponent, data:{footer:true, header:true} },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo:'' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

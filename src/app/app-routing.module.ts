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
  { path: '', component: HomeComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'card-carousel', component: CardCarouselComponent },
  { path: 'blog-carousel', component: BlogCarouselComponent },
  { path: 'rent-carousel', component: RentalCarouselComponent },
  { path: 'property-details', component: PropertyDetailsComponent },
  { path: 'selling-detail', component: PropertyDetailsComponent },
  { path: 'buy-property', component: PropertyDetailsComponent },
  { path: 'listing', component: ListingsComponent },
  { path: 'popup', component: PopupComponent },
  { path: 'listing-page', component: ListingPageComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'rent-preview', component: PreviewComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'rent-add-property', component: RentPropertyPageComponent },
  { path: 'sell-add-property', component: SellAddPropertyComponent },
  { path: 'sell-preview', component: SellPreviewComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

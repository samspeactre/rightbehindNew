import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CardCarouselComponent } from './card-carousel/card-carousel.component';
import { BlogCarouselComponent } from './blog-carousel/blog-carousel.component';
import { RentalCarouselComponent } from './rental-carousel/rental-carousel.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { ListingsComponent } from './listings/listings.component';
import { PopupComponent } from './popup/popup.component';
import { ListingPageComponent } from './listing-page/listing-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PreviewComponent } from './preview/preview.component';
import { SellingPropertyComponent } from './selling-property/selling-property.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { RentPropertyPageComponent } from './rent-property-page/rent-property-page.component';
import { SellAddPropertyComponent } from './sell-add-property/sell-add-property.component';
import { SellPreviewComponent } from './sell-preview/sell-preview.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'card-carousel', component: CardCarouselComponent },
  { path: 'blog-carousel', component: BlogCarouselComponent },
  { path: 'rent-carousel', component: RentalCarouselComponent },
  { path: 'property-details', component: PropertyDetailsComponent },
  { path: 'listing', component: ListingsComponent },
  { path: 'popup', component: PopupComponent },
  { path: 'listing-page', component: ListingPageComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'rent-preview', component: PreviewComponent },
  { path: 'selling-detail', component: SellingPropertyComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'rent-add-property', component: RentPropertyPageComponent },
  { path: 'sell-add-property', component: SellAddPropertyComponent },
  { path: 'sell-preview', component: SellPreviewComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

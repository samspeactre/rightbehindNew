import { Routes } from '@angular/router';
import { ListingPageRentComponent } from './listing-page-rent.component';

export const Listing_Page_Rent_Routes: Routes = [
  {
    path: '',
    data: { footer: false, header: true, communityHeader: true },
    component: ListingPageRentComponent,
  },
];

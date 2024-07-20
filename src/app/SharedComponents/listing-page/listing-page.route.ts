import { Routes } from '@angular/router';
import { ListingPageComponent } from './listing-page.component';

export const Listing_Page_Routes: Routes = [
  { path: '', component: ListingPageComponent },
  {
    path: 'community',
    data: { footer: true, header: true },
    loadChildren: () =>
      import('../../View/community-view/community.route').then(
        (m) => m.Community_Routes
      ),
  },
];

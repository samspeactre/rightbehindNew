import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { footer: true, header: true },
    loadChildren: () =>
      import('./view/home/home.route').then((m) => m.Home_Routes),
  },
  {
    path: 'buy',
    data: { footer: true, header: true },
    loadChildren: () =>
      import('./SharedComponents/listing-page/listing-page.route').then((m) => m.Listing_Page_Routes),
  },
  {
    path: 'rent',
    data: { footer: true, header: true },
    loadChildren: () =>
      import('./SharedComponents/listing-page/listing-page.route').then((m) => m.Listing_Page_Routes),
  },
  {
    path: 'property-details',
    data: { footer: true, header: true },
    loadChildren: () =>
      import('./view/property-details/property-details.route').then(
        (m) => m.Property_Details_Routes
      ),
  },
  {
    path: 'selling-detail',
    data: { footer: true, header: true },
    loadChildren: () =>
      import('./view/property-details/property-details.route').then(
        (m) => m.Property_Details_Routes
      ),
  },
  {
    path: 'contact-us',
    data: { footer: true, header: true },
    loadChildren: () =>
      import('./view/contact-us/contact-us.route').then(
        (m) => m.Contact_Us_Routes
      ),
  },
  {
    path: 'rent-preview',
    data: { footer: true, header: true },
    loadChildren: () =>
      import('./view/preview/preview.route').then((m) => m.Preview_Routes),
  },
  {
    path: 'rent-add-property',
    data: { footer: true, header: true },
    loadChildren: () =>
      import('./view/rent-property-page/rent-property.route').then(
        (m) => m.Rent_Property_Routes
      ),
  },
  {
    path: 'sell-add-property',
    data: { footer: true, header: true },
    loadChildren: () =>
      import('./view/rent-property-page/rent-property.route').then(
        (m) => m.Rent_Property_Routes
      ),
  },
  {
  path: 'preview',
    data: { footer: true, header: true },
    loadChildren: () =>
      import('./view/sell-preview/sell-preview.route').then((m) => m.Sell_Preview_Routes),
  },
  {
    path: 'dashboard',
      data: { footer: true, header: true },
      loadChildren: () =>
        import('./view/dashboard/dashboard.route').then((m) => m.Dashboard_Routes),
    },
];
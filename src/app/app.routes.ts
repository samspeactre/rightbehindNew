import { Routes } from '@angular/router';
import { InnerGuard } from './Guards/inner.gaurd';
import { LayoutComponent } from './SharedComponents/layout/layout.component';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
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
          import('./SharedComponents/listing-page/listing-page.route').then(
            (m) => m.Listing_Page_Routes
          ),
      },
      {
        path: 'off-market',
        data: { footer: true, header: true },
        loadChildren: () =>
          import('./SharedComponents/off-market/off-market.route').then(
            (m) => m.Off_Market_Routes
          ),
      },
      {
        path: 'rent',
        data: { footer: true, header: true },
        loadChildren: () =>
          import('./SharedComponents/listing-page/listing-page.route').then(
            (m) => m.Listing_Page_Routes
          ),
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
        canActivate: [InnerGuard],
        data: { footer: true, header: true, sellHide: true },
        loadChildren: () =>
          import('./view/rent-property-page/rent-property.route').then(
            (m) => m.Rent_Property_Routes
          ),
      },
      {
        path: 'sell-add-property',
        canActivate: [InnerGuard],
        data: { footer: true, header: true, sellHide: true },
        loadChildren: () =>
          import('./view/rent-property-page/rent-property.route').then(
            (m) => m.Rent_Property_Routes
          ),
      },
      {
        path: 'preview',
        data: { footer: true, header: true },
        loadChildren: () =>
          import('./view/sell-preview/sell-preview.route').then(
            (m) => m.Sell_Preview_Routes
          ),
      },
      {
        path: 'blog-inner',
        data: { footer: true, header: true },
        loadChildren: () =>
          import('./view/blog-inner/blog-inner.route').then(
            (m) => m.Blog_Inner_Routes
          ),
      },
      {
        path: 'communities',
        data: { footer: true, header: true, communityHeader:true },
        loadChildren: () =>
          import('./SharedComponents/listing-page/listing-page.route').then(
            (m) => m.Listing_Page_Routes
          ),
      },
      {
        path: 'payment-success',
        data: { footer: true, header: true },
        loadChildren: () =>
          import('../app/SharedComponents/payment/payment.route').then(
            (m) => m.Payment_Routes
          ),
      },
      {
        path: 'payment-failed',
        data: { footer: true, header: true },
        loadChildren: () =>
          import('../app/SharedComponents/payment/payment.route').then(
            (m) => m.Payment_Routes
          ),
      },
    ]
  },
  {
    path: 'dashboard',
    canActivate: [InnerGuard],
    data: { footer: false, header: false },
    loadChildren: () =>
      import('./view/dashboard/dashboardroute').then(
        (m) => m.Dashboard_Routes
      ),
  },
  {
    path:'**',
    redirectTo:'/'
  }
];

import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const Dashboard_Routes: Routes = [{
    path: '', component: DashboardComponent,
    children: [
        {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
        },
        {
            path: 'home',
            loadChildren: () =>
                import('./dashboard-home/dashboardHomeRoute').then(
                    (m) => m.Dashboard_Home_Routes
                ),
        },
        {
            path: 'my-listings',
            loadChildren: () =>
                import('./my-listing/myListingRoute').then(
                    (m) => m.Listing_Routes
                ),
        },
        {
            path: 'inquiries',
            loadChildren: () =>
                import('./chat/chatRoute').then(
                    (m) => m.Inquiries_Routes
                ),
        },
        {
            path: 'communities-groups',
            loadChildren: () =>
                import('./community/communityRoute').then(
                    (m) => m.Community_Routes
                ),
        },
        {
            path: 'analytics',
            loadChildren: () =>
                import('./analytics/analyticsRoute').then(
                    (m) => m.Analytics_Routes
                ),
        },
        {
            path: 'help-&-support',
            loadChildren: () =>
                import('./help/helpRoute').then(
                    (m) => m.Help_Routes
                ),
        },
        {
            path: 'settings',
            loadChildren: () =>
                import('./settings/settingsRoute').then(
                    (m) => m.Settings_Routes
                ),
        },
        {
            path: 'transactions',
            loadChildren: () =>
                import('./my-accounts/myAccountsRoute').then(
                    (m) => m.MyAccounts_Routes
                ),
        },
        {
            path:'**',
            redirectTo:'home'
          }
    ]
}
];

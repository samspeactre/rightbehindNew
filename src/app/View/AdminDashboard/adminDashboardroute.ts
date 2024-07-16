import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admindashboard.component';

export const Dashboard_Routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
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
        path: 'users',
        loadChildren: () =>
          import('./users/usersRoute').then((m) => m.Users_Routes),
      },
      {
        path: 'inquiries',
        loadChildren: () =>
          import('./inquiries/inquiriesRoute').then((m) => m.Inquiries_Routes),
      },
      {
        path: 'blogs',
        loadChildren: () =>
          import('./blogs/blogsRoute').then((m) => m.Blogs_Routes),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./transactions/transactionsRoute').then((m) => m.Transactions_Routes),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settingsRoute').then((m) => m.Settings_Routes),
      },
    ],
  },
];

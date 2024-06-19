import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

export const Dashboard_Routes: Routes = [{
    path: '', component: DashboardComponent,
    children: [
        { path: '', component: DashboardHomeComponent }
    ]
}
];

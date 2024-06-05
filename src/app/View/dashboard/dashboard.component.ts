import { Component } from '@angular/core';
import { DashboardListingsComponent } from '../../SharedComponents/dashboard-listings/dashboard-listings.component';
import { DashboardHomeComponent } from '../../SharedComponents/dashboard-home/dashboard-home.component';
import { DashNavComponent } from '../../SharedComponents/dash-nav/dash-nav.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone:true,
  imports: [DashboardListingsComponent, DashboardHomeComponent, DashNavComponent, MatIconModule, MatButtonModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentSection: string = 'dashboard';
  isSidebarCollapsed: boolean = false;

  setSection(section: string) {
    this.currentSection = section;
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}

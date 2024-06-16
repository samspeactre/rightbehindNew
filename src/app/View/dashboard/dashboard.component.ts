import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashNavComponent } from '../../SharedComponents/dash-nav/dash-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardHomeComponent } from '../../SharedComponents/dashboard-home/dashboard-home.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, DashNavComponent, MatIconModule, RouterModule, MatFormFieldModule, MatInputModule,DashboardHomeComponent, MatButtonModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentSection = 'Dashboard';
  isSidebarCollapsed = false;

  setSection(section: string) {
    // Map section identifiers to human-readable names
    const sectionNames: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'my-listings': 'My Listings',
      'inquiries': 'Inquiries',
      'analytics': 'Analytics',
      'help-support': 'Help & Support',
      'settings': 'Settings',
      'account': 'Account',
      'offMarket': 'OFF Market'
    };

    this.currentSection = sectionNames[section] || 'Dashboard';
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}

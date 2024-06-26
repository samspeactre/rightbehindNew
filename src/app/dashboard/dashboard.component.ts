import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentSection = 'Dashboard'; // Default section name in human-readable format
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

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashNavComponent } from '../../SharedComponents/dash-nav/dash-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardHomeComponent } from '../../SharedComponents/dashboard-home/dashboard-home.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../SharedComponents/Dashboard/sidebar/sidebar.component';

@Component({
  standalone: true,
  imports: [CommonModule, SidebarComponent, DashNavComponent, MatIconModule, RouterModule, MatFormFieldModule, MatInputModule,DashboardHomeComponent, MatButtonModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentSection = 'Dashboard';
  isSidebarCollapsed = false;
}

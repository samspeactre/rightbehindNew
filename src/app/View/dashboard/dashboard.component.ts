import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../SharedComponents/Dashboard/sidebar/sidebar.component';
import { DashNavComponent } from '../../SharedComponents/dash-nav/dash-nav.component';

@Component({
  standalone: true,
  imports: [CommonModule, SidebarComponent, DashNavComponent, MatIconModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild('sidebar', { static: true }) sidebar!: ElementRef;
  rightHieght: number = 0
  currentSection = 'Dashboard';
  width: number = window.innerWidth
  isSidebarCollapsed: boolean = this.width < 1024 ? true : false;
  constructor(){}
  ngAfterViewInit() {
    setTimeout(() => {
      this.setMapHeight()
    });
  }
  setMapHeight() {
    if (this.sidebar) {
      this.rightHieght = this.width > 1024 ? this.sidebar?.nativeElement.offsetHeight : (window.innerHeight - 50)
    }
  }
}

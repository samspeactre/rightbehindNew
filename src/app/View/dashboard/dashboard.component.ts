import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../SharedComponents/Dashboard/sidebar/sidebar.component';
import { DashNavComponent } from '../../SharedComponents/dash-nav/dash-nav.component';
import { ResizeService } from '../../Services/resize.service';

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
  isSidebarCollapsed: boolean = window.innerWidth > 1024 ? false : true;
  constructor(public resize:ResizeService){}
  ngAfterViewInit() {
    setTimeout(() => {
      this.setMapHeight()
    });
  }
  setMapHeight() {
    if (this.sidebar) {
      this.rightHieght = window.innerWidth > 1024 ? this.sidebar?.nativeElement.offsetHeight : (window.innerHeight - 50)
    }
  }
}

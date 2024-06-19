import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComments, faMessage } from '@fortawesome/free-regular-svg-icons';
import { faChartLine, faCircleQuestion, faGear, faHomeAlt, faList, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  faHome = faHomeAlt;
  faList = faList;
  faComments = faMessage;
  faMessage = faComments;
  faChartLine = faChartLine;
  faCircleQuestion = faCircleQuestion;
  faSetting = faGear;
  faUser = faUser;
  @Input() isSidebarCollapsed: boolean = window.innerWidth < 1024 ? true : false;
  @Output() isSidebarCollapsedEvent = new EventEmitter<boolean>();

  toggleSidebar() {
    if(window.innerWidth > 1024){
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      this.isSidebarCollapsedEvent.emit(this.isSidebarCollapsed)
    }
  }
  routes = [
    { name: 'Dashboard', route: '/dashboard/home', icon: this.faHome},
    { name: 'My Listings', route: '/dashboard/my-listings', icon: this.faList},
    { name: 'Inquiries', route: '/dashboard/inquiries', icon: this.faComments},
    { name: 'Communities Groups', route: '/dashboard/communities-groups', icon: this.faMessage},
    { name: 'Analytics', route: '/dashboard/analytics', icon: this.faChartLine},
    { name: 'Help & Support', route: '/dashboard/help-&-support', icon: this.faCircleQuestion},
    { name: 'Settings', route: '/dashboard/settings', icon: this.faSetting},
    { name: 'My Accounts', route: '/dashboard/my-accounts', icon: this.faUser},
  ]
}

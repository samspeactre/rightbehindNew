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
  faComments = faComments;
  faMessage = faMessage;
  faChartLine = faChartLine;
  faCircleQuestion = faCircleQuestion;
  faSetting = faGear;
  faUser = faUser;
  @Input() isSidebarCollapsed: boolean = false;
  @Output() isSidebarCollapsedEvent = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.isSidebarCollapsedEvent.emit(this.isSidebarCollapsed)
  }
  routes = [
    { name: 'Dashboard', route: '/', icon: this.faHome},
    { name: 'My Listings', route: '/listings', icon: this.faList},
    { name: 'Inquiries', route: '/inquiries', icon: this.faComments},
    { name: 'Communities Groups', route: '/communities-groups', icon: this.faMessage},
    { name: 'Analytics', route: '/analytics', icon: this.faChartLine},
    { name: 'Help & Support', route: '/help-&-support', icon: this.faCircleQuestion},
    { name: 'Settings', route: '/settings', icon: this.faSetting},
    { name: 'My Accounts', route: '/my-accounts', icon: this.faUser},
  ]
}

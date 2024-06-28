import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComments, faMessage } from '@fortawesome/free-regular-svg-icons';
import { faChartLine, faCircleQuestion, faGear, faHomeAlt, faList, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { removeUserData } from '../../../Ngrx/data.action';
import { AuthService } from '../../../TsExtras/auth.service';
import { CommonModule } from '@angular/common';
import { ResizeService } from '../../../Services/resize.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, CommonModule],
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
  faSignOutAlt=faSignOutAlt
  @Input() isSidebarCollapsed: boolean = window.innerWidth > 1024 ? false : true;
  @Output() isSidebarCollapsedEvent = new EventEmitter<boolean>();
  constructor(private store:Store,private router:Router, private auth:AuthService,public resize:ResizeService){}
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
  logout(){
    this.store.dispatch(removeUserData());
    this.router.navigateByUrl('/')
    this.auth.logout()
  }
}

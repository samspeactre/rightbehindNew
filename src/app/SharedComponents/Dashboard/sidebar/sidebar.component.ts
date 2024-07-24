import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComments, faMessage, faNewspaper } from '@fortawesome/free-regular-svg-icons';
import {
  faChartLine,
  faCircleQuestion,
  faDollar,
  faDollarSign,
  faGear,
  faHomeAlt,
  faList,
  faSackDollar,
  faSignOutAlt,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
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
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  faHome = faHomeAlt;
  faUsers=faUsers;
  faList = faList;
  faComments = faMessage;
  faNewsPaper = faNewspaper;
  faDollar = faSackDollar;
  faMessage = faComments;
  faChartLine = faChartLine;
  faCircleQuestion = faCircleQuestion;
  faSetting = faGear;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  width: number = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.width = window.innerWidth;
  }
  @Input() isSidebarCollapsed: boolean = this.width > 1024 ? false : true;
  @Input() admin: boolean = false;
  @Output() isSidebarCollapsedEvent = new EventEmitter<boolean>();
  constructor(
    private store: Store,
    private router: Router,
    private auth: AuthService,
    public resize: ResizeService
  ) {}
  toggleSidebar() {
    if (this.width > 1024) {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      this.isSidebarCollapsedEvent.emit(this.isSidebarCollapsed);
    }
  }
  routes = [
    { name: 'Dashboard', route: '/dashboard/home', icon: this.faHome },
    { name: 'My Listings', route: '/dashboard/my-listings', icon: this.faList },
    { name: 'Inquiries', route: '/dashboard/inquiries', icon: this.faComments },
    {
      name: 'Communities Groups',
      route: '/dashboard/communities-groups',
      icon: this.faMessage,
    },
    {
      name: 'Analytics',
      route: '/dashboard/analytics',
      icon: this.faChartLine,
    },
    {
      name: 'Help & Support',
      route: '/dashboard/help-&-support',
      icon: this.faCircleQuestion,
    },
    { name: 'Settings', route: '/dashboard/settings', icon: this.faSetting },
    { name: 'Transactions', route: '/dashboard/transactions', icon: this.faUser },
  ];
  adminRoutes = [
    // { name: 'Dashboard', route: '/admin-dashboard/home', icon: this.faHome },
    { name: 'Users', route: '/admin-dashboard/users', icon: this.faUsers },
    { name: 'Inquiries', route: '/admin-dashboard/inquiries', icon: this.faComments },
    { name: 'Blogs', route: '/admin-dashboard/blogs', icon: this.faNewsPaper },
    { name: "Where's Bryan", route: '/admin-dashboard/bryan', icon: this.faSetting },
    { name: 'Transactions', route: '/admin-dashboard/transactions', icon: this.faDollar },
  ];
  logout() {
    this.store.dispatch(removeUserData());
    this.router.navigateByUrl('/');
    this.auth.logout();
  }
}

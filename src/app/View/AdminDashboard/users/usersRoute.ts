import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserInnerComponent } from './user-inner/user-inner.component';
export const Users_Routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'user-detail',
    component: UserInnerComponent,
  },
];

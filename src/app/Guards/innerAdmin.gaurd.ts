import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../Ngrx/data.reducer';

@Injectable({
  providedIn: 'root',
})
export class InnerAdminGuard implements CanActivate {
  user$ = this.store.select(selectUser);
  user: any;
  constructor(private router: Router, private store: Store) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.user || this.user?.userType !== 'SuperAdmin') {
      this.router.navigateByUrl('/');
      return false;
    }

    return true;
  }
}

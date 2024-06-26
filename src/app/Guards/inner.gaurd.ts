import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root',
})
export class InnerGuard {
    constructor(
        private router: Router,
        private store: Store,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean {
        const user = localStorage.getItem('userDetails');
        if (!user) {
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    }
}

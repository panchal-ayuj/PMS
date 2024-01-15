// admin.guard.ts

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.handleResponseAsync();
  }

  async handleResponseAsync(): Promise<boolean> {
    try {
      // Assume this is an asynchronous method that returns a Promise
      const user = await this.service
        .getUser(localStorage.getItem('token'))
        .toPromise();
      console.log(user);

      const isAdmin = user.roles.includes('Admin');

      if (isAdmin) {
        // User has the 'Admin' role, you can perform actions accordingly
        return true;
      } else {
        this.router.navigate(['/']); // Redirect to the home page if not an admin
        return false;
      }
    } catch (error) {
      this.router.navigate(['/']); // Redirect to the home page if not an admin
      console.error('Error fetching user data:', error);
      return false;
    }

    return false;
  }
}

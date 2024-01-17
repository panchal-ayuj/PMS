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
export class UserGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.handleResponseAsync();
  }

  async handleResponseAsync(): Promise<boolean> {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');

      // Check if the token exists
      if (token) {
        // Assume this is an asynchronous method that returns a Promise
        const userEmail = await this.service.getEmail(token).toPromise();
        console.log(userEmail);

        const userEmailPresent = await this.service
          .isUserEmailPresent(userEmail)
          .toPromise();

        if (userEmailPresent) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      } else {
        console.error('Token is null or undefined');
        this.router.navigate(['/']);
        return false;
      }
    } catch (error) {
      console.error('Error fetching user email:', error);
    }

    return false;
  }
}

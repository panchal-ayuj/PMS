// import { Component, NgZone, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-logout',
//   templateUrl: './logout.component.html',
//   styleUrl: './logout.component.scss'
// })
// export class LogoutComponent implements OnInit {

//   constructor(private router: Router, private service: AuthService, private _ngZone: NgZone) { }

//   ngOnInit(): void {
    
//   }

//   public logout() {
//     this.service.signOutExternal();
//     this._ngZone.run(() => {
//       this.router.navigate(['/']).then(() => window.location.reload());
//     })
//   }
// }


import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { UserInfoService } from '../user-info.service';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  admin: boolean = false;

  constructor(private cookieService: CookieService, private router: Router, private service: AuthService, private _ngZone: NgZone, private userInfoService: UserInfoService, private sharedDataService : SharedDataService) {}

  ngOnInit(): void {
    this.handleResponseAsync();
  }

  // onSignOut() {
  //   // Clear the stored token or perform other logout actions
  //   this.cookieService.delete('googleToken');

  //   this.router.navigate(['/']);
  // }

  onSignOut() {
    this.service.signOutExternal();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload());
    })
  }

  async handleResponseAsync() {
    try {
      // Assume this is an asynchronous method that returns a Promise
      const user = await this.service.getUser(localStorage.getItem('token')).toPromise();
      console.log(user);
      this.userInfoService.changeUserInfo({
        firstName: user.firstName,
        lastName: user.lastName,
      });

      const isAdmin = user.roles.includes('Admin');
    
      if (isAdmin) {
        // User has the 'Admin' role, you can perform actions accordingly
        this.admin = true;
      } 
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  viewDetails(): void {
    this.sharedDataService.changeUserId(null);
    // if(userId !== null && userId !== undefined && userId !== ""){
      // console.log("Hitting profile");
      this.router.navigate(['/keyresult']);
    // } 
  }

}

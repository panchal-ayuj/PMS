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

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router, private service: AuthService, private _ngZone: NgZone) {}

  ngOnInit(): void {}

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
}

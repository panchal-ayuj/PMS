// import { Component, NgZone, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import google from 'google-one-tap';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent implements OnInit {
//   constructor(
//     private router: Router,
//     private service: AuthService,
//     private _ngZone: NgZone
//   ) {}

//   ngOnInit(): void {
//     // @ts-ignore
//     window.googleOnLibraryLoad = () => {
//       this.initializeGoogleOneTap();
//     };
//   }

//   initializeGoogleOneTap() {
//     // Check if the necessary objects are defined
//     if (google && google.accounts && google.accounts.id) {
//       google.accounts.id.initialize({
//         client_id: '989609994793-2mteaqsp1crhdhvalbne1oincoq73920.apps.googleusercontent.com',
//         callback: this.handleCredentialResponse.bind(this),
//         auto_select: false,
//         cancel_on_tap_outside: true,
//       });

//       // No need to renderButton here when the button is created in the HTML template
//       google.accounts.id.prompt((notification) => {});
//     } else {
//       console.error('Google One Tap is not initialized.');
//     }
//   }

//   onSignIn() {
//     // Check if the google object is defined before calling google.accounts.id.prompt
//     if (window.google && window.google.accounts && window.google.accounts.id) {
//       // Trigger Google One Tap
//       window.google.accounts.id.prompt();
//     } else {
//       console.error('Google One Tap is not initialized.');
//     }
//   }

//   async handleCredentialResponse(response: { credential: string }) {
//     await this.service.LoginWithGoogle(response.credential).subscribe(
//       (x: any) => {
//         localStorage.setItem('token', x.token);
//         this._ngZone.run(() => {
//           this.router.navigate(['/logout']);
//         });
//       },
//       (error: any) => {
//         console.log(error);
//       }
//     );
//   }
// }

import { Component, AfterViewInit, NgZone } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private service: AuthService,
    private ngZone: NgZone // Inject NgZone
  ) {}

  ngAfterViewInit(): void {
    // @ts-ignore
    window.onGoogleScriptLoad = this.initializeGoogleOneTap.bind(this);
    console.log("initialize g onetap");
    // Check if the script is already loaded
          // @ts-ignore
    if (window.google && window.google.accounts) {
      // @ts-ignore
      window.onGoogleScriptLoad();
    } else {
      // Load the Google API script asynchronously
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      document.head.appendChild(script);
    }
  }

  initializeGoogleOneTap() {
    this.ngZone.run(() => {
      console.log("initialize g one tap");
      // Trigger Google One Tap after the script is loaded
            // @ts-ignore
      window.google.accounts.id.initialize({
        client_id: '989609994793-2mteaqsp1crhdhvalbne1oincoq73920.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
      });
    });
  }

  onSignIn() {
    console.log("onsignin working");
    // @ts-ignore
    if (window.google && window.google.accounts && window.google.accounts.id) {
      console.log("in IF");
      // @ts-ignore
      window.google.accounts.id.prompt();
    } else {
      console.log("in else");
      console.error('Google One Tap is not initialized.');
    }
  }

  // async handleCredentialResponse(response: any) {
  //   // Call your AuthService method to get the user's email
  //   const userEmail = await this.service.getEmail(response.credential).toPromise();
  
  //   if (userEmail) {
  //     // Proceed with login and navigation
  //     await this.service.LoginWithGoogle(response.credential).subscribe(
  //       (x: any) => {
  //         localStorage.setItem('token', response.credential);
  //         console.log(response.credential);
  //         this.ngZone.run(() => {
  //           this.router.navigate(['/logout']);
  //         });
  //       },
  //       (error: any) => {
  //         console.log(error);
  //       }
  //     );
  //   } else {
  //     // Handle the case where the user's email is not present
  //     console.error("User's email is not present in the database.");
  //   }
  // }

  async handleCredentialResponse(response: any) {
    // Call your AuthService method to check if the user's email is present
     //console.log(response.credential);
    const userEmail = await this.service.getEmail(response.credential).toPromise();
    const authToken = await this.service.getAuthToken(response.credential).toPromise();
    // const userEmail = "panchal.kumar@accolitedigital.com";
    console.log(userEmail);
    console.log(authToken);
    const userEmailPresent = await this.service.isUserEmailPresent(userEmail).toPromise();

    if (userEmailPresent) {
      // Proceed with login and navigation
      await this.service.LoginWithGoogle(response.credential).subscribe(
        (x: any) => {
          localStorage.setItem('token', response.credential);
          if (authToken !== undefined) {
            localStorage.setItem('authToken', authToken.jwtToken);
          } else {
            console.error('Authentication token is undefined');
          }
          // console.log(response.credential);
          this.ngZone.run(() => {
            this.router.navigate(['/logout'],{ replaceUrl: true });
            // this.router.navigate(['/dashboard'], { replaceUrl: true });
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      // Handle the case where the user's email is not present
      console.error("User's email is not present in the database.");
    }
  }
}

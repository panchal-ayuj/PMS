import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { UserInfoService } from '../user-info.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  userName: any = '';
  userEmail: any = '';
  searchResults: any;

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private userInfoService: UserInfoService,
    private authService: AuthService,
    public dialog: MatDialog,
    private _ngZone: NgZone,
  ) {}

  search() {
    // Get the search query from the input field (you may use ngModel or form control)
    const searchQuery = 'your-search-query'; // Replace with your actual search query

    // Navigate to the search route, assuming you have a route for searching
    this.router.navigate(['/search'], { queryParams: { q: searchQuery } });
  }

  getUserById(userId: any): void {
    this.sharedDataService.changeUserId(userId);
    console.log(userId);
    if (userId !== null && userId !== undefined && userId !== '') {
      console.log('Hitting profile');
      this.router.navigate(['/profile']);
    } else {
      console.log('Empty user id');
    }
  }

  getProfile(): void {
    this.sharedDataService.changeUserId('');
    this.router.navigate(['/profile']);
  }

  searchUsersByName(name: string) {
    this.authService.searchUsersByName(name).subscribe(
      (results) => {
        this.searchResults = results;
      },
      (error) => {
        console.error('Error searching users:', error);
      }
    );
  }

  selectUserProfile(user: any) {
    this.sharedDataService.changeUserId(user.userId);
    this.router.navigate(['/profile']);
  }

  // onSearchInputChange(event: any) {
  //   const searchQuery = event.target.value;
  //   //console.log(searchQuery);

  //   if (searchQuery.trim() !== '') {
  //     this.searchUsersByName(searchQuery);
  //   } else {
  //     this.searchResults = [];
  //   }
  // }

  // selectUserProfile(user: any) {
  //   this.sharedDataService.changeUserId(user.userId);
  //   this.router.navigate(['/profile']);
  // }

  ngOnInit(): void {
    // Subscribe to changes in user information
    // this.userInfoService.currentUserInfo.subscribe((userInfo) => {
    //   if (userInfo) {
    //     this.userName = `${userInfo.firstName} ${userInfo.lastName}`;
    //   }
    // });
    this.handleAsyncResponse();
  }
  logout(): void {
    // Display a confirmation dialog before logging out
    const confirmLogout = confirm('Are you sure you want to logout?');

  if (confirmLogout) {
    // Call your logout service or perform logout actions
    // Example: this.authService.logout();
    // You may also want to navigate to the login page after logout
    this.authService.signOutExternal();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload());
    })
  }
  }

  async handleAsyncResponse() {
    try {
      // Assume this is an asynchronous method that returns a Promise
      const user = await this.authService
        .getUser(localStorage.getItem('token'))
        .toPromise();
      console.log(user);
      this.userName = user.firstName + ' ' + user.lastName;
      this.userEmail = user.email;

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

}

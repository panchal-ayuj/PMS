import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { UserInfoService } from '../user-info.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private searchUserIdsSubject = new Subject<string>();
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

  search(name: string) {
    const inputValue = name.trim(); // Trim to remove leading and trailing whitespaces

    // Determine if the input is numeric or a string
    if (!isNaN(Number(inputValue))) {
      // If the input is numeric, perform search by User ID
      this.getUserById(inputValue);
      console.log("number" + inputValue);
    } else {
      // If the input is a string, perform search by name
      this.searchUsersByName(inputValue);
      console.log("String" + inputValue);
    }
  }

  getUserById(userId: any): void {
    console.log("GetUserById");
    // this.sharedDataService.changeUserId(userId);
    // console.log(userId);
    this.authService.searchUserIds(userId).subscribe(
      (results) => {
        this.searchResults = results;
        console.log(results);
        
      },
      (error) => {
        console.error('Error searching user IDs:', error);
      }
    );
  }

  getProfile(): void {
    this.sharedDataService.changeUserId('');
    this.router.navigate(['/profile']);
  }

  searchUsersByName(name: string) {
    console.log("SearchUsersByName");
    this.authService.searchUsersByName(name).subscribe(
      (results) => {
        this.searchResults = results;
      },
      (error) => {
        console.error('Error searching users:', error);
      }
    );
  }

  onSearchInputChange(searchQuery: string) {
    if (searchQuery.trim() !== '') {
      this.search(searchQuery);
      this.searchUserIdsSubject.next(searchQuery);
    }
  }

  selectUserProfile(user: any) {
    this.sharedDataService.changeUserId(user.userId);
    this.router.navigate(['/profile']);
  }

  ngOnInit(): void {
    // Subscribe to changes in user information
    this.userInfoService.currentUserInfo.subscribe((userInfo) => {
      if (userInfo) {
        this.userName = `${userInfo.firstName} ${userInfo.lastName}`;
      }
    });
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
  searchUserIds(userId: string): Observable<any> {
    return this.authService.searchUserIds(userId);
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

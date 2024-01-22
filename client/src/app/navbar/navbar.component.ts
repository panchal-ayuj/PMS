import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { UserInfoService } from '../user-info.service';
import { AuthService } from '../auth.service';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private searchUserIdsSubject = new Subject<string>();
  userName: any = '';
  searchResults: any;

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private userInfoService: UserInfoService,
    private authService: AuthService
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
    // this.searchUserIdsSubject
    // .pipe(
    //   debounceTime(300), // wait for 300ms pause in events
    //   distinctUntilChanged(), // only proceed if the value has changed
    //   switchMap((userId) => {
    //     if (!isNaN(Number(userId))) {
    //       return this.searchUserIds(userId);
    //     } else {
    //       return of([]); // Return an empty observable for non-numeric values
    //     }
    //   }),
    //   catchError(() => of([])) // handle errors and emit an empty array
    // )
    // .subscribe((results) => {
    //   this.searchResults = results;
    // });
    
  }
  searchUserIds(userId: string): Observable<any> {
    return this.authService.searchUserIds(userId);
  }
}

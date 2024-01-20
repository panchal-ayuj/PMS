import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { UserInfoService } from '../user-info.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  userName: any = '';
  searchResults: any;

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private userInfoService: UserInfoService,
    private authService: AuthService
  ) {}

  search(event: Event) {
    event.preventDefault(); // Prevent the form from submitting
    // Get the search query from the input field (you may use ngModel or form control)
    const searchQuery = (event.target as HTMLFormElement).querySelector(
      '#searchInput'
    ) as HTMLInputElement; // Replace with your actual search query
    const inputValue = searchQuery.value;

    // Determine if the input is numeric or a string
    if (!isNaN(Number(inputValue))) {
      // If the input is numeric, perform search by User ID
      this.getUserById(inputValue);
      console.log(inputValue);
    } else {
      // If the input is a string, perform search by name
      this.searchUsersByName(inputValue);
      console.log(inputValue);
    }
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

  onSearchInputChange(searchQuery: string) {
    if (searchQuery.trim() !== '') {
      // Perform real-time search as the user types
      this.searchUsersByName(searchQuery);
    } else {
      this.searchResults = [];
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
  }
}

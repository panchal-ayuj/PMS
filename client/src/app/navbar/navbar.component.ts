import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  userName:any = "";

  constructor(private router: Router,private sharedDataService: SharedDataService, private userInfoService: UserInfoService) {}

  search() {
    // Get the search query from the input field (you may use ngModel or form control)
    const searchQuery = 'your-search-query'; // Replace with your actual search query

    // Navigate to the search route, assuming you have a route for searching
    this.router.navigate(['/search'], { queryParams: { q: searchQuery } });
  }

  getUserById(userId: any): void {
    this.sharedDataService.changeUserId(userId);
    console.log(userId);
    if(userId !== null && userId !== undefined && userId !== ""){
      console.log("Hitting profile");
      this.router.navigate(['/profile']);
    } else {
      console.log("Empty user id");
    }
  }

  getProfile(): void {
    this.sharedDataService.changeUserId("");
    this.router.navigate(['/profile']);
  }

  ngOnInit(): void {
    // Subscribe to changes in user information
    this.userInfoService.currentUserInfo.subscribe(userInfo => {
      if (userInfo) {
        this.userName = `${userInfo.firstName} ${userInfo.lastName}`;
      }
    });
  }
}

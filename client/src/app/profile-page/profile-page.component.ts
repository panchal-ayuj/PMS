import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from '../shared-data.service';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {

  employee = {
    firstName: '',
    lastName: '',
    roles: [''],
    email: '',
    userId: '',
    joiningDate: '',
    hrId: '',
    reportingManagerId: '',
  };

  constructor(private service: AuthService, private http:HttpClient, private sharedDataService: SharedDataService, private userInfoService: UserInfoService) {}

  ngOnInit(): void {

    this.sharedDataService.currentUserId.subscribe(userId => {
      if (userId) {
        this.getUserById(userId);
      } else {
        this.handleAsyncResponse();
      }
    });

  }

  async handleAsyncResponse() {
    try {
      // Assume this is an asynchronous method that returns a Promise
      const user = await this.service
        .getUser(localStorage.getItem('token'))
        .toPromise();
      console.log(user);

      this.employee = user;

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  getUserById(userId: any): void {
    console.log('User ID:', userId);
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }

    const url = `http://localhost:8080/api/users/${userId}`;
    this.http.get<any>(url).subscribe(
      (user) => {
        this.employee = user;
        console.log('User Details:', this.employee);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
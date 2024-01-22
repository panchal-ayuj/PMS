import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from '../shared-data.service';
import { UserInfoService } from '../user-info.service';
import { Router } from '@angular/router';

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

  userId: any;
  showButton: boolean = false;

  constructor(private router: Router,private service: AuthService, private http:HttpClient, private sharedDataService: SharedDataService, private userInfoService: UserInfoService) {}

  ngOnInit(): void {

    this.sharedDataService.currentUserId.subscribe(userId => {
      if (userId) {
        this.handleAsyncResponse2()
        .then(() => {
          this.getUserById(userId);
        })
        .catch((error) => {
          console.error('Error handling async response:', error);
        });
        // this.getUserById(userId);
      } else {
        this.showButton = false;
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

  async handleAsyncResponse2() {
    try {
      // Assume this is an asynchronous method that returns a Promise
      const user = await this.service
        .getUser(localStorage.getItem('token'))
        .toPromise();
      console.log(user);

      this.userId = user.userId;
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

    const url = `http://localhost:8080/api/users/list/${userId}`;
    this.http.get<any>(url).subscribe(
      (userList) => {
        
        this.employee = userList[0];
        if(this.employee.reportingManagerId === this.userId || userList[1].reportingManagerId === this.userId || userList[2].reportingManagerId === this.userId ){
          this.showButton = true;
        } else {
          this.showButton = false;
        }
        console.log('User Details:', this.employee);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  viewDetails(userId: any): void {
    this.sharedDataService.changeUserId(userId);
    console.log(userId);
    if(userId !== null && userId !== undefined && userId !== ""){
      console.log("Hitting keyresult");
      this.router.navigate(['/keyresult']);
    } else {
      console.log("Empty user id");
    }
  }

}
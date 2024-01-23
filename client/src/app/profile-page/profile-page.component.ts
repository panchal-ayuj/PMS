import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from '../shared-data.service';
import { UserInfoService } from '../user-info.service';
import { Router } from '@angular/router';
import { SelfFeedbackDialogComponent } from '../self-feedback-dialog/self-feedback-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private router: Router,private service: AuthService, private http:HttpClient, private sharedDataService: SharedDataService, private userInfoService: UserInfoService,private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('ngOnInit called');

    this.sharedDataService.currentUserId.subscribe(userId => {
      console.log('currentUserId subscription:', userId);
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

    const url = `http://localhost:8080/api/users/${userId}`;
    this.http.get<any>(url).subscribe(
      (user) => {
        this.employee = user;
        if(this.employee.reportingManagerId === this.userId){
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
  viewSelfFeedback() {

    const url = `http://localhost:8080/reviewCycle/user-feedback/${this.employee.userId}`;

    this.http.get(url).subscribe(
      (response: any) => {
        // Open the dialog with the received feedback
        const dialogRef = this.dialog.open(SelfFeedbackDialogComponent, {
          data: { feedback: response.userFeedback, viewMode: true },
        });
  
        dialogRef.afterClosed().subscribe((result) => {
          // Handle any logic after the dialog is closed
          console.log('Dialog closed with result:', result);
        });
      },
      (error) => {
        console.error('Error fetching user feedback:', error);
      }
    );

    
  }
  giveSelfFeedback() {
    const url = `http://localhost:8080/reviewCycle/user-feedback/${this.employee.userId}`;

  // Fetch the user details including the userFeedback property
  this.http.get(url , {responseType:'text'}).subscribe(
    (response: any) => {
      const dialogRef = this.dialog.open(SelfFeedbackDialogComponent, {
        data: { tasks: response || '', viewMode: false, userId: this.employee.userId },
      });

      dialogRef.afterClosed().subscribe((newFeedback) => {
        if (newFeedback !== undefined && newFeedback !== null) {
          // Call API to update user feedback directly using http.put
          this.http.put(url, { userFeedback: newFeedback }, { responseType: 'text' }).subscribe(
            () => {
              console.log('User feedback updated successfully.');
            },
            (error) => {
              console.error('Error updating user feedback:', error);
            }
          );
        }
      });
    },
    (error) => {
      console.error('Error fetching user details:', error);
    }
  );
  }

}
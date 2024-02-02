import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedDataService } from '../shared-data.service';
import { UserInfoService } from '../user-info.service';
import { Router } from '@angular/router';
import { SelfFeedbackDialogComponent } from '../self-feedback-dialog/self-feedback-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

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
    band: '',
    enabled: '',
    teams: ''
  };

  userId: any;
  showButton: boolean = false;
  showButton2: boolean = false;
  @ViewChild('idCard', { static: false }) idCard: ElementRef | undefined;

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
        this.showButton2 = true;
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
    this.showButton2 = false;
    console.log('User ID:', userId);
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }

    const url = `http://localhost:8080/api/users/list/${userId}`;
    const header = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
    this.http.get<any>(url, {headers: header}).subscribe(
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
  
  viewSelfFeedback() {

    const url = `http://localhost:8080/reviewCycle/user-feedback/${this.employee.userId}`;
    const header = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);

    this.http.get(url, {headers: header}).subscribe(
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

    const header = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
  // Fetch the user details including the userFeedback property
  this.http.get(url, {headers: header}).subscribe(
    (response: any) => {
      const dialogRef = this.dialog.open(SelfFeedbackDialogComponent, {
        data: { feedback: response.userFeedback || '', viewMode: false, userId: this.employee.userId },
      });

      dialogRef.afterClosed().subscribe((newFeedback) => {
        if (newFeedback !== undefined && newFeedback !== null) {
          // Call API to update user feedback directly using http.put
          const header = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
          this.http.put(url, newFeedback.userFeedback, {headers: header}).subscribe(
            () => {
              console.log('User feedback updated successfully.' + newFeedback);
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

  downloadIdCard: boolean = false;
  @ViewChild('idCard', { static: false }) idCardElement: ElementRef | undefined;
  generateIdCardPDF() {
    const idCardElement = document.getElementById('idCard');
  
    if (idCardElement) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write('<html><head><title>ID Card</title></head><body>');
        printWindow.document.write(`
        <div class="id-card">
          <img src="../../assets/images/accolite-logo.png" alt="Company Logo" class="company-logo" />
          <h2>${this.employee.firstName} ${this.employee.lastName}</h2>
          <p><strong>Employee ID:</strong> ${this.employee.userId}</p>
          <p><strong>Phone No:</strong> ${this.employee.email}</p>
          <!-- Add other details as needed -->
        </div>
      `);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
  
        // Give some time for the content to load before initiating print and save
        setTimeout(() => {
          printWindow.print();
          printWindow.onafterprint = () => {
            printWindow.close();
          };
        }, 500); // Adjust the delay if needed
      }
      
    }
    else 
    { 
    console.log("not uploading");
    }
  }
  formatTeams(teams: string | string[]): string {
    if (Array.isArray(teams)) {
      // If it's an array, join the values with '|'
      return teams.join(' | ');
    } else if (typeof teams == 'string') {
      // If it's a string, split it (if it contains commas) and join with '|'
      return teams.includes(',') ? teams.split(',').join(' | ') : teams;
    } else {
      // Handle other cases
      return '';
    }
  }
  formatRoles(roles: string | string[]): string {
    if (Array.isArray(roles)) {
      // If it's an array, join the values with '|'
      return roles.join(' | ');
    } else if (typeof roles == 'string') {
      // If it's a string, split it (if it contains commas) and join with '|'
      return roles.includes(',') ? roles.split(',').join(' | ') : roles;
    } else {
      // Handle other cases
      return '';
    }
  }

}
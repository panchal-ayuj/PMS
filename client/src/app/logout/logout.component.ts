// import { Component, NgZone, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-logout',
//   templateUrl: './logout.component.html',
//   styleUrl: './logout.component.scss'
// })
// export class LogoutComponent implements OnInit {

//   constructor(private router: Router, private service: AuthService, private _ngZone: NgZone) { }

//   ngOnInit(): void {
    
//   }

//   public logout() {
//     this.service.signOutExternal();
//     this._ngZone.run(() => {
//       this.router.navigate(['/']).then(() => window.location.reload());
//     })
//   }
// }


import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { UserInfoService } from '../user-info.service';
import { SharedDataService } from '../shared-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  admin: boolean = false;
  completedReviewCount!: number;
  totalUserCount!: number;
  userId!: number;
  secondLatestReviewCycle: any = {}; // Modify based on your ReviewCycleDTO structure
  averageRating: number = 0;
  topThreeKeyResults!: any[];
  bottomThreeKeyResults!: any[];
  taskList!: any[];


  constructor(private http: HttpClient,private cookieService: CookieService, private router: Router, private service: AuthService, private _ngZone: NgZone, private userInfoService: UserInfoService, private sharedDataService : SharedDataService) {}

  ngOnInit(): void {
    this.handleResponseAsync()
    .then(() => {
      this.fetchUserCounts();
    })
    .then(() => {
      this.fetchRating();
    })
    .then(() => {
      this.fetchOverallRating();
    })
    .then(() => {
      this.fetchTopThreeKRA();
    })
    .then(() => {
      this.fetchBottomThreeKRA();
    })
    .then(() => {
      this.fetchCurrentTasks();
    })
    .catch((error) => {
      console.error('Error handling async response:', error);
    });
  }

  // onSignOut() {
  //   // Clear the stored token or perform other logout actions
  //   this.cookieService.delete('googleToken');

  //   this.router.navigate(['/']);
  // }

  onSignOut() {
    this.service.signOutExternal();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload());
    })
  }

  async handleResponseAsync() {
    try {
      // Assume this is an asynchronous method that returns a Promise
      const user = await this.service.getUser(localStorage.getItem('token')).toPromise();
      console.log(user);
      this.userId = user.userId;
      this.userInfoService.changeUserInfo({
        firstName: user.firstName,
        lastName: user.lastName,
      });

      const isAdmin = user.roles.includes('Admin');
    
      if (isAdmin) {
        // User has the 'Admin' role, you can perform actions accordingly
        this.admin = true;
      } 
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  viewDetails(): void {
    this.sharedDataService.changeUserId(null);
    // if(userId !== null && userId !== undefined && userId !== ""){
      // console.log("Hitting profile");
      this.router.navigate(['/keyresult']);
    // } 
  }
  fetchUserCounts() {
    // Replace with your API endpoint
    const managerId = this.userId; // Replace with the actual managerId
    const header = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
    this.http.get<UserCountsDTO>(`http://localhost:8080/reviewCycle/userCounts/${managerId}`, {headers: header}).subscribe(
      (data) => {
        this.completedReviewCount = data.completedReviewCount;
        this.totalUserCount = data.totalUserCount;
      },
      (error) => {
        console.error('Error fetching user counts', error);
      }
    );
  }

  fetchRating(){
    const header = new HttpHeaders().set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
    this.http.get<any>(`http://localhost:8080/reviewCycle/secondLatestFeedbackAndRating/${this.userId}`, {headers: header}).subscribe(
      (data) => {
        this.secondLatestReviewCycle = data;
      },
      (error) => {
        console.error('Error fetching second latest feedback and rating:', error);
      }
    );
  }

  fetchOverallRating(){
    const header = new HttpHeaders().set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
    this.http.get<any>(`http://localhost:8080/reviewCycle/averageRating/${this.userId}`, {headers: header}).subscribe(
      (data) => {
        this.averageRating = data;
      },
      (error) => {
        console.error('Error fetching overall rating:', error);
      }
    );
  }

  fetchTopThreeKRA(){
    const header = new HttpHeaders().set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
    this.http.get<any>(`http://localhost:8080/keyResult/topThreeKeyResults/${this.userId}`, {headers: header}).subscribe(
      (data) => {
        this.topThreeKeyResults = data;
      },
      (error) => {
        console.error('Error fetching overall rating:', error);
      }
    );
  }

  fetchBottomThreeKRA(){
    const header = new HttpHeaders().set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
    this.http.get<any>(`http://localhost:8080/keyResult/bottomThreeKeyResults/${this.userId}`, {headers: header}).subscribe(
      (data) => {
        this.bottomThreeKeyResults = data;
      },
      (error) => {
        console.error('Error fetching overall rating:', error);
      }
    );
  }

  fetchCurrentTasks(){
    const header = new HttpHeaders().set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
    this.http.get<any>(`http://localhost:8080/keyResult/tasks/${this.userId}`, {headers: header}).subscribe(
      (data) => {
        this.taskList = data;
      },
      (error) => {
        console.error('Error fetching overall rating:', error);
      }
    );
  }

  calculateProgress(): number {
    return (this.completedReviewCount / this.totalUserCount) * 100;
  }

  calculateSecondLatestProgress(): number {
    // Customize as needed based on your rating scale
    return this.secondLatestReviewCycle.overallRating * 20;
  }

  calculateOverallProgress(): number {
    // Customize as needed based on your rating scale
    return this.averageRating * 20;
  }
}

interface UserCountsDTO {
  completedReviewCount: number;
  totalUserCount: number;
}
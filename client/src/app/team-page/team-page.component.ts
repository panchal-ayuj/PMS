import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
  teamMembers: any[] = [];
  userId: any;

  constructor(private router: Router,private userService: UserService, private service: AuthService,private sharedDataService: SharedDataService) { }  // Inject UserService

  ngOnInit(): void {
    this.handleAsyncResponse()
      .then(() => {
        this.loadTeamMembers();
      })
      .catch((error) => {
        console.error('Error handling async response:', error);
      });
  }

  viewDetails(userId: any): void {
    this.sharedDataService.changeUserId(userId);
    if(userId !== null && userId !== undefined && userId !== ""){
      console.log("Hitting profile");
      this.router.navigate(['/profile']);
    } else {
      console.log("Empty user id");
    }
  }

  loadTeamMembers() {
    // Replace 'this.userId' with the actual logged-in user's ID
    this.userService.getUsersByReportingManagerId(this.userId).subscribe(
      (data) => {
        this.teamMembers = data;
      },
      (error) => {
        console.error('Error fetching team members:', error);
      }
    );
  }

  async handleAsyncResponse() {
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
}

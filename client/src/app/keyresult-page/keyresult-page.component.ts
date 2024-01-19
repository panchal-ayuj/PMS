import { Component, OnInit } from '@angular/core';
import { KeyResultService } from '../key-result.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DiaglogoverviewComponent } from '../diaglogoverview/diaglogoverview.component';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-keyresult-page',
  templateUrl: './keyresult-page.component.html',
  styleUrl: './keyresult-page.component.scss'
})
export class KeyresultPageComponent implements OnInit{
  userId: number = 2; // Replace with the actual user ID
  period: string = 'q1'; // Replace with the desired period (e.g., 'Q1', 'Q2', etc.)
  year: number = 2023; // Replace with the desired year
  status: boolean = false;

  keyResults: any[] = [];

  constructor(private sharedDataService: SharedDataService,private keyResultService: KeyResultService, private service: AuthService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.sharedDataService.currentUserId.subscribe(userId => {
      if (userId) {
        this.handleResponseAsync2(userId)
        .then(() => {
          this.loadKeyResults();
          // this.sharedDataService.changeUserId(null);
        }).then(() => {
          this.handleResponseAsync();
        })
        .catch((error) => {
          console.error('Error handling async response:', error);
        });
        // this.getUserById(userId);
      } else {
        this.handleResponseAsync()
          .then(() => {
            this.loadKeyResults();
          })
          .catch((error) => {
            console.error('Error handling async response:', error);
          });
      }
    });

    // this.handleResponseAsync()
    //   .then(() => {
    //     this.loadKeyResults();
    //   })
    //   .catch((error) => {
    //     console.error('Error handling async response:', error);
    //   });
  }

  loadKeyResults() {
    this.keyResultService
      .getKeyResults(this.userId, this.period, this.year, this.status)
      .subscribe((data) => {
        this.keyResults = data;
      });

  }

  async handleResponseAsync() {
    try {
      // Assume this is an asynchronous method that returns a Promise
      const user = await this.service.getUser(localStorage.getItem('token')).toPromise();
      console.log(user);
      this.userId = user.userId;
      // this.sharedDataService.changeUserId(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async handleResponseAsync2(userId: any) {
    try {

      this.userId = userId;

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }


  openDialog(keyResult: any) {
    // Retrieve tasks based on keyResultId

    console.log(keyResult);
    this.keyResultService
      .getTasksByKeyResultId(keyResult)  // Replace 'keyResult.id' with your actual property
      .subscribe((tasks) => {
        // Open the dialog with tasks data
        this.dialog.open(DiaglogoverviewComponent, {
          data: { tasks },
        });
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { KeyResultService } from '../key-result.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DiaglogoverviewComponent } from '../diaglogoverview/diaglogoverview.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-keyresult-page',
  templateUrl: './keyresult-page.component.html',
  styleUrl: './keyresult-page.component.scss'
})
export class KeyresultPageComponent implements OnInit {
  userId: number = 2; // Replace with the actual user ID
  period: string = 'q1'; // Replace with the desired period (e.g., 'Q1', 'Q2', etc.)
  year: number = 2023; // Replace with the desired year
  status: boolean = false;

  keyResults: any[] = [];
  constructor(
    private keyResultService: KeyResultService,
    private service: AuthService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.handleResponseAsync()
      .then(() => {
        this.loadKeyResults();
      })
      .catch((error) => {
        console.error('Error handling async response:', error);
      });
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
          width: '600px', // Set the desired width
          height: '400px', // Set the desired height
          data: { tasks },
        });
      });
  }

  calculateNormalizedWeight(weight: number): number {
    // Calculate the sum of all weights
    const totalWeight = this.keyResults.reduce((sum, keyResult) => sum + keyResult.weight, 0);

    // Return the normalized weight
    return Math.round((weight / totalWeight)*100);
  }
}

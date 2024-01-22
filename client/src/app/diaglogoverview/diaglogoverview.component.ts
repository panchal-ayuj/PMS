import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-diaglogoverview',
  templateUrl: './diaglogoverview.component.html',
  styleUrl: './diaglogoverview.component.scss'
})
export class DiaglogoverviewComponent implements OnInit {
  showButton: boolean = false;
  userId: any;

  constructor(
    public dialogRef: MatDialogRef<DiaglogoverviewComponent>,private http: HttpClient,private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { tasks: any, panelClass: any }
  ) {}

  ngOnInit(): void {
    this.handleResponseAsync();
  }

  updateRating(task: any) {
    // Implement logic to handle rating update
    console.log('Rating updated:', task.rating);
    // You can send an HTTP request to update the rating on the server if needed
  }

  updateFeedback(task: any) {
    // Implement logic to handle feedback update
    console.log('Feedback updated:', task.feedback);
    // You can send an HTTP request to update the feedback on the server if needed
  }
  
  async handleResponseAsync() {
    try {
      // Assume this is an asynchronous method that returns a Promise
      const user = await this.service
        .getUser(localStorage.getItem('token'))
        .toPromise();
      console.log(user);
      this.userId = user.userId;
      console.log(this.data.panelClass);
      
      // this.sharedDataService.changeUserId(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }


  saveChanges() {
    // Implement logic to save changes
    // For example, you can send an HTTP request to update the tasks on the server
    console.log('Saving changes:', this.data.tasks);
    this.http.post('http://localhost:8080/api/tasks/saveChanges', this.data.tasks)
    .subscribe(response => {
      console.log('Changes saved on the server:', response);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
  
  getWeight(taskWeight:number): number {
    return Math.round(taskWeight/(this.data.tasks.reduce((sum: any, task: { weight: any; }) => sum + task.weight, 0))*100);
  }

}

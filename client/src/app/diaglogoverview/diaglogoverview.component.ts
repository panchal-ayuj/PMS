import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-diaglogoverview',
  templateUrl: './diaglogoverview.component.html',
  styleUrl: './diaglogoverview.component.scss'
})
export class DiaglogoverviewComponent {
  constructor(
    public dialogRef: MatDialogRef<DiaglogoverviewComponent>,private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { tasks: any }
  ) {}

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
}

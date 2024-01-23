import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-self-feedback-dialog',
  templateUrl: './self-feedback-dialog.component.html',
  styleUrl: './self-feedback-dialog.component.scss'
})
export class SelfFeedbackDialogComponent {
  userId: string;
  feedbackInput: string = '';
  showSubmitButton: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<SelfFeedbackDialogComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { feedback: any, viewMode: boolean, userId:string }
  ) {
    this.showSubmitButton = !data.viewMode;
    this.userId = data.userId;
  }
  submitFeedback() {
    const url = `http://localhost:8080/reviewCycle/user-feedback/${this.userId}`;

    // Call API to update user feedback directly using http.put
    this.http.put(url, { userFeedback: this.feedbackInput }, { responseType: 'text' }).subscribe(
      () => {
        console.log('User feedback updated successfully.');
      },
      (error) => {
        console.error('Error updating user feedback:', error);
      }
    );

    // Optionally, you can close the dialog after submitting
    this.dialogRef.close();
  }
}



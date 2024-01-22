import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review-cycle-upload',
  templateUrl: './review-cycle-upload.component.html',
  styleUrls: ['./review-cycle-upload.component.scss'],
})
export class ReviewCycleUploadComponent {
  selectedFile!: File;

  constructor(private http: HttpClient,private snackBar: MatSnackBar) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);
      

      this.http.post<any>('http://localhost:8080/reviewCycle', formData).subscribe(
        response => {
         // console.log(response);
          this.showSuccessSnackBar('File uploaded successfully');
          // Handle success (e.g., display a success message)
        },
        error => {
          console.error(error);
          if(error.status!=200)
          {
          this.showSuccessSnackBar('File not uploaded');
          }
          if(error.status==200)
          this.showSuccessSnackBar('File uploaded successfully');

          // Handle error (e.g., display an error message)
        }
      );
    } else {
      // Handle case where no file is selected
    }
  }
  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: ['snackbar-success'] // Add custom styles if needed
    });
  }
}

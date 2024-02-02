import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html',
  styleUrl: './user-upload.component.scss',
})
export class UserUploadComponent {
  selectedFile!: File;

  constructor(private http: HttpClient,private snackBar: MatSnackBar) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      const header = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
      this.http
        .post<any>('http://localhost:8080/api/users', formData, {headers: header})
        .subscribe(
          (response) => {
            
            console.log(response);
            // Handle success (e.g., display a success message)
           
          },
          (error) => {
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

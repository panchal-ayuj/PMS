import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html',
  styleUrl: './user-upload.component.scss',
})
export class UserUploadComponent {
  selectedFile!: File;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http
        .post<any>('http://localhost:8080/api/users', formData)
        .subscribe(
          (response) => {
            console.log(response);
            // Handle success (e.g., display a success message)
          },
          (error) => {
            console.error(error);
            // Handle error (e.g., display an error message)
          }
        );
    } else {
      // Handle case where no file is selected
    }
  }
  
}

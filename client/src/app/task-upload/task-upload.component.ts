import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-upload',
  templateUrl: './task-upload.component.html',
  styleUrl: './task-upload.component.scss'
})
export class TaskUploadComponent {
  bands: string[] = ['B7', 'B6', 'B5', 'B4', 'B3', 'B2', 'B1'];
  roles: string[] = ['Manager', 'Admin', 'Developer'];
  selectedBand!: string;
  selectedRole!: string;
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
        .post<any>('http://localhost:8080/api/tasks', formData)
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

  onUpload2(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http
        .post<any>(`http://localhost:8080/api/tasks/${this.selectedBand}/${this.selectedRole}`, formData)
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

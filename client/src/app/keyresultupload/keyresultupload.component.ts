import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-keyresult-upload',
  templateUrl: './keyresultupload.component.html',
  styleUrls: ['./keyresultupload.component.scss'],
})
export class KeyResultUploadComponent {
  selectedFile!: File;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<any>('http://localhost:8080/keyResult', formData).subscribe(
        response => {
          console.log(response);
          // Handle success (e.g., display a success message)
        },
        error => {
          console.error(error);
          // Handle error (e.g., display an error message)
        }
      );
    } else {
      // Handle case where no file is selected
    }
  }
}

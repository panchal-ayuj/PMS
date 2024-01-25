import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-upload',
  templateUrl: './uploadgoalplan.component.html',
  styleUrls: ['./uploadgoalplan.component.scss']
})
export class UploadComponent {
  selectedFile!: File;
  selectedBand!: string;
  bands: string[] = ['B7', 'B6', 'B5', 'B4', 'B3', 'B2', 'B1'];


  constructor(private http: HttpClient,private snackBar: MatSnackBar) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      
         
          

      this.http.post<any>('http://localhost:8080/goalPlan', formData).subscribe(
        response => {
          console.log(response);
         
          
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

  onUpload2(): void {
    if (this.selectedFile && this.selectedBand) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<any>(`http://localhost:8080/goalPlan/${this.selectedBand}`, formData).subscribe(
        response => {
          console.log(response);
          // Handle success (e.g., display a success message)
        },
        error => {
          console.error(error);
          if (error.status != 200) {
            this.showSuccessSnackBar('File not uploaded');
          }
          if (error.status == 200)
            this.showSuccessSnackBar('File uploaded successfully');

          console.error("File uploaded "+error);
          // Handle error (e.g., display an error message)
        }
      );
    } else {
      // Handle case where no file is selected
    }
  }
  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-success']

    });
  }
  
}

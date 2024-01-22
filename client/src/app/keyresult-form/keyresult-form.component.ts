import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-keyresult-form',
  templateUrl: './keyresult-form.component.html',
  styleUrl: './keyresult-form.component.scss'
})
export class KeyresultFormComponent {
  keyResultForm!: FormGroup;
  keyresults: any[] = [];
  keyResultId: number | undefined;

  searchKeyResultId: number | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
    this.loadKeyResults(); // Assuming you want to load existing users on component initialization
  }

  initForm() {
    this.keyResultForm = this.formBuilder.group({
      userId: [''],
      goalPlanId: [''],
      keyResultName: [''],
      description: [''],
      weight: [''],
      period: [''],
      windowId: ['']
    });
  }

  registerOrUpdateKeyResult() {
    const keyresult = this.keyResultForm.value;

    const apiUrl = 'http://localhost:8080/keyResult/';

    // Check if ID is present for update
    if (this.searchKeyResultId) { 
      this.showSuccessSnackBar('Key Result updated successfully');


      this.http.put(`${apiUrl}keyResultById/${this.searchKeyResultId}`, keyresult).subscribe(
        (response) => {
          
          console.log('Key Result updated successfully:', response);
          this.loadKeyResults();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating Key Result:', error);
        }
      );
    } else {
      this.showSuccessSnackBar('Key Result registered successfully');
      this.http.post('http://localhost:8080/keyResult/register', keyresult).subscribe(
        (response) => {
          console.log('Key Result registered successfully:', response);
          this.loadKeyResults();
          this.resetForm();
        },
        (error) => {
          console.error('Error registering Key Result:', error);
        }
      );
    }
  }


  loadKeyResults() {
    const apiUrl = 'http://localhost:8080/keyResult';
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.keyresults = data;
        } else {
          console.error('Invalid data received from the server. Expected an array.');
        }
      },
      (error) => {
        console.error('Error loading keyresults:', error);
      }
    );
  }

  exportKeyResults() {
    const apiUrl = 'http://localhost:8080/keyResult/export';

    // Make a GET request to the export endpoint
    this.http.get(apiUrl, { responseType: 'blob' }).subscribe(
      (data: Blob) => {
        // Create a blob URL and trigger a download
        const blobUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'key_result_data_export.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error exporting key results:', error);
        // Handle the error, you can display a user-friendly message
      }
    );
  }

  searchKeyResult(keyResultId: number | undefined) {
    if (keyResultId) {
      this.searchKeyResultId = keyResultId;
      const apiUrl = `http://localhost:8080/keyResult/keyResultById/${keyResultId}`;
      this.http.get(apiUrl).subscribe(
        (data: any) => {
          this.keyResultForm.patchValue(data); // Autofill the form with the fetched data
        },
        (error) => {
          console.error('Error fetching Key Result:', error);
        }
      );
    }
  }

  resetForm() {
    this.keyResultForm.reset();
    this.searchKeyResultId = undefined;
  }
  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: ['snackbar-success'] // Add custom styles if needed
    });
  }
}

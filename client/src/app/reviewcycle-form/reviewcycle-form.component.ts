import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reviewcycle-form',
  templateUrl: './reviewcycle-form.component.html',
  styleUrl: './reviewcycle-form.component.scss'
})
export class ReviewcycleFormComponent {
  reviewCycleForm!: FormGroup;
  reviewcycles: any[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    this.loadReviewCycles(); // Assuming you want to load existing users on component initialization
  }

  initForm() {
    this.reviewCycleForm = this.formBuilder.group({
      userId: [''],
      startDate: [''],
      endDate: [''],
      period: [''],
      reviewStatus: ['']
    });
  }

  registerReviewCycle() {
    const reviewcycle = this.reviewCycleForm.value;

    const apiUrl = 'http://localhost:8080/reviewCycle/register';

    this.http.post(apiUrl, reviewcycle).subscribe(
      (response) => {
        console.log('ReviewCycle registered successfully:', response);
        this.loadReviewCycles(); // Refresh user list after registration
      },
      (error) => {
        console.error('Error registering reviewCycle:', error);
      }
    );
  }

  loadReviewCycles() {
    const apiUrl = 'http://localhost:8080/reviewCycle';
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.reviewcycles = data;
        } else {
          console.error('Invalid data received from the server. Expected an array.');
        }
      },
      (error) => {
        console.error('Error loading reviewcycles:', error);
      }
    );
  }

  exportReviewCycles() {
    const apiUrl = 'http://localhost:8080/reviewCycle/export';

    // Make a GET request to the export endpoint
    this.http.get(apiUrl, { responseType: 'blob' }).subscribe(
      (data: Blob) => {
        // Create a blob URL and trigger a download
        const blobUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'review_cycle_data_export.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error exporting review cycles:', error);
        // Handle the error as needed
      }
    );
  }


  

}

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

  

}

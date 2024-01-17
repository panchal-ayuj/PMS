import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-goalplan-form',
  templateUrl: './goalplan-form.component.html',
  styleUrl: './goalplan-form.component.scss'
})
export class GoalplanFormComponent {
  goalPlanForm!: FormGroup;
  goalplans: any[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    this.loadGoalPlans(); // Assuming you want to load existing users on component initialization
  }

  initForm() {
    this.goalPlanForm = this.formBuilder.group({
      financialYear: [''],
      userId: ['']
    });
  }

  registerGoalPlan() {
    const goalplan = this.goalPlanForm.value;

    const apiUrl = 'http://localhost:8080/goalPlan/register';

    this.http.post(apiUrl, goalplan).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.loadGoalPlans(); // Refresh user list after registration
      },
      (error) => {
        console.error('Error registering goalPlan:', error);
      }
    );
  }

  loadGoalPlans() {
    const apiUrl = 'http://localhost:8080/goalPlan'; //need to update the link
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.goalplans = data;
        } else {
          console.error('Invalid data received from the server. Expected an array.');
        }
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  exportGoalPlans() {
    const apiUrl = 'http://localhost:8080/goalPlan/export';

    // Make a GET request to the export endpoint
    this.http.get(apiUrl, { responseType: 'blob' }).subscribe(
      (data: Blob) => {
        // Create a blob URL and trigger a download
        const blobUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'goal_plan_data_export.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error exporting goal plans:', error);
        // Handle the error, you can display a user-friendly message
      }
    );
  }

}

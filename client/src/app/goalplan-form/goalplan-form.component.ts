import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-goalplan-form',
  templateUrl: './goalplan-form.component.html',
  styleUrl: './goalplan-form.component.scss'
})
export class GoalplanFormComponent {

  selectedOption!: string;
  goalPlanUpdateForm!: FormGroup;
  goalPlanAddForm!: FormGroup;
  goalplans: any[] = [];
  goalPlanId: number | undefined;

  searchGoalPlanId: number | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initUpdateForm();
    this.loadGoalPlans();
    this.initAddForm(); // Assuming you want to load existing users on component initialization
  }

  initUpdateForm() {
    this.goalPlanUpdateForm = this.formBuilder.group({
      financialYear: [''],
      userId: ['']
    });
  }

  initAddForm() {
    this.goalPlanAddForm = this.formBuilder.group({
      financialYear: [''],
      userId: ['']
    });
  }

  // registerOrUpdateGoalPlan() {
  //   const goalplan = this.goalPlanForm.value;

  //   const apiUrl = 'http://localhost:8080/';

  //   // Check if ID is present for update
  //   if (this.searchGoalPlanId) { 
     


  //     this.http.put(`${apiUrl}goalPlanById/${this.searchGoalPlanId}`, goalplan).subscribe(
  //       (response) => {
  //         console.log('GoalPlan updated successfully:', response);
  //         this.showSuccessSnackBar('GoalPlan updated successfully');
  //         this.loadGoalPlans();
  //         this.resetForm();
  //       },
  //       (error) => {
  //         console.error('Error updating GoalPlan:', error);
  //       }
  //     );
  //   } else {
      
  //     this.http.post('http://localhost:8080/goalPlan/register', goalplan).subscribe(
  //       (response) => {
  //         console.log('GoalPlan registered successfully:', response);
  //         this.showSuccessSnackBar('GoalPlan registered successfully');
  //         this.loadGoalPlans();
  //         this.resetForm();
  //       },
  //       (error) => {
  //         console.error('Error registering GoalPlan:', error);
  //       }
  //     );
  //   }
  // }

  updateGoalPlan() {
    const goalplan = this.goalPlanUpdateForm.value;

    const apiUrl = 'http://localhost:8080/';

    // Check if ID is present for update
    if (this.searchGoalPlanId) { 
     


      this.http.put(`${apiUrl}goalPlanById/${this.searchGoalPlanId}`, goalplan).subscribe(
        (response) => {
          console.log('GoalPlan updated successfully:', response);
          this.showSuccessSnackBar('GoalPlan updated successfully');
          this.loadGoalPlans();
          this.resetUpdateForm();
        },
        (error) => {
          console.error('Error updating GoalPlan:', error);
        }
      );
    }
  }


  registerGoalPlan() {
    const goalplan = this.goalPlanAddForm.value;

    const apiUrl = 'http://localhost:8080/';
    

    this.http.post('http://localhost:8080/goalPlan/register', goalplan).subscribe(
        (response) => {
          console.log('GoalPlan registered successfully:', response);
          this.showSuccessSnackBar('GoalPlan registered successfully');
          this.loadGoalPlans();
          this.resetUpdateForm();
        },
        (error) => {
          console.error('Error registering GoalPlan:', error);
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
    const apiUrl = 'http://localhost:8080/export';

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

  searchGoalPlan(goalPlanId: number | undefined) {
    if (goalPlanId) {
      this.searchGoalPlanId = goalPlanId;
      const apiUrl = `http://localhost:8080/goalPlanById/${goalPlanId}`;
      this.http.get(apiUrl).subscribe(
        (data: any) => {
          this.goalPlanUpdateForm.patchValue(data); // Autofill the form with the fetched data
        },
        (error) => {
          console.error('Error fetching GoalPlan:', error);
        }
      );
    }
  }

  resetUpdateForm() {
    this.goalPlanUpdateForm.reset();
    this.searchGoalPlanId = undefined;
  }
  resetAddForm() {
    this.goalPlanAddForm.reset();
    this.searchGoalPlanId = undefined;
  }
  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: ['snackbar-success'] // Add custom styles if needed
    });
  }

}

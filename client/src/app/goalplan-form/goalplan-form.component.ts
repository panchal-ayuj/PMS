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
    const apiUrl = 'http://localhost:8080/goalPlan';
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

}

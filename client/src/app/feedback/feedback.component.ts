import { Component } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
  
  
})
export class FeedbackComponent {
  managerFeedback: string = '';
  seniorManagerFeedback:string="";
  superSeniorManagerFeedback:string="";
 
  yearOptions:number[] = [];


  
  overallRating:number | undefined;
  userId!:number;
  filterForm: FormGroup;
  constructor(private feedbackService:FeedbackService,private fb: FormBuilder)
  { 
    //this.userId=feedbackservice.getUserId();
    this.filterForm = this.fb.group({
      year: [new Date().getFullYear()], // Set default year
      period: ['q1'], // Set default period
    });
    this.generateYearOptions();
    

  }
  ngOnInit() {
    // Fetch feedback when the component is initialized with default values
    this.fetchFeedback();
  }
  generateYearOptions() {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 5; i++) {
      this.yearOptions.push(currentYear - i);
      
    }
  }
  async fetchFeedback() {
    try {
      // Extract values from the filter form
      const { year, period } = this.filterForm.value;
      this.userId = await this.feedbackService.getUserId();
      

      // Fetch feedback based on user ID
      const feedbackData = await this.feedbackService.getFeedback(this.userId).toPromise();
      console.log(feedbackData);

      // Filter feedback based on the selected year and period
      const filteredFeedback = feedbackData.filter((item: { endDate:  Date; period: string; }) => {
        const itemYear = new Date(item.endDate).getFullYear();
        // console.log(itemYear);
        // console.log(item.period);
        return itemYear.toString() == year && item.period == period;
      });
      

      // Sort filteredFeedback based on the end_date
      filteredFeedback.sort((a: { end_date:  Date; }, b: { end_date:Date; }) => {
        const dateA = new Date(a.end_date);
        const dateB = new Date(b.end_date);
        return dateA.getTime() - dateB.getTime();
      });
      console.log(filteredFeedback);
      const firstItem = filteredFeedback[0]; // Assuming there is at least one item
this.managerFeedback = firstItem?.feedback || ''; // Use optional chaining to avoid errors if feedback is undefined
this.overallRating = firstItem?.overallRating || 0; // Use optional chaining to avoid errors if overallRating is undefined
this.seniorManagerFeedback = firstItem?.seniorRMfeedback || ''; // Use optional chaining to avoid errors if seniorRMfeedback is undefined
this.superSeniorManagerFeedback = firstItem?.superSeniorRMfeedback || ''; // Use optional chaining to avoid errors if superSeniorRMfeedback is undefined 
      console.log(this.managerFeedback);

      // Update component properties with sorted feedback and rating
      // this.managerFeedback = filteredFeedback.feedback;
      
      
      // this.overallRating = filteredFeedback.overallRating;
      // this.seniorManagerFeedback = filteredFeedback.seniorRMfeedback;
      // this.superSeniorManagerFeedback = filteredFeedback.superSeniorRMfeedback;
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  }

  // ... (remaining code)

  // Method to handle filter changes and trigger feedback fetching
  onFilterChange() {
    this.fetchFeedback();
  }
}


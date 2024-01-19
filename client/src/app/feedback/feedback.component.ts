import { Component } from '@angular/core';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  managerFeedback: string = 'This is manager feedback.';
  
  overallRating:number=10;
  userId!:number;
  constructor(private feedbackservice:FeedbackService)
  { 
    //this.userId=feedbackservice.getUserId();

  }
  async ngOnInit() {
    

    // Assuming getUserId returns a Promise<number>
    try {
      this.userId = await this.feedbackservice.getUserId();
      const feedbackData = await this.feedbackservice.getFeedback(this.userId).toPromise();

      // Update component properties with feedback and rating
      this.managerFeedback = feedbackData.feedback; // Assuming your backend returns 'feedback'
      this.overallRating = feedbackData.rating;
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
    

    // Fetch other data based on userId or perform other operations
    // Example:
    // const feedbackData = await this.feedbackService.getFeedbackData(this.userId);
    // this.managerFeedback = feedbackData.managerFeedback;
    // this.overallRating = feedbackData.overallRating;
  }


}

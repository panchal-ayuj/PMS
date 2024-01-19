import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { KeyResultService } from '../key-result.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DiaglogoverviewComponent } from '../diaglogoverview/diaglogoverview.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-keyresult-page',
  templateUrl: './keyresult-page.component.html',
  styleUrl: './keyresult-page.component.scss'
})
export class KeyresultPageComponent implements OnInit{
  userId: number = 2; // Replace with the actual user ID
  period: string = 'q1'; // Replace with the desired period (e.g., 'Q1', 'Q2', etc.)
  year: number = 2023; // Replace with the desired year
  status: boolean = false;
  

  keyResults: any[] = [];
 

  constructor(private keyResultService: KeyResultService, private service: AuthService, private dialog: MatDialog,private cdr: ChangeDetectorRef,private fb: FormBuilder, private renderer: Renderer2,private el: ElementRef,private http: HttpClient) {
    this.feedbackForm = this.fb.group({
      feedback: ['']
    });
    
  }

  ngOnInit(): void { 
    
    // this.handleResponseAsync()
    //   .then(() => {
    //     this.loadKeyResults();
    //   })
    //   .catch((error) => {
    //     console.error('Error handling async response:', error);
    //   });
    this.loadKeyResults(); // Load initially
  this.handleResponseAsync()
    .catch((error) => {
      console.error('Error handling async response:', error);
    });
  }
  
  reviewCycleId!:number; //this is windowid
  
  loadKeyResults() {
    // this.keyResultService
    //   .getKeyResults(this.userId, this.period, this.year, this.status)
    //   .subscribe((data) => {
    //     this.keyResults = data;
    //   });
    
      this.keyResults = []; // Reset keyResults
      this.keyResultService
        .getKeyResults(this.userId, this.period, this.year, this.status)
        .subscribe((data) => {
          this.keyResults = data;
          console.log("data",data);
          if (data.length > 0 && 'windowId' in data[0]) {
            this.reviewCycleId = data[0].windowId; // Accessing windowId of the first KeyResult
            
            
          }
          
        });
        
    
  }

  async handleResponseAsync() {
    try {
      // Assume this is an asynchronous method that returns a Promise
      const user = await this.service.getUser(localStorage.getItem('token')).toPromise();
      console.log(user);
      this.userId = user.userId;
      this.loadKeyResults(); 

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }


  openDialog(keyResult: any) {
    // Retrieve tasks based on keyResultId
    

    
    
    
    
    
    
    
    console.log(keyResult);
    this.keyResultService
      .getTasksByKeyResultId(keyResult)  // Replace 'keyResult.id' with your actual property
      .subscribe((tasks) => {
        // Open the dialog with tasks data
        this.dialog.open(DiaglogoverviewComponent, {
          data: { tasks },
        });
      });
  }

  @ViewChild('overallFeedbackModal')
  overallFeedbackModal!: ElementRef;
  feedbackForm: FormGroup;

  submitOverallFeedback() {
    if (this.feedbackForm.valid) {
      const feedbackData = this.feedbackForm.value;
      // You can handle the feedback data as needed, for example, log it
      console.log('Overall Feedback:', feedbackData.feedback, " reviewId",this.reviewCycleId);//reviewCycleId is windowid
      
      
      
      const feedbackEndpoint = `http://localhost:8080/reviewCycle/addFeedback/${this.reviewCycleId}`;
      this.http.post(feedbackEndpoint, feedbackData.feedback).subscribe(
        (response: any) => {
          console.log('Feedback submitted successfully', response);

          // Optionally, reset the form after successful submission
          this.feedbackForm.reset();
        },
        (error: any) => {
          console.error('Error submitting feedback', error);
          // Handle errors as needed, e.g., display an error message to the user
        }
      );
      

      // Optionally, you can send the feedback data to a server using HttpClient
      // Replace 'your-feedback-api-endpoint' with the actual API endpoint
      // this.http.post('your-feedback-api-endpoint', feedbackData).subscribe(response => {
      //   console.log('Feedback submitted successfully', response);
      // });
      
      
      // Optionally, reset the form
      this.feedbackForm.reset();
    }
}
openOverallFeedbackModal() {
  this.renderer.addClass(this.overallFeedbackModal.nativeElement, 'show');
  this.renderer.setStyle(this.overallFeedbackModal.nativeElement, 'display', 'block');
  document.body.classList.add('modal-open');

}

closeOverallFeedbackModal() {
  this.renderer.removeClass(this.overallFeedbackModal.nativeElement, 'show');
  this.renderer.setStyle(this.overallFeedbackModal.nativeElement, 'display', 'none');
  document.body.classList.remove('modal-open');
} 




  
}

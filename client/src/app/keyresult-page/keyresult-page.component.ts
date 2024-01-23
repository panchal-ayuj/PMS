import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { KeyResultService } from '../key-result.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DiaglogoverviewComponent } from '../diaglogoverview/diaglogoverview.component';
import { SharedDataService } from '../shared-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-keyresult-page',
  templateUrl: './keyresult-page.component.html',
  styleUrl: './keyresult-page.component.scss',
})
export class KeyresultPageComponent implements OnInit {
  userId!: number; // ReplAace with the actual user ID
  period: string = 'q1'; // Replace with the desired period (e.g., 'Q1', 'Q2', etc.)
  year: string = '2023'; // Replace with the desired year
  status: string = 'false';
  showButton: boolean = false;
  useApi!: number;
  managerId: any;
  userName!: any;
  startDate: any;
  endDate: any;

  keyResults: any[] = [];

  constructor(
    private sharedDataService: SharedDataService,
    private keyResultService: KeyResultService,
    private service: AuthService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef,
    private http: HttpClient
  ) {
    this.feedbackForm = this.fb.group({
      feedback: [''],
    });
  }

  ngOnInit(): void {
    this.sharedDataService.currentUserId.subscribe((userId) => {
      if (userId) {
        this.handleResponseAsync2(userId)
          .then(() => {
            this.handleResponseAsync3();
            // this.sharedDataService.changeUserId(null);
          })
          .then(() => {
            this.loadKeyResults();
            // this.sharedDataService.changeUserId(null);
          })
          // .then(() => {
          //   this.handleResponseAsync();
          // })
          .catch((error) => {
            console.error('Error handling async response:', error);
          });
        // this.getUserById(userId);
      } else {
        this.handleResponseAsync()
          .then(() => {
            this.loadKeyResults();
          })
          .catch((error) => {
            console.error('Error handling async response:', error);
          });
      }
    });
  }

  reviewCycleId!: number; //this is windowid

  loadKeyResults() {
    this.keyResults = []; // Reset keyResults
    if(this.useApi!==undefined){
      this.showButton = true;
    }
    this.keyResultService
      .getKeyResults(this.userId, this.period, this.year, this.status)
      .subscribe((data) => {
        this.keyResults = data;
        console.log('data', data);
        if (data.length > 0 && 'windowId' in data[0]) {
          this.reviewCycleId = data[0].windowId; // Accessing windowId of the first KeyResult

          this.http
            .get<any>(
              `http://localhost:8080/reviewCycle/reviewCycleById/${this.reviewCycleId}`
            )
            .subscribe(
              (reviewCycle) => {
                if (reviewCycle) {
                  // Log the updated reviewCycle
                  this.startDate = reviewCycle.startDate;
                  this.endDate = reviewCycle.endDate;
                  console.log(reviewCycle);
                } else {
                  console.error('ReviewCycle not found');
                }
              },
              (error) => {
                console.error('Error fetching ReviewCycle:', error);
              }
            );
          console.log(data[0]);
        }
      });
  }

  async handleResponseAsync() {
    try {
      // Assume this is an asynchronous method that returns a Promise
      const user = await this.service
        .getUser(localStorage.getItem('token'))
        .toPromise();
      console.log(user);
      this.userId = user.userId;
      // this.sharedDataService.changeUserId(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async handleResponseAsync3() {
    try {
      // Assume this is an asynchronous method that returns a Promise
      const user = await this.service
        .getUser(localStorage.getItem('token'))
        .toPromise();
      console.log(user);
      const url = `http://localhost:8080/api/users/list/${this.userId}`;
      this.http.get<any>(url).subscribe(
        (empList) => {
          this.userName = empList[0].firstName;
          this.startDate = new Date(this.startDate);
          this.endDate = new Date(this.endDate);
          const currentDate = new Date();

          // Check if the current date is between startDate and endDate
          const isDateInRange =
            currentDate >= this.startDate && currentDate <= this.endDate;

            if (empList[0].reportingManagerId === user.userId) {
              this.showButton = true;
              this.useApi = 0;
              this.managerId = empList[0].reportingManagerId;
              console.log(empList[0].firstName);
              console.log('Is reporting manager');
            } else if (empList[1].reportingManagerId === user.userId) {
              this.showButton = true;
              this.useApi = 1;
              this.managerId = empList[1].reportingManagerId;
              console.log(empList[1].firstName);
              console.log('Is reporting manager');
            } else if (empList[2].reportingManagerId === user.userId) {
              this.showButton = true;
              this.useApi = 2;
              this.managerId = empList[2].reportingManagerId;
              console.log(empList[2].firstName);
              console.log('Is reporting manager');
            } else {
              console.log(empList[0].firstName);
              this.showButton = false;
              console.log('Not a reporting manager');
            }
          if (isDateInRange) {
          } 
          else {
            // Set showButton to false if the current date is not within the range
            this.showButton = false;
            console.log(currentDate);
            console.log(this.endDate);
            console.log('Not within date range');
          }
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );

      // this.sharedDataService.changeUserId(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async handleResponseAsync2(userId: any) {
    try {
      this.userId = userId;
      // this.loadKeyResults();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  openDialog(keyResult: any) {
    // Retrieve tasks based on keyResultId
    console.log(this.showButton.toString());
    let updatedShowButton = this.showButton && this.useApi === 0;
    let panelClass = updatedShowButton.toString();
    console.log(keyResult);
    this.keyResultService
      .getTasksByKeyResultId(keyResult) // Replace 'keyResult.id' with your actual property
      .subscribe((tasks) => {
        // Open the dialog with tasks data
        this.dialog.open(DiaglogoverviewComponent, {
          data: { tasks, panelClass },
        });
      });
  }

  @ViewChild('overallFeedbackModal')
  overallFeedbackModal!: ElementRef;
  feedbackForm: FormGroup;
  feedbackSubmitted: boolean = false;

  submitOverallFeedback() {
    if (this.feedbackForm.valid) {
      const feedbackData = this.feedbackForm.value;
      if (feedbackData.feedback.length > 0) {
        this.feedbackSubmitted = true;
      }
      // You can handle the feedback data as needed, for example, log it
      console.log(
        'Overall Feedback:',
        feedbackData.feedback,
        ' reviewId',
        this.reviewCycleId
      ); //reviewCycleId is windowid

      const feedbackEndpoint = `http://localhost:8080/reviewCycle/addFeedback/${this.useApi}/${this.reviewCycleId}/${this.managerId}`;
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
    this.renderer.setStyle(
      this.overallFeedbackModal.nativeElement,
      'display',
      'block'
    );
    document.body.classList.add('modal-open');
  }

  closeOverallFeedbackModal() {
    this.renderer.removeClass(this.overallFeedbackModal.nativeElement, 'show');
    this.renderer.setStyle(
      this.overallFeedbackModal.nativeElement,
      'display',
      'none'
    );
    document.body.classList.remove('modal-open');
    this.feedbackSubmitted = false;
  }
  calculateNormalizedWeight(weight: number): number {
    // Calculate the sum of all weights
    const totalWeight = this.keyResults.reduce((sum, keyResult) => sum + keyResult.weight, 0);

    // Return the normalized weight
    return Math.round((weight / totalWeight) * 100);
  }
}

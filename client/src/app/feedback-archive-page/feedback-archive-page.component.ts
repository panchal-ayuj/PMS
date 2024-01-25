import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-feedback-archive-page',
  templateUrl: './feedback-archive-page.component.html',
  styleUrl: './feedback-archive-page.component.scss',
})
export class FeedbackArchivePageComponent {
  displayedColumns: string[] = ['userId', 'email', 'managerFeedback', 'rating', 'period', 'financialYear'];
  reviewCycleDataSource = new MatTableDataSource<any>();
  reviews: any;
  userEmail: any;
  userId: any;

  constructor(private service: AuthService, private http: HttpClient) {}

  // Replace this with your actual data

  ngOnInit(): void {
    this.handleAsyncResponse()
      .then(() => {
        this.fetchFeedbackAndRatingList();
      })
      .catch((error) => {
        console.error('Error handling async response:', error);
      });
  }

  fetchFeedbackAndRatingList(): void {
    const userId = this.userId; // Replace with the actual userId or get it dynamically

    this.http
      .get<any[]>(`http://localhost:8080/reviewCycle/list/${userId}`)
      .subscribe(
        (data) => {
          this.reviews = data;
          this.reviewCycleDataSource.data = this.reviews;
          console.log('Users!!!: ', this.reviews);
        },
        (error) => {
          console.error('Error fetching feedback and rating list:', error);
        }
      );
    this.http.get<any>(`http://localhost:8080/api/users/${userId}`).subscribe(
      (data) => {
        this.userEmail = data.email;
        console.log('User Email!!!: ', this.userEmail);
      },
      (error) => {
        console.error('Error fetching feedback and rating list:', error);
      }
    );
  }
  getUserById(userId: any): void {
    console.log(userId);
    if (userId !== null && userId !== undefined && userId !== '') {
    } else {
      console.log('Empty user id');
    }
  }

  async handleAsyncResponse() {
    try {
      // Assume this is an asynchronous method that returns a Promise
      const user = await this.service
        .getUser(localStorage.getItem('token'))
        .toPromise();
      console.log(user);

      this.userId = user.userId;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-parent-viewfeedback',
  templateUrl: './parent-view-feedback.component.html',
  styleUrl: './parent-view-feedback.component.scss'
})
export class ParentViewFeedbackComponent implements OnInit {
  displayedColumns: string[] = ['userId', 'name', 'managerFeedback', 'rating', 'period', 'financialYear'];
  reviewCycleDataSource = new MatTableDataSource<any>();
  reviews: any;
  userName: any;
  userId: any;

  constructor(private http: HttpClient) {}

  // Replace this with your actual data

  ngOnInit(): void {
    this.fetchFeedbackAndRatingList();
  }

  fetchFeedbackAndRatingList(): void {
    const userId = this.userId; // Replace with the actual userId or get it dynamically

    this.http.get<any[]>(`http://localhost:8080/reviewCycle/list/${userId}`).subscribe(
      (data) => {
        this.reviews = data;
        this.reviewCycleDataSource.data = this.reviews;
        console.log("Users!!!: ", this.reviews);
      },
      (error) => {
        console.error('Error fetching feedback and rating list:', error);
      }
    );
    this.http.get<any>(`http://localhost:8080/api/users/${userId}`).subscribe(
      (data) => {
        this.userName = data.firstName + ' ' + data.lastName ;
        console.log("User Email!!!: ", this.userName);
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

  applyFilter(event: any): void {
    const filterValue = event.target.value;
    this.userId = filterValue; // Update the userId property
    this.fetchFeedbackAndRatingList(); // Fetch data based on the new userId
  }
}
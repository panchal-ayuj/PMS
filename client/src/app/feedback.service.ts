// feedback.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private backendUrl = 'http://localhost:8080/reviewCycle';

  constructor(private http: HttpClient,private service:AuthService) { }
  
  

   async getUserId():Promise<number>
   { 
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);
    const user = await this.service.getUser(localStorage.getItem('token')).toPromise();

    //const user = await this.service.getUser(localStorage.getItem('token')).toPromise();
      //console.log(user.userId);
      return user.userId;

      //const isAdmin = user.roles.includes('Admin');
     // const userId=user.
    
    
   }
  // private backendUrl = 'http://localhost:8080/api/tasks';

  getFeedback(userId: number): Observable<any> {
    const url = `${this.backendUrl}/feedbackAndRating/${userId}`;
   
    return this.http.get(url);
  }
}

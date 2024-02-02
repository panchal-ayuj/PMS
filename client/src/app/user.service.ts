import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getUsersByReportingManagerId(reportingManagerId: number): Observable<any[]> {
    const header = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
    const url = `${this.apiUrl}/team-members/${reportingManagerId}`;
    return this.http.get<any[]>(url, {headers: header});
  }

  getUserById(userId: any): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url, {headers: header});
  }
  // Add more methods as needed
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
    private apiUrl = 'http://localhost:8080'; // Update with the correct protocol

    constructor(private http: HttpClient) {}
  
    getUsersAndReportingChain(userId: any): Observable<any> {
      const header = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
      const endpoint = `${this.apiUrl}/api/users/reporting-chain/${userId}`;
      return this.http.get<any>(endpoint, {headers: header});
    }
}

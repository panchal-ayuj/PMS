import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
    private apiUrl = 'http://localhost:8080'; // Update with the correct protocol

    constructor(private http: HttpClient) {}
  
    getUsersAndReportingChain(userId: any): Observable<any> {
      const endpoint = `${this.apiUrl}/api/users/reporting-chain/${userId}`;
      return this.http.get<any>(endpoint);
    }
}

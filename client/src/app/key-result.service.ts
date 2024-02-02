import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyResultService {
  private apiUrl = 'http://localhost:8080/keyResult'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getKeyResults(userId: number, period: string, year: string, status: string): Observable<any[]> {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem("authToken"));
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('period', period)
      .set('year', year)
      .set('status', status);

    return this.http.get<any[]>(`${this.apiUrl}/keyResults`, { params, headers: header });
  }

  getTasksByKeyResultId(keyResultId: number): Observable<any[]> {
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + authToken);
     console.log(header);
    const url = `http://localhost:8080/api/tasks/byKeyResultId/${keyResultId}`;
    return this.http.get<any[]>(url, { headers : header });
  }


  
}

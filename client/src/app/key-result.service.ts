import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyResultService {
  private apiUrl = 'http://localhost:8080/keyResult'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getKeyResults(userId: number, period: string, year: number, status: boolean): Observable<any[]> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('period', period)
      .set('year', year.toString())
      .set('status', status.toString());

    return this.http.get<any[]>(`${this.apiUrl}/keyResults`, { params });
  }

  getTasksByKeyResultId(keyResultId: number): Observable<any[]> {
    const url = `http://localhost:8080/api/tasks/byKeyResultId/${keyResultId}`;
    return this.http.get<any[]>(url);
  }
}

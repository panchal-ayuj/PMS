import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private apiUrl = 'http://localhost:8080/api/users/export';

  constructor(private http: HttpClient) {}

  exportData(): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', `Bearer ${localStorage.getItem("authToken")}`);
    return this.http.get(this.apiUrl,  {headers: header});
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private apiUrl = 'http://localhost:8080/api/users/export';

  constructor(private http: HttpClient) {}

  exportData(): Observable<Blob> {
    return this.http.get(this.apiUrl, { responseType: 'blob' });
  }
}
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private path = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  public signOutExternal = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    console.log('token deleted');
  };

  LoginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(
      this.path + 'LoginWithGoogle',
      JSON.stringify(credentials),
      { headers: header }
    );
  }

  getEmail(googleToken: string): Observable<string> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<string>(
      this.path + 'getEmail',
      JSON.stringify(googleToken),
      { headers: header }
    );
  }

  getAuthToken(googleToken: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<any>(
      this.path + 'getAuthToken',
      JSON.stringify(googleToken),
      { headers: header }
    );
  }

  isUserEmailPresent(email: any): Observable<boolean> {
    return this.httpClient.post<boolean>(
      this.path + 'api/users/checkEmail',
      email
    );
  }

  getUser(googleToken: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const header = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + authToken);
      console.log(header);
      return this.httpClient.get<any>(
        this.path + 'getUser',
        { headers: header }
      );
    } else {
      console.error('Authentication token is missing');
      // Handle the case where the authentication token is missing
    }
    return new Observable<any>();
  }

  searchUsersByName(name: string): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const header = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + authToken);

      const searchQuery = name; // Adjust the API request payload as needed

      return this.httpClient.get<any>(
        `${this.path}api/users/searchUsersByName/${searchQuery}`,
        { headers: header }
      );
    } else {
      console.error('Authentication token is missing');
      return new Observable<any>();
    }
  }

  searchUserIds(userId: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const header = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + authToken);
  
      const searchQuery = userId; // Adjust the API request payload as needed
  
      return this.httpClient.get<any>(
        `${this.path}api/users/searchUsersById/${searchQuery}`,
        { headers: header }
      );
    } else {
      console.error('Authentication token is missing');
      return throwError('Authentication token is missing'); // Update this line
    }
  }
}

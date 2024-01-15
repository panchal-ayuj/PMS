import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private path = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  public signOutExternal = () => {
    localStorage.removeItem("token");
    console.log("token deleted");
  }

  LoginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.path + "LoginWithGoogle", JSON.stringify(credentials), { headers: header});
  }

  getEmail(googleToken: string): Observable<string> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<string>(this.path + 'getEmail', JSON.stringify(googleToken), { headers: header});
  }

  isUserEmailPresent(email: any): Observable<boolean> {
    return this.httpClient.post<boolean>(this.path + "api/users/checkEmail", email);
  }

  getUser(googleToken: any): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<any>(this.path + 'getUser', JSON.stringify(googleToken), { headers: header});
  }
}

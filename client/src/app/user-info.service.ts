import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private userInfoSource = new BehaviorSubject<any>(null);
  currentUserInfo = this.userInfoSource.asObservable();

  changeUserInfo(userInfo: any) {
    this.userInfoSource.next(userInfo);
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private userIdSource = new BehaviorSubject<number>(0);
  currentUserId = this.userIdSource.asObservable();

  changeUserId(userId: any) {
    this.userIdSource.next(userId);
  }
}
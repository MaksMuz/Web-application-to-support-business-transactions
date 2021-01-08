import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject();

  constructor() { }

  sendMsg(product): void {
    this.subject.next(product); // triggering the event
  }

  getMsg(): Observable<any> {
    return this.subject.asObservable();
  }
}

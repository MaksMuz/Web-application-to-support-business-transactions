import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiHelperService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
  }

  get<T>(link: string): Observable<any> {
    return this.http.get<T>(link, { headers: this.getHeaders(), observe: 'response' });
  }

  gett<T>(link: string, params): Observable<any> {
    return this.http.get<T>(link, {headers: this.getHeaders(), observe: 'response', params});
  }

  post<T>(link: string, body: any): Observable<any> {
    return this.http.post<T>(link, body, { headers: this.getHeaders(), observe: 'response' });
  }

  put<T>(link: string, body: any): Observable<any> {
    return this.http.put<T>(link, body, { headers: this.getHeaders(), observe: 'response' });
  }
}

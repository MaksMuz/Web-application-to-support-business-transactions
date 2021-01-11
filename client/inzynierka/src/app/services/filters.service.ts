import { Injectable } from '@angular/core';
import {ApiHelperService} from './api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private baseUrl = 'http://localhost:3000/api/category';
  private getCategoriesUrl = this.baseUrl + '/';
  constructor(private helper: ApiHelperService) { }

  // tslint:disable-next-line:typedef
  getCategories(){
    return this.helper.get<any>(this.getCategoriesUrl);
  }
}

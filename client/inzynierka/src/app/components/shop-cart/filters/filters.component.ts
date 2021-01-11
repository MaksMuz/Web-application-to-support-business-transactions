import { Component, OnInit } from '@angular/core';
import {FiltersService} from '../../../services/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(private filterService: FiltersService) { }

  categoriesNames: any;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.filterService.getCategories()
      .subscribe(
        res => {
          this.categoriesNames = res.body.categories;
        },
        err => console.log(err)
      );
  }
}

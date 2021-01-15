import { Component, OnInit } from '@angular/core';
import {FiltersService} from '../../../services/filters.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(private filterService: FiltersService, private router: Router) { }

  categoriesNames: any;
  valueFrom: number;
  valueTo: number;

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

  filter(): void {
    this.router.navigate(['shop/price'], { queryParams: { valueFrom: this.valueFrom, valueTo: this.valueTo } });
  }
}

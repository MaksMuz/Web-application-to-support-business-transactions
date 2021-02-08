import { Component, OnInit } from '@angular/core';
import {FiltersService} from '../../../services/filters.service';
import {Router} from '@angular/router';
import {MessengerService} from '../../../services/messenger.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(private filterService: FiltersService, private router: Router, private message: MessengerService) { }

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
    if ((this.valueFrom && this.valueTo) && (this.valueFrom < this.valueTo)) {
      this.router.navigate(['shop/price'], {queryParams: {valueFrom: this.valueFrom, valueTo: this.valueTo}});
    } else {
      this.message.info('Value from shouldn\'t be higher than value to and both should be insert');
    }
  }
}

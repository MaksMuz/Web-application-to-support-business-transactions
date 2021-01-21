import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  ordersData: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders() {
    this.orderService.getMyOrders()
      .subscribe(
        res => {
          console.log(res.body);
          this.ordersData = res.body.orders;
        },
        err => console.log(err)
      );
  }
}

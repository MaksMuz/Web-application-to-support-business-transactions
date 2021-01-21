import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  orderData: any;
  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderView(orderId)
      .subscribe(
        res => {
          this.orderData = res.body.order;
        },
        err => console.log(err)
      );
  }
}

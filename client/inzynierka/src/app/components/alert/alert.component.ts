import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(public alert: MessengerService) { }

  ngOnInit(): void {}

}

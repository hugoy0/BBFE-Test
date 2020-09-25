import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSync, faBriefcase } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() sendToTransactions = new EventEmitter<any>();
  public title:string = 'myBank';
  public transactionsArray: Array<any>;
  public faSync = faSync;
  public faBriefcase = faBriefcase;

  constructor() {}

  sendTransfer(arr){
   this.transactionsArray = arr;
  }

  ngOnInit(): void {}

}

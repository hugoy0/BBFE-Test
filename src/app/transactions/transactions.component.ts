import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';


import { Transactions } from '../models/transactions';
import { Transaction } from '../models/transaction';
import { Filter } from '../models/filter';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnChanges {

  @Input() getTransfer: any;

  public transactionArray:Array<Transaction>;
  public step: string;
  public search: string;
  public transactionDate:string;
  public merchant:string;
  public amount:string;
  public lastSort: string;
  public desc: boolean;
  public searchText: Filter;
  
  constructor() {
    this.transactionArray = [];
    Transactions.data.forEach((data, i) => {
      this.transactionArray.push(
        new Transaction(data.amount, data.categoryCode,data.merchant,data.merchantLogo,data.transactionDate,data.transactionType)
      );
    });
  }

  ngOnInit(): void {
    this.lastSort = '';
    this.desc = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.getTransfer != undefined){
      if(changes.getTransfer.previousValue != changes.getTransfer.currentValue){
        this.addTransfer(this.getTransfer);
      }
    }
  }

  sortTable(param) {
    if(param === this.lastSort && this.desc == true){
      if(this.desc == true) this.transactionArray.reverse();
      this.desc = false;
    } else{
      this.lastSort = param;
      this.desc = true;
     (param == 'amount') ? this.transactionArray.sort((a,b) => a[param] - b[param]) : this.transactionArray.sort((a,b) => (a[param] < b[param]) ? -1 : 0);
    }
  }

  addTransfer(str: string) {
    const arr = JSON.parse(str);
    this.transactionArray.splice(0,0, new Transaction(arr.amount, arr.categoryCode, arr.merchant, arr.merchantLogo, arr.transactionDate, arr.transactionType));
  }

  setArray() {
    return this.transactionArray;
  }

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { Constants } from './constants';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  public fromAccount: string;
  public fromAmount: number;
  public labelFromAccount: string;
  public labelToAccount: string;
  public labelAmount: string;
  public placeholderToAccount: string;
  public placeholderAmount: string;
  public currencyAmount: number;
  public transaction:any;

  public errAmount: boolean;

  public transferForm: FormGroup;
  
  constructor(private builder: FormBuilder) {
    this.labelFromAccount = Constants.labels.fromAccount;
    this.labelToAccount = Constants.labels.toAccount;
    this.labelAmount = Constants.labels.amount;
    this.fromAccount = Constants.values.fromAccount;
    this.placeholderToAccount = Constants.placeholder.toAccount;
    this.placeholderAmount = Constants.placeholder.amount;
    this.fromAmount = 5824.76;

    this.transaction = {};
  }

  @Output() sendNewTransfer = new EventEmitter<any>();

  ngOnInit(): void {
    this.transferForm = this.builder.group({
      merchant: new FormControl('', [Validators.required, Validators.minLength(4)]),
      amount: new FormControl('', Validators.required)
    });
    this.errAmount = false;
  }

  sendTransfer(obj: any) {
    const validateWidthraw = this.widthrawAmount(obj.amount);
    if(!validateWidthraw) {
      this.errAmount = true;
    } else {
      this.transaction = {
        merchant: obj.merchant,
        amount: obj.amount,
        transactionDate: new Date().getTime(),
        merchantLogo: 'https://via.placeholder.com/150',
        categoryCode: '#ccc',
        transactionType: 'OnlineTransfer'
      }

      this.sendNewTransfer.emit(JSON.stringify(this.transaction));
    }
  }

  submitForm() {
    this.sendTransfer(this.transferForm.value);
    this.transferForm.reset();
  }

  widthrawAmount(str: string) {
    const newNum = parseFloat(str);
    
    return (!isNaN(newNum) && newNum <= 500) ? this.fromAmount = this.fromAmount - newNum :  false;
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
	selector: 'app-payment-to-bankaccount-dialog',
	templateUrl: './payment-to-bankaccount-dialog.component.html',
	styleUrls: ['./payment-to-bankaccount-dialog.component.scss']
})
export class PaymentToBankaccountDialogComponent implements OnInit {
	constructor(public dialogRef: MatDialogRef<PaymentToBankaccountDialogComponent>) {}

	ngOnInit() {}

	closeDialog() {
		this.dialogRef.close();
	}
}

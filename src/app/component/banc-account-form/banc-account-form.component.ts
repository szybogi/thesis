import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-banc-account-form',
	templateUrl: './banc-account-form.component.html',
	styleUrls: ['./banc-account-form.component.scss']
})
export class BancAccountFormComponent implements OnInit {
	constructor() {}
	walletForm = new FormGroup({
		walletName: new FormControl(''),
		walletOwner: new FormControl(''),
		walletIndividual: new FormControl(''),
		walletOtherOwner: new FormControl(''),
		walletBalance: new FormControl('')
	});
	onSubmit() {
		console.warn(this.walletForm.value);
	}
	ngOnInit() {}
}

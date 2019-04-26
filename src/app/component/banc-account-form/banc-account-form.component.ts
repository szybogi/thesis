import { DatabaseService } from './../../service/database.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { defineBase } from '@angular/core/src/render3';

@Component({
	selector: 'app-banc-account-form',
	templateUrl: './banc-account-form.component.html',
	styleUrls: ['./banc-account-form.component.scss']
})
export class BancAccountFormComponent implements OnInit {
	constructor(public databaseService: DatabaseService) {}
	walletForm = new FormGroup({
		walletName: new FormControl(''),
		walletOwner: new FormControl(''),
		walletIndividual: new FormControl(''),
		walletOtherOwner: new FormControl(''),
		walletBalance: new FormControl('')
	});

	onSubmit() {
		const wal = this.walletForm.value;
		console.log(this.walletForm.value);
		// console.warn(this.walletForm.value);
	}
	ngOnInit() {}
}

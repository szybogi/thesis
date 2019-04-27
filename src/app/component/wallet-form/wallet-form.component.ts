import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { defineBase } from '@angular/core/src/render3';

@Component({
	selector: 'app-wallet-form',
	templateUrl: './wallet-form.component.html',
	styleUrls: ['./wallet-form.component.scss']
})
export class WalletFormComponent implements OnInit {
	constructor(private formBuilder: FormBuilder) {}
	@Input()
	parent: FormGroup;

	wallet: FormGroup;

	ngOnInit() {
		this.wallet = this.formBuilder.group({
			name: ['', [], []],
			individual: ['', []],
			otherOwner: ['', []]
		});
		this.parent.addControl('wallet', this.wallet);
	}
}

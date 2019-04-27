import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { defineBase } from '@angular/core/src/render3';
import { DatabaseService } from 'src/app/service/database.service';
import { validateObservable } from 'src/app/validator/observable.validator';
import {
	filter,
	flatMap,
	tap,
	share,
	finalize,
	shareReplay,
	map,
	take,
	switchMap,
	delay,
	endWith,
	first
} from 'rxjs/operators';
import { of, timer, zip } from 'rxjs';

@Component({
	selector: 'app-wallet-form',
	templateUrl: './wallet-form.component.html',
	styleUrls: ['./wallet-form.component.scss']
})
export class WalletFormComponent implements OnInit {
	constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {}

	@Input()
	parent: FormGroup;

	wallet: FormGroup;

	ngOnInit() {
		this.wallet = this.formBuilder.group({
			name: [
				'',
				[Validators.required],
				[
					(ctrl: AbstractControl) =>
						of(ctrl).pipe(
							delay(200),
							switchMap(c => this.databaseService.wallets$.pipe(first())),
							flatMap(wallets => wallets),
							filter(wallet => wallet.name === ctrl.value),
							map(res => (res ? { taken: true } : undefined)),
							endWith(undefined),
							first()
						)
				]
			],
			individual: ['', []],
			otherOwner: ['', []]
		});
		this.parent.addControl('wallet', this.wallet);
	}
}

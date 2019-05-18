import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/service/database.service';
import { Observable } from 'rxjs';
import { Wallet } from 'src/app/model/wallet.interface';

@Component({
	selector: 'app-lockup-form',
	templateUrl: './lockup-form.component.html',
	styleUrls: ['./lockup-form.component.scss']
})
export class LockupFormComponent implements OnInit {
	public wallets$: Observable<Wallet[]>;
	lockup = this.formBuilder.group({
		id: ['', []],
		walletRef: ['', [Validators.required]],
		interest: [null, [Validators.required, Validators.min(0.1)]],
		amount: [null, [Validators.required, Validators.min(1)]],
		start: ['', [Validators.required]],
		end: [null, [Validators.required, Validators.min(1)]],
		status: ['', []]
	});
	constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
		this.wallets$ = this.databaseService.walletsReplayed$;
	}
	@Input()
	parent: FormGroup;

	ngOnInit(): void {
		this.parent.addControl('lockup', this.lockup);
	}

	get isIdDefined() {
		return this.lockup.controls.id.value === '' || this.lockup.controls.id.value === null;
	}
}

import {
	Component,
	OnInit,
	Input,
	ChangeDetectorRef,
	HostListener,
	AfterViewInit,
	ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DatabaseService } from 'src/app/service/database.service';
import { filter, flatMap, map, switchMap, delay, endWith, first, tap, switchMapTo, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';
import { walletSchema } from 'src/app/model/wallet.interface';
import { createHostListener } from '@angular/compiler/src/core';

@Component({
	selector: 'app-wallet-form',
	templateUrl: './wallet-form.component.html',
	styleUrls: ['./wallet-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class WalletFormComponent implements OnInit, AfterViewInit {
	constructor(
		private formBuilder: FormBuilder,
		private databaseService: DatabaseService,
		private cd: ChangeDetectorRef
	) {}

	@Input()
	parent: FormGroup;

	wallet: FormGroup;
	ngOnInit(): void {
		this.wallet = this.formBuilder.group({
			id: ['', []],
			name: [
				'',
				[Validators.required],
				[
					(ctrl: AbstractControl) =>
						of(ctrl).pipe(
							delay(200),
							switchMapTo(this.databaseService.walletsReplayed$.pipe(first())),
							flatMap(wallets => wallets),
							filter(wallet => {
								if (ctrl.parent.controls['id'].value) {
									return wallet.name === ctrl.value && wallet.id !== ctrl.parent.controls['id'].value;
								} else {
									return wallet.name === ctrl.value;
								}
							}),
							map(res => ({ taken: true })),
							endWith(undefined as {}),
							first()
						)
				]
			],
			individual: [
				'',
				[
					Validators.required,
					ctrl => {
						if (this.wallet !== undefined && this.wallet.controls.individual) {
							this.wallet.controls.otherOwner.updateValueAndValidity();
						}
					}
				]
			],
			otherOwner: [
				'',
				[
					ctrl => {
						if (this.wallet !== undefined && this.wallet.controls.individual) {
							const res =
								!this.wallet.controls.individual.value ||
								(this.wallet.controls.individual.value === 'common' && !ctrl.value)
									? { required: true }
									: undefined;
							return res;
						} else {
							return undefined;
						}
					}
				]
			]
		});
		this.parent.addControl('wallet', this.wallet);
	}

	@HostListener('keyup', ['$event'])
	public keyUp($event) {
		this.cd.markForCheck();
		this.cd.detectChanges();
	}

	ngAfterViewInit() {}

	get isCommon() {
		return this.wallet && this.wallet.controls.individual.value === 'common' ? 'visible' : 'hidden';
	}

	get isIdDefined() {
		return this.wallet.controls.id.value === '' || this.wallet.controls.id.value === null;
	}
}

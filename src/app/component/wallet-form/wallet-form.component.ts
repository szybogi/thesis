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
import { filter, flatMap, map, switchMap, delay, endWith, first } from 'rxjs/operators';
import { of } from 'rxjs';

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
			name: [
				'',
				[Validators.required],
				[
					(ctrl: AbstractControl) =>
						of(ctrl).pipe(
							delay(200),
							switchMap(c => this.databaseService.walletsReplayed$.pipe(first())),
							flatMap(wallets => wallets),
							filter(wallet => wallet.name === ctrl.value),
							map(res => (res ? { taken: true } : undefined)),
							endWith(undefined),
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
						console.log(this.wallet);
						if (this.wallet !== undefined && this.wallet.controls.individual) {
							console.log(this.wallet.controls.individual.value);
							console.log(ctrl.value);
							const res =
								!this.wallet.controls.individual.value ||
								(this.wallet.controls.individual.value === 'common' && !ctrl.value)
									? { required: true }
									: undefined;
							// this.cd.markForCheck();

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
}

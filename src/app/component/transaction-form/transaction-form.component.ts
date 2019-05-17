import { filter, map, distinct, flatMap, tap, shareReplay, toArray, startWith } from 'rxjs/operators';
import { Transaction } from 'src/app/model/transaction.class';
import { Moment } from 'moment';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/service/database.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Wallet } from 'src/app/model/wallet.interface';

export interface Category {
	type: string;
	names: string[];
}

export interface Subcategory {
	category: string;
	names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
	const filterValue = value.toLowerCase();

	return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
	selector: 'app-transaction-form',
	templateUrl: './transaction-form.component.html',
	styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
	public wallets$: Observable<Wallet[]>;

	transaction = this.formBuilder.group({
		id: ['', []],
		name: ['', [Validators.required]],
		walletRef: ['', [Validators.required]],
		type: ['', [Validators.required]],
		category: ['', [Validators.required]],
		subcategory: ['', [Validators.required]],
		date: ['', [Validators.required]],
		amount: [null, [Validators.required, Validators.min(1)]],
		target: ['', []],
		transfer: [false, []]
	});

	categories: Category[] = [
		{
			type: 'Bevétel',
			names: ['Munkahelyi', 'Szociális', 'Egyéb']
		},
		{
			type: 'Kiadás',
			names: ['Bevásárlás', 'Közlekedés', 'Lakhatás', 'Nyaralás', 'Program', 'Képzés', 'Egyéb']
		}
	];

	subcategories: Subcategory[] = [
		{
			category: 'Munkahelyi',
			names: ['Munkabér', 'Prémium', 'Kafetéria', 'Egyéb']
		},
		{
			category: 'Szociális',
			names: ['Segély', 'Családi pótlék', 'Támogatás', 'Egyéb']
		},
		{
			category: 'Bevásárlás',
			names: ['Élelmiszer', 'Tisztítószer', 'Ruha', 'Állat eledel', 'Egyéb']
		},
		{
			category: 'Közlekedés',
			names: ['Tömegközlekedés', 'Benzin', 'Pályamatrica', 'Parkolás', 'Egyéb']
		},
		{
			category: 'Lakhatás',
			names: ['Lakbér', 'Rezsi', 'Egyéb']
		},
		{
			category: 'Nyaralás',
			names: ['Szállás', 'Utazás', 'Programok', 'Étkezés', 'Egyéb']
		},
		{
			category: 'Program',
			names: ['Egyedül', 'Családi', 'Baráti', 'Munkahelyi', 'Egyéb']
		},
		{
			category: 'Képzés',
			names: ['Tandíj', 'Tankönyv', 'Egyéb']
		},
		{
			category: 'Edzés',
			names: ['Bérlet', 'Ruha', 'Felszerelés', 'Táplálékkiegészítő', 'Egyéb']
		}
	];

	categoryOptions: Observable<Category[]>;
	subcategoryOptions: Observable<Subcategory[]>;

	constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
		this.wallets$ = this.databaseService.walletsReplayed$;
	}

	@Input()
	parent: FormGroup;

	ngOnInit(): void {
		this.parent.addControl('transaction', this.transaction);

		this.categoryOptions = this.transaction.get('category')!.valueChanges.pipe(
			startWith(''),
			map(value => this._categoryFilterGroup(value))
		);

		this.subcategoryOptions = this.transaction.get('subcategory')!.valueChanges.pipe(
			startWith(''),
			map(value => this._subcategoryFilterGroup(value))
		);
	}

	private _categoryFilterGroup(value: string): Category[] {
		if (value) {
			return this.categories
				.map(group => ({ type: group.type, names: _filter(group.names, value) }))
				.filter(group => group.names.length > 0);
		}

		return this.categories;
	}
	private _subcategoryFilterGroup(value: string): Subcategory[] {
		if (value) {
			return this.subcategories
				.map(group => ({ category: group.category, names: _filter(group.names, value) }))
				.filter(group => group.names.length > 0);
		}

		return this.subcategories;
	}

	get isIdDefined() {
		return this.transaction.controls.id.value === '' || this.transaction.controls.id.value === null;
	}
}

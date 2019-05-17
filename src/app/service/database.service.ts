import { transition } from '@angular/animations';
import { Wallet, walletSchema } from '../model/wallet.interface';
import { Database, WalletCollection, DatabaseCollection, TransactionCollection, UserCollection } from './database.d';
import { Injectable } from '@angular/core';
import RxDB, { RxDatabase, RxDocument } from 'rxdb';
import * as idb from 'pouchdb-adapter-idb';
import { from, Observable, zip, Subject, BehaviorSubject, of } from 'rxjs';
import {
	tap,
	share,
	switchMap,
	delayWhen,
	map,
	withLatestFrom,
	flatMap,
	startWith,
	take,
	shareReplay
} from 'rxjs/operators';
import * as moment from 'moment';
import { transactionSchema, Transaction } from '../model/transaction.class';
import { userSchema } from '../model/user.interface';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	private wId = 2;
	public database$: Observable<RxDatabase<DatabaseCollection>> = of(RxDB.plugin(idb)).pipe(
		switchMap(() => RxDB.create<DatabaseCollection>({ name: 'db', adapter: 'idb' })),
		delayWhen(db => from(db.collection<WalletCollection>({ name: 'wallet', schema: walletSchema }))),
		delayWhen(db => from(db.collection<TransactionCollection>({ name: 'transaction', schema: transactionSchema }))),
		delayWhen(db => from(db.collection<UserCollection>({ name: 'user', schema: userSchema }))),
		delayWhen(db => this.init(db)),
		shareReplay(1)
	);
	public currentUser = new BehaviorSubject<string>('Teszt');
	public walletSaver = new Subject<Wallet>();
	public walletDeleter = new Subject<Wallet>();
	public transactionSaver = new Subject<Transaction>();
	public transactionDeleter = new Subject<Transaction>();
	public walletsReplayed$ = this.database$.pipe(
		switchMap(db => db.wallet.find().$),
		shareReplay(1)
	);
	public transactionsReplayed$ = this.database$.pipe(
		switchMap(db => db.transaction.find().$),
		shareReplay(1)
	);
	public transactions$ = this.database$.pipe(
		switchMap(db => db.transaction.find().$),
		share()
	);
	public transactionsUpdates$ = this.database$.pipe(
		switchMap(db => db.transaction.update$),
		share()
	);
	public wallets$ = this.database$.pipe(
		switchMap(db => db.wallet.find().$),
		share()
	);
	public transactionNextId$ = this.transactionsReplayed$.pipe(
		map(
			transactions =>
				`${transactions
					.map(transaction => Number(transaction.id))
					.reduce((acc, next) => (acc < next ? next : acc), 0) + 1}`
		),
		startWith('1')
	);

	public constructor() {
		this.walletSaver
			.pipe(
				tap(wallet => (wallet.owner = this.currentUser.value)),

				tap(wallet => {
					if (!wallet.id) {
						wallet.id = String(this.wId);
						this.wId++;
					}
				}),
				withLatestFrom(this.database$),
				switchMap(([wallet, db]) => db.wallet.upsert(wallet))
			)
			.subscribe(next => {
				console.log('New wallet saved!!');
				console.log(next);
			});

		this.walletDeleter
			.pipe(
				withLatestFrom(this.database$),
				switchMap(([wallet, db]) => db.wallet.find({ name: wallet.name }).$.pipe(take(1))),
				flatMap(walletDocs => walletDocs),
				tap(d => console.log('Wallet deleter, removes: ' + d)),
				switchMap(walletDoc => walletDoc.remove())
			)
			.subscribe(next => {
				console.log(`Wallet deleted? ${next}`);
			});

		this.transactionSaver
			.pipe(
				withLatestFrom(this.transactionNextId$),
				tap(([transaction, id]) => !transaction.id && (transaction.id = id)),
				map(([transaction]) => transaction),
				withLatestFrom(this.database$),
				switchMap(([transaction, db]) => db.transaction.upsert(transaction))
			)
			.subscribe(next => {
				console.log('New transaction saved!!');
				console.log(next);
			});

		this.transactionDeleter
			.pipe(
				withLatestFrom(this.database$),
				switchMap(([transaction, db]) => db.transaction.find({ id: transaction.id }).$.pipe(take(1))),
				flatMap(transactions => transactions),
				tap(d => console.log('Transaction deleter, removes: ' + d)),
				switchMap(transaction => transaction.remove())
			)
			.subscribe(next => {
				console.log(`Transaction deleted? ${next}`);
			});
	}

	private init(db: RxDatabase<DatabaseCollection>) {
		const testWalletUpsert = db.wallet.upsert({
			id: '1',
			owner: this.currentUser.value,
			name: 'Készpénz',
			individual: 'unique',
			otherOwner: ''
		});
		const testUser = db.user.upsert({
			id: '1',
			name: 'Teszt',
			email: 'test@test.com'
		});

		return zip(testWalletUpsert, testUser);
	}
}

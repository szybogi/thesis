import { Wallet, walletSchema } from '../model/wallet.interface';
import { Database, WalletCollection, DatabaseCollection, TransactionCollection } from './database.d';
import { Injectable } from '@angular/core';
import RxDB, { RxDatabase, RxDocument } from 'rxdb';
import * as idb from 'pouchdb-adapter-idb';
import { from, Observable, zip, Subject, BehaviorSubject, of } from 'rxjs';
import { tap, share, switchMap, delayWhen, map, withLatestFrom, flatMap, startWith, take } from 'rxjs/operators';
import { transactionSchema } from '../model/transaction.class';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	public database$: Observable<RxDatabase<DatabaseCollection>> = of(RxDB.plugin(idb)).pipe(
		switchMap(() => RxDB.create<DatabaseCollection>({ name: 'db', adapter: 'idb' })),
		delayWhen(db => from(db.collection<WalletCollection>({ name: 'wallet', schema: walletSchema }))),
		delayWhen(db => from(db.collection<TransactionCollection>({ name: 'transaction', schema: transactionSchema }))),
		tap(db => {
			db.wallet.postInsert(async function postCreateHook(this: WalletCollection, wallet) {
				console.log(`Post Insert ${wallet.name}`);
			}, true);
			db.wallet.postCreate(async function postCreateHook(this: WalletCollection, wallet) {
				console.log(`Post Create ${wallet.name}`);
			});
			db.wallet.preSave(async function preSaveHook(this: WalletCollection, wallet) {
				console.log(`Pre Save ${wallet.name}`);
			}, true);
			db.wallet.preInsert(async function preInsertHook(this: WalletCollection, wallet) {
				console.log(`Before inserting ${wallet.name}`);
			}, true);
			db.wallet.postInsert(
				function myPostInsertHook(
					this: WalletCollection,
					wallet,
					document // RxDocument
				) {
					console.log('insert to ' + this.name + '-collection: ' + document.name);
				},
				false // not async
			);
		}),
		delayWhen(db => this.init(db)),
		share()
	);
	public currentUser = new BehaviorSubject<string>('Bogi');
	public walletSaver = new Subject<Wallet>();
	public walletDeleter = new Subject<Wallet>();
	public wallets$ = this.database$.pipe(
		switchMap(db => db.wallet.find().$),
		share()
	);
	public walletNextId$ = this.wallets$.pipe(
		map(
			wallets =>
				`${wallets.map(wallet => Number(wallet.id)).reduce((acc, next) => (acc < next ? next : acc), 0) + 1}`
		),
		startWith('1')
	);

	public constructor() {
		this.walletSaver
			.pipe(
				tap(wallet => (wallet.owner = this.currentUser.value)),
				tap(wallet => {
					if (typeof wallet.individual === 'string') {
						wallet.individual = wallet.individual === 'true';
					}
				}),
				withLatestFrom(this.walletNextId$),
				tap(([wallet, id]) => !wallet.id && (wallet.id = id)),
				map(([wallet]) => wallet),
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
	}

	private init(db: RxDatabase<DatabaseCollection>) {
		const testWalletUpsert = db.wallet.upsert({
			id: '1',
			owner: 'Bogi',
			name: 'Készpénz',
			individual: true,
			otherOwner: ''
		});
		return zip(testWalletUpsert);
	}
}

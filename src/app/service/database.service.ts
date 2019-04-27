import { Wallet, walletSchema } from '../model/wallet.interface';
import { Database, WalletCollection, DatabaseCollection, TransactionCollection } from './database.d';
import { Injectable } from '@angular/core';
import RxDB, { RxDatabase, RxDocument } from 'rxdb';
import * as idb from 'pouchdb-adapter-idb';
import { from, Observable, zip, Subject, BehaviorSubject } from 'rxjs';
import { tap, share, switchMap, delayWhen, map, withLatestFrom, flatMap } from 'rxjs/operators';
import { transactionSchema } from '../model/transaction.class';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	public database$: Observable<RxDatabase<DatabaseCollection>>;
	public currentUser = new BehaviorSubject<string>('Bogi');
	public walletSaver = new Subject<Wallet>();
	public walletDeleter = new Subject<Wallet>();

	public constructor() {
		RxDB.plugin(idb);
		this.database$ = from(RxDB.create<DatabaseCollection>({ name: 'db', adapter: 'idb' })).pipe(
			delayWhen(db => from(db.collection<WalletCollection>({ name: 'wallet', schema: walletSchema }))),
			delayWhen(db =>
				from(db.collection<TransactionCollection>({ name: 'transaction', schema: transactionSchema }))
			),
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

		this.walletSaver
			.pipe(
				tap(wallet => (wallet.owner = this.currentUser.value)),
				tap(wallet => {
					if (typeof wallet.individual === 'string') {
						wallet.individual = wallet.individual === 'true';
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
				switchMap(([wallet, db]) => db.wallet.find({ name: wallet.name }).$),
				flatMap(walletDocs => walletDocs),
				switchMap(walletDoc => walletDoc.remove())
			)
			.subscribe(next => {
				console.log(`Wallet deleted? ${next}`);
			});
	}

	private init(db: RxDatabase<DatabaseCollection>) {
		const testWalletUpsert = db.wallet.upsert({
			owner: 'Bogi',
			name: 'Készpénz',
			individual: true,
			otherOwner: ''
		});
		return zip(testWalletUpsert);
	}
}

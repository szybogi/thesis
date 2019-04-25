import { Wallet, walletSchema } from '../model/wallet.interface';
import { Database, WalletCollection, DatabaseCollection, TransactionCollection } from './database.d';
import { Injectable } from '@angular/core';
import RxDB, { RxDatabase, RxDocument } from 'rxdb';
import * as idb from 'pouchdb-adapter-idb';
import { from, Observable, zip } from 'rxjs';
import { tap, share, switchMap, delayWhen } from 'rxjs/operators';
import { transactionSchema } from '../model/transaction.class';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	public database$: Observable<Database>;
	constructor() {
		RxDB.plugin(idb);
		this.database$ = from(RxDB.create<DatabaseCollection>({ name: 'db', adapter: 'idb' })).pipe(
			delayWhen(db => from(db.collection<WalletCollection>({ name: 'wallet', schema: walletSchema }))),
			delayWhen(db =>
				from(db.collection<TransactionCollection>({ name: 'transaction', schema: transactionSchema }))
			),
			delayWhen(db => this.init(db)),
			share()
		);
	}
	init(db: RxDatabase<DatabaseCollection>) {
		const testWalletUpsert = db.wallet.upsert({ name: 'Test' });
		const test2WalletUpsert = db.wallet.upsert({ name: 'Test2' });
		return zip(testWalletUpsert, test2WalletUpsert);
	}
}

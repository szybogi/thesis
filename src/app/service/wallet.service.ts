import { Injectable } from '@angular/core';
import { Observable, combineLatest, from } from 'rxjs';
import { RxDocument } from 'rxdb';
import { Wallet } from '../model/wallet.interface';
import { Transaction } from '../model/transaction.class';
import { flatMap, map, toArray, filter } from 'rxjs/operators';
import { DatabaseService } from './database.service';

@Injectable({
	providedIn: 'root'
})
export class WalletService {
	public walletsWithTransactions$: Observable<
		{ wallet: RxDocument<Wallet>; transactions: RxDocument<Transaction>[] }[]
	>;
	constructor(private databaseService: DatabaseService) {
		this.walletsWithTransactions$ = combineLatest([
			this.databaseService.walletsReplayed$,
			this.databaseService.transactionsReplayed$
		]).pipe(
			flatMap(([wallets, transactions]) =>
				from(wallets).pipe(
					map(wallet => ({
						wallet,
						transactions: transactions.filter(transaction => transaction.walletRef === wallet.id)
					})),
					toArray()
				)
			)
		);
	}

	public walletWithTransactions(walletId: string) {
		return this.walletsWithTransactions$.pipe(
			flatMap(a => a),
			filter(({ wallet }) => wallet.id === walletId)
		);
	}

	public sum(transactions: RxDocument<Transaction>[]) {
		return transactions
			.map(transaction => (transaction.type === 'Bevétel' ? transaction.amount : -transaction.amount))
			.reduce((acc, next) => acc + next, 0);
	}
}

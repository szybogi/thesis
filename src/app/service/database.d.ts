import { Transaction } from 'src/app/model/transaction.class';
import { Wallet } from '../model/wallet.interface';
import { RxDatabaseBase, RxCollection, RxDocument } from 'rxdb';

export type Database = RxDatabaseBase<DatabaseCollection>;
export interface DatabaseCollection {
	wallet: WalletCollection;
	transaction: TransactionCollection;
}

export type WalletCollection = RxCollection<Wallet>;
export type WalletDocument = RxDocument<Wallet>;
export type TransactionCollection = RxCollection<Transaction>;
export type TransactionDocument = RxDocument<Transaction>;

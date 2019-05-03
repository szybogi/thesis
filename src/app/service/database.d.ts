import { Transaction } from 'src/app/model/transaction.class';
import { Wallet } from '../model/wallet.interface';
import { RxDatabaseBase, RxCollection, RxDocument } from 'rxdb';
import { Category } from '../model/category.interface';

export type Database = RxDatabaseBase<DatabaseCollection>;
export interface DatabaseCollection {
	wallet: WalletCollection;
	transaction: TransactionCollection;
	category: CategoryCollection;
}

export type WalletCollection = RxCollection<Wallet>;
export type WalletDocument = RxDocument<Wallet>;
export type TransactionCollection = RxCollection<Transaction>;
export type TransactionDocument = RxDocument<Transaction>;
export type CategoryCollection = RxDocument<Category>;
export type CategoryDocument = RxDocument<Category>;

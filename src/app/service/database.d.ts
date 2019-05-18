import { UserCollection } from './database.d';
import { Transaction } from 'src/app/model/transaction.class';
import { Wallet } from '../model/wallet.interface';
import { RxDatabaseBase, RxCollection, RxDocument } from 'rxdb';
import { User } from '../model/user.interface';
import { Lockup } from '../model/lockup.interface';

export type Database = RxDatabaseBase<DatabaseCollection>;
export interface DatabaseCollection {
	wallet: WalletCollection;
	transaction: TransactionCollection;
	user: UserCollection;
	lockup: LockupCollection;
}

export type WalletCollection = RxCollection<Wallet>;
export type WalletDocument = RxDocument<Wallet>;
export type TransactionCollection = RxCollection<Transaction>;
export type TransactionDocument = RxDocument<Transaction>;
export type UserCollection = RxCollection<User>;
export type UserDocument = RxCollection<User>;
export type LockupCollection = RxCollection<Lockup>;
export type LockupDocument = RxCollection<Lockup>;

import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './module/app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'ngx-moment';
import { AgGridModule } from 'ag-grid-angular';

import * as Hammer from 'hammerjs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { MaterialModule } from './module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionListComponent } from './component/transaction-list/transaction-list.component';
import { TransactionPageComponent } from './component/page/transaction-page/transaction-page.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import { MenuComponent } from './component/menu/menu.component';
import { MatIconRegistry } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WalletPageComponent } from './component/page/wallet-page/wallet-page.component';
import { WalletComponent } from './component/wallet/wallet.component';
import { LockupComponent } from './component/lockup/lockup.component';
import { LockupPageComponent } from './component/page/lockup-page/lockup-page.component';
import { FinancialStatementPageComponent } from './component/page/financial-statement-page/financial-statement-page.component';
import { WalletFormComponent } from './component/wallet-form/wallet-form.component';
import { TransactionFormComponent } from './component/transaction-form/transaction-form.component';
import { TransactionDeleteRendererComponent } from './component/renderer/transaction-delete-renderer/transaction-delete-renderer.component';
// tslint:disable-next-line: max-line-length
import { PaymentToBankaccountDialogComponent } from './component/dialog/payment-to-bankaccount-dialog/payment-to-bankaccount-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDataComponent } from './component/dialog/user-data/user-data.component';
import { LockupFormComponent } from './component/lockup-form/lockup-form.component';
import { LockupBreakupRendererComponent } from './component/renderer/lockup-breakup-renderer/lockup-breakup-renderer.component';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponentComponent } from './component/line-chart-component/line-chart-component.component';
export class MyHammerConfig extends HammerGestureConfig {
	overrides = <any>{
		pan: { direction: Hammer.DIRECTION_ALL },
		swipe: { velocity: 0.4, threshold: 20 } // override default settings
	};
}
registerLocaleData(localeHu, 'hu');
@NgModule({
	declarations: [
		AppComponent,
		TransactionListComponent,
		TransactionPageComponent,
		MenuComponent,
		WalletPageComponent,
		WalletComponent,
		LockupComponent,
		LockupPageComponent,
		FinancialStatementPageComponent,
		WalletFormComponent,
		TransactionFormComponent,
		TransactionDeleteRendererComponent,
		PaymentToBankaccountDialogComponent,
		UserDataComponent,
		LockupFormComponent,
		LockupBreakupRendererComponent,
		LineChartComponentComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		AgGridModule.withComponents([]),
		MomentModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		FontAwesomeModule,
		HttpClientModule,
		ChartsModule
	],
	providers: [
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: MyHammerConfig
		}
	],
	entryComponents: [
		TransactionDeleteRendererComponent,
		PaymentToBankaccountDialogComponent,
		UserDataComponent,
		LockupBreakupRendererComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor() {
		library.add(fas, far);
	}
}

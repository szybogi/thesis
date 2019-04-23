import { FinancialStatementPageComponent } from './../component/page/financial-statement-page/financial-statement-page.component';
import { WalletPageComponent } from './../component/page/wallet-page/wallet-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ListPageComponent } from '../component/page/list-page/list-page.component';
import { LockupPageComponent } from '../component/page/lockup-page/lockup-page.component';

const routes: Route[] = [
	{ path: '', redirectTo: '/wallet', pathMatch: 'full' },
	{ path: 'wallet', component: WalletPageComponent },
	{ path: 'list', component: ListPageComponent },
	{ path: 'lockup', component: LockupPageComponent },
	{ path: 'financial-statement', component: FinancialStatementPageComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}

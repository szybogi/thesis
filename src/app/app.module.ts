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
import { HelloComponent } from './component/hello/hello.component';
import { TransactionComponent } from './component/transaction/transaction.component';
import { ListComponent } from './component/list/list.component';
import { ListPageComponent } from './component/page/list-page/list-page.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';

export class MyHammerConfig extends HammerGestureConfig {
	overrides = <any>{
		pan: { direction: Hammer.DIRECTION_ALL },
		swipe: { velocity: 0.4, threshold: 20 } // override default settings
	};
}
registerLocaleData(localeHu, 'hu');
@NgModule({
	declarations: [AppComponent, HelloComponent, TransactionComponent, ListComponent, ListPageComponent],
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		AgGridModule.withComponents([]),
		MomentModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	providers: [
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: MyHammerConfig
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor() {
		library.add(fas, far);
	}
}

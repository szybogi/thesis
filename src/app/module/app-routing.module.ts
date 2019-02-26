import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HelloComponent } from '../component/hello/hello.component';
import { ListPageComponent } from '../component/page/list-page/list-page.component';

const routes: Route[] = [
	{ path: '', redirectTo: '/list', pathMatch: 'full' },
	{ path: 'hello', component: HelloComponent },
	{ path: 'list', component: ListPageComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}

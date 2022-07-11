import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATH_MY_ACCOUNT_PAGES } from './../../commons/config/path-pages';
import { MyAccountComponent } from './my-account.component';

export const routes: Routes = [
	{
		path: '',
		component: MyAccountComponent,
		children: [
			{
				path: PATH_MY_ACCOUNT_PAGES.changePassword.onlyPath,
				loadChildren: () =>
					import('./account-change-password-page/account-change-password-page.module').then(
						(m) => m.AccountChangePasswordPageModule
					)
			},
			{
				path: PATH_MY_ACCOUNT_PAGES.buyPage.onlyPath,
				loadChildren: () =>
					import('./account-buy-page/account-buy-page.module').then(
						(m) => m.AccountBuyPageModule
					)
			},

			{
				path: '',
				redirectTo: PATH_MY_ACCOUNT_PAGES.changePassword.onlyPath
			}
		]
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MyAccountRoutingModule {}

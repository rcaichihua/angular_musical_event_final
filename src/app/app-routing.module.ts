import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	PATHS_AUTH_PAGES,
	PATH_BUY_PAGES,
	PATH_MAINTENANCE_PAGES,
	PATH_MY_ACCOUNT_PAGES,
	PATH_NOT_FOUND_PAGE
} from './commons/config/path-pages';
import { AuthGuard } from './commons/guards/auth.guard';
import { BuyGuard } from './commons/guards/buy.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
	{
		path: '',
		canActivate: [BuyGuard],
		component: HomePageComponent
	},
	{
		path: PATHS_AUTH_PAGES.loginPage.onlyPath,
		loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule)
	},
	{
		path: PATHS_AUTH_PAGES.registerPage.onlyPath,
		loadChildren: () => import('./pages/register-page/register-page.module').then((m) => m.RegisterPageModule)
	},
	{
		path: `${PATHS_AUTH_PAGES.recoverPasswordPage.onlyPath}`,
		loadChildren: () =>
			import('./pages/recovery-password-page/recovery-password.module').then((m) => m.RecoveryPasswordPageModule)
	},
	{
		path: `${PATHS_AUTH_PAGES.restorePasswordPage.onlyPath}/:email`,
		loadChildren: () =>
			import('./pages/restore-password-page/restore-paswword-page.module').then((m) => m.RestorePasswordPageModule)
	},
	{
		path: PATH_BUY_PAGES.buyPage.onlyPath,
		canActivate: [BuyGuard],
		loadChildren: () => import('./pages/buy-page/buy-page.module').then((m) => m.BuyPageModule)
	},
	{
		path: PATH_MAINTENANCE_PAGES.onlyPath,
		loadChildren: () => import('./pages/maintenance/maintenance.module').then((m) => m.MaintenanceModule)
	},
	{
		path: PATH_MY_ACCOUNT_PAGES.onlyPath,
		canActivate: [AuthGuard],
		loadChildren: () => import('./pages/my-account/my-account.module').then((m) => m.MyAccountModule)
	},
	{
		path: PATH_NOT_FOUND_PAGE['not-found'].onlyPath,
		component: NotFoundPageComponent
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: PATH_NOT_FOUND_PAGE['not-found'].onlyPath
	}
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}

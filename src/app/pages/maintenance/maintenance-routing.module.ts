import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../commons/guards/auth.guard';
import { PATH_MAINTENANCE_PAGES } from './../../commons/config/path-pages';
import { MaintenanceGuard } from './../../commons/guards/maintenance.guard';
import { MaintenanceComponent } from './maintenance.component';

export const routes: Routes = [
	{
		path: '',
		component: MaintenanceComponent,
		canActivate: [MaintenanceGuard],
		canActivateChild: [AuthGuard],
		children: [
			{
				path: PATH_MAINTENANCE_PAGES.buy.onlyPath,
				loadChildren: () =>
					import('./maintenance-buy-page/maintenance-buy-page.module').then((m) => m.MaintenanceBuyPageModule)
			},
			{
				path: PATH_MAINTENANCE_PAGES.events.onlyPath,
				loadChildren: () =>
					import('./maintenance-events-page/maintenance-events-page.module').then((m) => m.MaintenanceEventsPageModule)
			},
			{
				path: PATH_MAINTENANCE_PAGES.genres.onlyPath,
				loadChildren: () =>
					import('./maintenance-genres-page/maintenance-genres-page.module').then((m) => m.MaintenanceGenresPageModule)
			},
			{
				path: PATH_MAINTENANCE_PAGES.reports.onlyPath,
				loadChildren: () =>
					import('./maintenance-reports/maintenance-reports.module').then((m) => m.MaintenanceReportsModule)
			},
			{
				path: '',
				redirectTo: PATH_MAINTENANCE_PAGES.buy.onlyPath
			}
		]
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MaintenanceRoutingModule {}

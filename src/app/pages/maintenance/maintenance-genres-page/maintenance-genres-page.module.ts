import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormCompleteModule } from 'src/app/commons/shared/shared-form-complete.module';
import { FormEventGuard } from '../../../commons/guards/form-event.guard';
import { MaintenanceGenresPageComponent } from './maintenance-genres-page.component';

export const routes: Routes = [
	{ path: '', canDeactivate: [FormEventGuard], component: MaintenanceGenresPageComponent }
];
@NgModule({
	declarations: [MaintenanceGenresPageComponent],
	imports: [
		RouterModule.forChild(routes),
		MatTableModule,
		MatTabsModule,
		MatMenuModule,
		MatPaginatorModule,
		SharedFormCompleteModule
	],
	providers: [DatePipe]
})
export class MaintenanceGenresPageModule {}

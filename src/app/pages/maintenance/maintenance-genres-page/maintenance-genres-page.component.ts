import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { map, Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/commons/guards/form-event.guard';
import { IResponseGenre } from 'src/app/commons/services/api/genre/genre-api-model.interface';
import { CRUD_METHOD } from 'src/app/commons/util/enums';
import { MaintenanceGenresPageService } from './maintenance-genres-page.service';

@Component({
	selector: 'app-maintenance-genres-page',
	templateUrl: './maintenance-genres-page.component.html',
	styleUrls: ['./maintenance-genres-page.component.scss'],
	providers: [MaintenanceGenresPageService]
})
export class MaintenanceGenresPageComponent implements OnInit, AfterViewInit, CanComponentDeactivate {
	@ViewChild(FormGroupDirective) formRef!: FormGroupDirective;
	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	formGroup!: FormGroup;

	//variable para el Tab
	indexTabSaveEvent = 0;

	// variables para la tabla
	displayedColumns: string[] = ['description', 'status', 'action'];

	dataSource = new MatTableDataSource<IResponseGenre>();

	//#region getters Form
	idField = this._maintenanceGenresPageService.idField;
	descriptionField = this._maintenanceGenresPageService.descriptionField;
	statusField = this._maintenanceGenresPageService.statusField;
	//#region

	private _crudMethod = CRUD_METHOD.SAVE;

	constructor(
		private _maintenanceGenresPageService: MaintenanceGenresPageService,
		private _confirmBoxEvokeService: ConfirmBoxEvokeService
	) {
		this.formGroup = this._maintenanceGenresPageService.formGroup;
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator!;
	}

	canDeactivate(): Observable<boolean> | boolean {
		const values = this.formGroup.value as IEventForm;
		const isThereDataEntered = Object.values(values).find((item) => item !== null) as unknown;

		if (!isThereDataEntered) {
			return true;
		}

		return this._confirmBoxEvokeService
			.warning('Advertencia', 'Los datos ingresados se perderán, ¿Esta seguro que desea salir?', 'Si', 'Cancelar')
			.pipe(map((response) => response.success));
	}

	ngOnInit(): void {
		this._loadGenres();
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	clickSave(): void {
		if (this.formGroup.valid) {
			this._maintenanceGenresPageService.saveGenre(this._crudMethod).subscribe((response) => {
				if (response) {
					this.formRef.resetForm();
				}
			});
		}
	}

	clickClear(): void {
		this._crudMethod = CRUD_METHOD.SAVE;
		this.formRef.resetForm();
	}

	clickUpdate(idEvent: number): void {
		this._maintenanceGenresPageService.updateForm(idEvent).subscribe((response) => {
			if (response.success) {
				this.indexTabSaveEvent = 0;
				this._crudMethod = CRUD_METHOD.UPDATE;
			}
		});
	}

	clickDelete(idEvent: number): void {
		this._maintenanceGenresPageService.deleteEvent(idEvent).subscribe((response) => {
			if (response) {
				this.dataSource.data = this.dataSource.data.filter((item) => item.id !== idEvent);
			}
		});
	}
	private _loadGenres(): void {
		this._maintenanceGenresPageService.loadGenres().subscribe((response) => {
			this.dataSource.data = response;
		});
	}
}
export interface IEventForm {
	id?: number;
	description: string;
	status: number;
}

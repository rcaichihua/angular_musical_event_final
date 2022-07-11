import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { IResponseGenre } from './../../../commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from './../../../commons/services/api/genre/genre-api.service';
import { IResponseSaleById } from './../../../commons/services/api/sale/sale-api-model.interface';
import { SaleApiService } from './../../../commons/services/api/sale/sale-api.service';

@Component({
	selector: 'app-maintenance-buy-page',
	templateUrl: './maintenance-buy-page.component.html',
	styleUrls: ['./maintenance-buy-page.component.scss']
})
export class MaintenanceBuyPageComponent implements OnInit, AfterViewInit {
	@ViewChild('paginator') paginator?: MatPaginator;

	displayedColumns: string[] = [
		'customer',
		'event',
		'ticketsQuantity',
		'totalSale',
		'saleDate',
		'saleDate',
		'dateEvent'
	];

	listGenres: IResponseGenre[] = [];
	dataSource = new MatTableDataSource<IResponseSaleById>();
	formGroup!: FormGroup;

	constructor(
		private _genreApiService: GenreApiService,
		private _saleApiService: SaleApiService,
		private _formBuilder: FormBuilder,
		private _datePipe: DatePipe,
		private _toastEvokeService: ToastEvokeService
	) {
		this._loadForm();
	}

	ngOnInit(): void {
		this._getGenders();
		this._loadBuys();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator!;
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	clickQuery(): void {
		this._loadEvents();
	}

	clickClear(): void {
		this.formGroup.reset();
	}

	private _loadEvents(): void {
		const genderId = (this.formGroup.get('genre')!.value as number) ?? undefined;

		let dateInit: string | undefined;
		const dateInitDate = this.formGroup.get('dateInit')?.value as Date;

		if (dateInitDate) {
			dateInit = this._datePipe.transform(dateInitDate, 'yyyy-MM-dd')!;
		}

		let dateEnd: string | undefined;
		const dateEndtDate = this.formGroup.get('dateEnd')?.value as Date;

		if (dateEndtDate) {
			dateEnd = this._datePipe.transform(dateEndtDate, 'yyyy-MM-dd')!;
		}

		if (!genderId && !dateInit && !dateEnd) {
			this._toastEvokeService.info('Información', 'Debe seleccionar al menos una opción');
			return;
		}

		this._saleApiService.getCollection(genderId, dateInit, dateEnd).subscribe((response) => {
			if (response && response.success) {
				this.dataSource.data = response.result;
			}
		});
	}

	private _loadBuys(): void {
		const dateInit = this._datePipe.transform(new Date(), 'yyyy-MM-dd')!;
		this._saleApiService.getCollection(undefined, dateInit).subscribe((response) => {
			if (response && response.success) {
				this.dataSource.data = response.result;
			}
		});
	}

	private _getGenders(): void {
		this._genreApiService.getGenres().subscribe((response) => {
			if (response && response.success) {
				this.listGenres = response.result;
			}
		});
	}

	private _loadForm(): void {
		this.formGroup = this._formBuilder.group({
			genre: [null],
			dateInit: [null],
			dateEnd: [null]
		});
	}
}

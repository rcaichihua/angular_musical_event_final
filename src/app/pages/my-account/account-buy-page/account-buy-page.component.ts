import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IResponseSaleById } from 'src/app/commons/services/api/sale/sale-api-model.interface';
import { SaleApiService } from 'src/app/commons/services/api/sale/sale-api.service';

@Component({
	selector: 'app-account-buy-page',
	templateUrl: './account-buy-page.component.html',
	styleUrls: ['./account-buy-page.component.scss']
})
export class AccountBuyPageComponent implements OnInit, AfterViewInit {
	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;

	displayedColumns: string[] = ['operationNumber', 'title', 'quantity', 'totalSale', 'saleDate', 'dateEvent'];
	dataSource = new MatTableDataSource<IResponseSaleById>();
	constructor(private _saleApiService: SaleApiService) {}
	ngOnInit(): void {
		this._loadBuys();
	}
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator!;
	}
	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
	private _loadBuys(): void {
		this._saleApiService.getSaleByUser().subscribe((response) => {
			this.dataSource.data = response.result;
		});
	}
}

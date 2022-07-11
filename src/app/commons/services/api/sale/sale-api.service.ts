import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { IResponse } from './../api-models-base.interface';
import { IRequestCreateSale, IResponseSaleById } from './sale-api-model.interface';

const URL_CREATE_SALE = environment.host + '/Sale/Create';
const URL_GET_SALE_BY_ID = environment.host + '/Sale/GetById';
const URL_GET_SALE_BY_USER = environment.host + '/Sale/GetByUser';
const URL_GET_COLLECTION = environment.host + '/Sale/GetCollection';

@Injectable({
	providedIn: 'root'
})
export class SaleApiService {
	constructor(private _httpClient: HttpClient) {}

	createSale(sale: IRequestCreateSale): Observable<IResponse<number>> {
		return this._httpClient.post<IResponse<number>>(URL_CREATE_SALE, sale);
	}

	getSaleById(id: number): Observable<IResponse<IResponseSaleById[]>> {
		const url = `${URL_GET_SALE_BY_ID}/${id}`;
		return this._httpClient.get<IResponse<IResponseSaleById[]>>(url);
	}

	getSaleByUser(): Observable<IResponse<IResponseSaleById[]>> {
		return this._httpClient.get<IResponse<IResponseSaleById[]>>(URL_GET_SALE_BY_USER);
	}

	getCollection(genreId?: number, dateInit?: string, dateEnd?: string): Observable<IResponse<IResponseSaleById[]>> {
		let params = new HttpParams();
		if (genreId) {
			params = params.set('genreId', genreId);
		}
		if (dateInit) {
			params = params.set('dateInit', dateInit);
		}

		if (dateEnd) {
			params = params.set('dateEnd', dateEnd);
		}

		return this._httpClient.get<IResponse<IResponseSaleById[]>>(URL_GET_COLLECTION, { params });
	}
}

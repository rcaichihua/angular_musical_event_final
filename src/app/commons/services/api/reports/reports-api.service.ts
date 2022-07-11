import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { IResponse } from './../api-models-base.interface';
import { IResponseReportSale } from './reports-api-model.interface';

const URL_REPORT_SALE = environment.host + '/Report/Sales';

@Injectable({ providedIn: 'root' })
export class ReportsApiService {
	constructor(private _httpClient: HttpClient) {}

	getDataSale(dateInit: string, dateEnd: string, genreId?: number): Observable<IResponse<IResponseReportSale[]>> {
		let params = new HttpParams().set('dateInit', dateInit).set('dateEnd', dateEnd);
		if (genreId) {
			params = params.set('genreId', genreId);
		}

		return this._httpClient.get<IResponse<IResponseReportSale[]>>(URL_REPORT_SALE, { params });
	}
}

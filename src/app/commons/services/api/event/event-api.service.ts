import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { IResponse } from './../api-models-base.interface';
import {
	IRequestCreateEvent,
	IResponseListAllEvent,
	IResponseMinimalDataByGenre,
	IResposeEventById
} from './event-api-model.interface';

const URL_EVENT = environment.host + '/Event';
const URL_MNIMAL_DATA_NY_GENRE = environment.host + '/Event/GetMinimalByGenre';
const URL_GET_BY_GENRE = environment.host + '/Event/GetByGenre';

@Injectable({
	providedIn: 'root'
})
export class EventApiService {
	constructor(private _httpClient: HttpClient) {}

	createEvent(event: IRequestCreateEvent): Observable<IResponse<number>> {
		return this._httpClient.post<IResponse<number>>(URL_EVENT, event);
	}

	updateEvent(idEvent: number, event: Partial<IRequestCreateEvent>): Observable<IResponse<number>> {
		const url = `${URL_EVENT}/${idEvent}`;
		return this._httpClient.put<IResponse<number>>(url, event);
	}

	deletEvent(idEvent: number): Observable<IResponse<number>> {
		const url = `${URL_EVENT}/${idEvent}`;
		return this._httpClient.delete<IResponse<number>>(url);
	}

	getAllEvents(filter?: string, page?: number, rows?: number): Observable<IResponse<IResponseListAllEvent[]>> {
		let params = new HttpParams();
		if (filter) {
			params = params.set('filter', filter);
		}

		if (page) {
			params = params.set('page', page);
		}

		if (rows) {
			params = params.set('rows', rows);
		}

		return this._httpClient.get<IResponse<IResponseListAllEvent[]>>(URL_EVENT, { params });
	}

	getEventByGenre(idGenre: number): Observable<IResponse<IResponseListAllEvent[]>> {
		const url = `${URL_GET_BY_GENRE}/${idGenre}`;
		return this._httpClient.get<IResponse<IResponseListAllEvent[]>>(url);
	}

	getEventById(id: number): Observable<IResponse<IResposeEventById>> {
		const url = `${URL_EVENT}/${id}`;
		return this._httpClient.get<IResponse<IResposeEventById>>(url);
	}

	getMinimalDataByGenre(idGenre: number): Observable<IResponse<IResponseMinimalDataByGenre[]>> {
		const url = `${URL_MNIMAL_DATA_NY_GENRE}/${idGenre}`;
		return this._httpClient.get<IResponse<IResponseMinimalDataByGenre[]>>(url);
	}

	finalizeEvent(idEvent: number): Observable<IResponse> {
		const url = `${URL_EVENT}/${idEvent}`;
		return this._httpClient.patch<IResponse>(url, {});
	}
}

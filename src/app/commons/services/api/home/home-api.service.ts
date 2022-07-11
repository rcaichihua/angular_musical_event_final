import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IResponseHome } from './home-api.interface';

export const URL_HOME = environment.host + '/Home';

@Injectable({ providedIn: 'root' })
export class HomeApiService {
	constructor(private _httpClient: HttpClient) {}

	getHome(): Observable<IResponseHome> {
		return this._httpClient.get<IResponseHome>(URL_HOME);
	}
}

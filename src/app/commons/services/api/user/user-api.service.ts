import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IResponse } from '../api-models-base.interface';
import { environment } from './../../../../../environments/environment';
import {
	IRequestChangePassword,
	IRequestLogin,
	IRequestRegister,
	IRequestResetPassword,
	IResponseLogin
} from './user-api-model.interface';

export const URL_LOGIN = environment.host + '/User/Login';
export const URL_REGISTER = environment.host + '/User/Register';

export const URL_SEND_TOKEN_RESET_PASSWORD = environment.host + '/User/SendTokenToResetPassword';
export const URL_RESET_PASSWORD = environment.host + '/User/ResetPassword';

const URL_CHANGE_PASSWORD = environment.host + '/User/ChangePassword';

@Injectable({ providedIn: 'root' })
export class UserApiService {
	constructor(private _httpClient: HttpClient) {}

	login(request: IRequestLogin): Observable<IResponseLogin> {
		return this._httpClient.post<IResponseLogin>(URL_LOGIN, request).pipe(
			catchError((error) => {
				return throwError(() => error);
			})
		);
	}

	register(request: IRequestRegister): Observable<IResponse<string>> {
		return this._httpClient.post<IResponse<string>>(URL_REGISTER, request);
	}

	sendTokenToResetPassword(email: string): Observable<IResponse<string>> {
		return this._httpClient.post<IResponse<string>>(URL_SEND_TOKEN_RESET_PASSWORD, { email });
	}

	resetPassword(request: IRequestResetPassword): Observable<IResponse<string>> {
		return this._httpClient.post<IResponse<string>>(URL_RESET_PASSWORD, request);
	}

	changePassword(request: IRequestChangePassword): Observable<IResponse> {
		return this._httpClient.post<IResponse>(URL_CHANGE_PASSWORD, request);
	}
}

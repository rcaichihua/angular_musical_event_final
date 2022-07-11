import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { URL_GENRE } from '../services/api/genre/genre-api.service';
import { URL_HOME } from '../services/api/home/home-api.service';
import {
	URL_LOGIN,
	URL_REGISTER,
	URL_RESET_PASSWORD,
	URL_SEND_TOKEN_RESET_PASSWORD
} from '../services/api/user/user-api.service';
import { DataUserService } from '../services/local/data-user.service';

const EXEMPTED_URLS = [URL_LOGIN, URL_REGISTER, URL_HOME, URL_SEND_TOKEN_RESET_PASSWORD, URL_RESET_PASSWORD];

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	constructor(private _dataUserService: DataUserService, private _router: Router) {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.isExempted(req.url, req.method)) {
			return next.handle(req);
		}

		const token = this._dataUserService.getToken();

		if (this._dataUserService.isExpiredToken() || !token) {
			this._router.navigateByUrl('/');
			return EMPTY;
		}

		const requestClone = req.clone({
			headers: req.headers.set('Authorization', `Bearer ${token}`)
		});

		return next.handle(requestClone);
	}

	private isExempted(url: string, method: string): boolean {
		const exist = EXEMPTED_URLS.find((item) => item === url);
		if (exist && exist === URL_GENRE && method === 'GET') {
			return true;
		}

		return exist !== undefined;
	}
}

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { IResponse } from '../services/api/api-models-base.interface';

@Injectable()
export class ErrorApiInterceptor implements HttpInterceptor {
	constructor(private _toastEvokeService: ToastEvokeService, private _ngxService: NgxUiLoaderService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this._ngxService.start();

		return next.handle(req).pipe(
			finalize(() => this._ngxService.stop()),
			catchError((error: HttpErrorResponse) => this._errorHandler(error))
		);
	}

	private _errorHandler = (error: HttpErrorResponse): Observable<never> => {
		this._errorsHttpClient(error);
		return throwError(() => error);
	};

	private _errorsHttpClient(httpErrorResponse: HttpErrorResponse): void {
		switch (httpErrorResponse.status) {
			case 0:
			case 500:
				this._toastEvokeService.danger('Error', 'Ups!,ocurrio un error inesperado, intenta nuevamente.');
				break;
			case 404:
				this._toastEvokeService.danger('Error', 'No pudimos encontrar lo solicitado, intenta más tarde.');
				break;
			case 401:
				if (httpErrorResponse && httpErrorResponse.error) {
					const responseError = httpErrorResponse.error as IResponse;

					responseError.errors.forEach((message) => {
						this._toastEvokeService.danger('Error', message);
					});
				} else {
					this._toastEvokeService.danger('Error', 'Ups!,ocurrio un error inesperado, intenta nuevamente.');
				}

				break;
		}
	}
}

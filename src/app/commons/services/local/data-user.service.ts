import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { IDataUser } from '../../models/data-user';
import { KEYS_WEB_STORAGE } from '../../util/enums';
import { SessionStorageService } from './storage/storage.service';

@Injectable({ providedIn: 'root' })
export class DataUserService {
	constructor(private _sessionStorageService: SessionStorageService) {}

	getToken(): string | undefined {
		const tokenUser = this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER);
		return tokenUser?.token;
	}

	getFullName(): string | null {
		const dataUser = this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER);

		if (dataUser !== null) {
			return dataUser.fullName;
		}

		return null;
	}

	getEmail(): string | null {
		const dataUser = this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER);

		if (dataUser !== null) {
			return dataUser.email;
		}

		return null;
	}

	isAdmin(): boolean | null {
		const dataUser = this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER);

		if (dataUser !== null) {
			return dataUser.isAdmin;
		}

		return null;
	}

	existsStorage(): boolean {
		return this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER) !== null;
	}

	isExpiredToken(): boolean {
		try {
			const dataUser = this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER);
			console.log('Token: ', KEYS_WEB_STORAGE.DATA_USER);
			//console.log('Entra??', dataUser);
			if (dataUser !== null && dataUser.token) {
				console.log('Datos de usuario: ', dataUser);
				const decoded = jwtDecode<JwtPayload>(dataUser.token);
				const tokenExpired = Date.now() > decoded.exp! * 1000;
				console.log('tokenExpired: ', tokenExpired);
				return tokenExpired;
			}
			return true;
		} catch (error) {
			console.error('Problemas al validar el token', error);
			return true;
		}
	}
}

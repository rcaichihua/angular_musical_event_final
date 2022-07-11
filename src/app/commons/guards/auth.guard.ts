import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { PATHS_AUTH_PAGES } from '../config/path-pages';
import { ChannelHeaderService } from '../services/local/channel-header.service';
import { DataUserService } from '../services/local/data-user.service';
import { SessionStorageService } from '../services/local/storage/storage.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private _dataUserService: DataUserService,
		private _channelHeaderService: ChannelHeaderService,
		private _sessionStorageService: SessionStorageService,
		private _router: Router
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this._validSession();
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this._validSession();
	}

	private _validSession(): boolean {
		const isExpiredToken = this._dataUserService.isExpiredToken();
		if (isExpiredToken) {
			this._channelHeaderService.showUser(false);
			this._sessionStorageService.clear();
			void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
			return false;
		}
		return true;
	}
}

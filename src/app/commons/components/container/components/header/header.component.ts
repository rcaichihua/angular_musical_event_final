import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS_AUTH_PAGES, PATH_MY_ACCOUNT_PAGES } from './../../../../config/path-pages';
import { ChannelHeaderService } from './../../../../services/local/channel-header.service';
import { DataUserService } from './../../../../services/local/data-user.service';
import { SessionStorageService } from './../../../../services/local/storage/storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	constructor(
		private _channelService: ChannelHeaderService,
		private _sessionStorageService: SessionStorageService,
		private _router: Router,
		private _dataUserService: DataUserService
	) {}

	loginPath = PATHS_AUTH_PAGES.loginPage.withSlash;
	registerPath = PATHS_AUTH_PAGES.registerPage.withSlash;
	myAccountPath = PATH_MY_ACCOUNT_PAGES.withSlash;

	showUser = false;

	userName: string | null = null;
	isAdmin: boolean | null = null;

	ngOnInit(): void {
		this._getDataUser();

		this._channelService.channelHeader$.subscribe((value) => {
			//console.log('Value: ', value);
			if (value) {
				//console.log('llama a _getDataUser');
				this._getDataUser();
			}
			this.showUser = value;
		});
	}

	private _getDataUser(): void {
		//console.log('Expiro? ', this._dataUserService.isExpiredToken());
		if (!this._dataUserService.isExpiredToken()) {
			console.log('Usuario encabezado:', this.userName);
			this.userName = this._dataUserService.getFullName();
			this.isAdmin = this._dataUserService.isAdmin();
			this.showUser = true;
		}
		//console.log('Usuario2: ', this.userName);
	}

	clickLogout(): void {
		this.showUser = false;
		this._sessionStorageService.clear();
		void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
	}
}

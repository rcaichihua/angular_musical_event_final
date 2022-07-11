import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IResponseLogin } from '../../commons/services/api/user/user-api-model.interface';
import { UserApiService } from '../../commons/services/api/user/user-api.service';
import { KEYS_WEB_STORAGE } from '../../commons/util/enums';
import { DemoService } from '../../demo.service';
import { PATHS_AUTH_PAGES, PATH_MAINTENANCE_PAGES, PATH_MY_ACCOUNT_PAGES } from './../../commons/config/path-pages';
import { IDataUser } from './../../commons/models/data-user';
import { ChannelHeaderService } from './../../commons/services/local/channel-header.service';
import { SessionStorageService } from './../../commons/services/local/storage/storage.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
	readonly pathRecovery = PATHS_AUTH_PAGES.recoverPasswordPage.withSlash;
	readonly pathRegister = PATHS_AUTH_PAGES.registerPage.withSlash;
	disableButton = false;
	formGroup!: FormGroup;

	constructor(
		private _demoService: DemoService,
		private _router: Router,
		private _channelHeaderService: ChannelHeaderService,
		private _formBuilder: FormBuilder,
		private _userApiService: UserApiService,
		private _sessionStorageService: SessionStorageService
	) {
		this._loadFormGroup();
	}

	clickLogin(): void {
		if (this.formGroup.valid) {
			this.disableButton = true;
			const email = this.formGroup.get('email')?.value;
			const password = this.formGroup.get('password')?.value;

			this._userApiService.login({ email, password }).subscribe({
				next: (response) => {
					//Primero guarda luego llama
					this._saveDataUserAndRedirect(response);
					this._channelHeaderService.showUser(true);
				},
				error: (error) => {
					//console.log('error http -->', error);
					this.disableButton = false;
				},
				complete: () => {
					console.log('complete');
				}
			});
		}
	}

	private _saveDataUserAndRedirect(response: IResponseLogin): void {
		//console.log(this.formGroup.get('email')?.value);
		const dataUser: IDataUser = {
			token: response.token,
			email: this.formGroup.get('email')?.value as string,
			fullName: response.fullName,
			isAdmin: response.roles[0] === 'Administrator'
		};
		this._sessionStorageService.setItem(KEYS_WEB_STORAGE.DATA_USER, dataUser);
		this._redirectUser(dataUser.isAdmin);
	}

	private _redirectUser(isAdmin: boolean) {
		const url = isAdmin ? PATH_MAINTENANCE_PAGES.withSlash : PATH_MY_ACCOUNT_PAGES.buyPage.withSlash;
		this._router.navigateByUrl(url);
	}

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			email: ['cursonetfullstack@gmail.com', [Validators.email, Validators.required]],
			password: ['password234', Validators.required]
		});
	}
}

import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { customPasswordValidator } from '../../commons/validators/forms.validators';
import { PATHS_AUTH_PAGES } from './../../commons/config/path-pages';
import { IResponse } from './../../commons/services/api/api-models-base.interface';
import { IRequestResetPassword } from './../../commons/services/api/user/user-api-model.interface';
import { UserApiService } from './../../commons/services/api/user/user-api.service';

@Component({
	selector: 'app-restore-password-page',
	templateUrl: './restore-password-page.component.html',
	styleUrls: ['./restore-password-page.component.scss']
})
export class RestorePasswordComponent {
	readonly pathLogin = PATHS_AUTH_PAGES.loginPage.withSlash;
	readonly pathRegister = PATHS_AUTH_PAGES.registerPage.withSlash;
	private _token: string | undefined;
	private _email: string | undefined;

	formGroup!: FormGroup;
	disabledButton = false;

	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _userApiService: UserApiService
	) {
		this._captureData();
		this._loadFormGroup();
	}

	clickRestore(): void {
		if (this.formGroup.valid) {
			const request: IRequestResetPassword = {
				email: this._email!,
				token: this._token!,
				password: this.passwordField.value as string
			};

			this._userApiService.resetPassword(request).subscribe({
				next: (response) => {
					this._validResponseAndRedirect(response);
				},
				error: () => (this.disabledButton = false)
			});
		}
	}

	private _validResponseAndRedirect(response: IResponse<string>): void {
		if (response.success) {
			void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
		} else if (response.errors) {
			this.disabledButton = false;
		}
	}

	private _captureData(): void {
		// capturamos los datos enviados por la opción "state"
		const navigation = this._router.getCurrentNavigation();

		if (navigation?.extras && navigation.extras.state) {
			this._token = navigation.extras.state['token'] as string;
		}

		// capturamos los datos enviados por la url
		if (this._activatedRoute.snapshot.params['email']) {
			this._email = this._activatedRoute.snapshot.params['email'] as string;
		}

		// en caso no existiera eltoken o el email enviaremos al usuario a la pagina de "Recuperar contraseña"
		if (!this._token || !this._email) {
			void this._router.navigateByUrl(PATHS_AUTH_PAGES.recoverPasswordPage.withSlash);
		}
	}

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({ password: [null, [Validators.required, customPasswordValidator]] });
	}

	get passwordField(): AbstractControl {
		return this.formGroup.get('password')!;
	}
}

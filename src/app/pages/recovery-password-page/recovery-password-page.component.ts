import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IResponse } from 'src/app/commons/services/api/api-models-base.interface';
import { UserApiService } from 'src/app/commons/services/api/user/user-api.service';
import { PATHS_AUTH_PAGES } from './../../commons/config/path-pages';

@Component({
	selector: 'app-recovery-password-page',
	templateUrl: './recovery-password-page.component.html',
	styleUrls: ['./recovery-password-page.component.scss']
})
export class RecoveryPasswordPageComponent {
	readonly pathLogin = PATHS_AUTH_PAGES.loginPage.withSlash;
	readonly pathRegister = PATHS_AUTH_PAGES.registerPage.withSlash;

	formGroup!: FormGroup;
	showFieldPassword = false;
	disabledButton = false;

	constructor(private _userApiService: UserApiService, private _formBuilder: FormBuilder, private _router: Router) {
		this._loadFormGroup();
	}

	clickSendEmail(): void {
		if (this.formGroup.valid) {
			const email = this.emailField.value as string;

			this.disabledButton = true;

			this._userApiService.sendTokenToResetPassword(email).subscribe({
				next: (response) => {
					if (response) {
						this._validResponseAndRedirect(response, email);
					}
				},
				error: () => {
					this.disabledButton = false;
				}
			});
		}
	}

	private _validResponseAndRedirect(response: IResponse<string>, email: string): void {
		if (response.success) {
			const url = PATHS_AUTH_PAGES.restorePasswordPage.withSlash + '/' + email;

			/**
			 * Enviamos datos a traves de las rutas usando queryParams,
			 * al hacerlo de esta manera los datos enviados se mostraran en la url
			 */
			//void this._router.navigate([url], { queryParams: { token: response.result } });

			/**
			 * Enviamos datos a traves de las rutas gracias a la opción "state",
			 * al hacerlo de esta manera evitamos mostrar la información en la url, pero recuerda que si actualizar la pagina los datos se perderan
			 */
			void this._router.navigate([url], { state: { token: response.result } });
		} else {
			this.disabledButton = false;
			console.log(response.errors);
		}
	}

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({ email: [null, [Validators.required, Validators.email]] });
	}

	get emailField(): AbstractControl {
		return this.formGroup.get('email')!;
	}
}

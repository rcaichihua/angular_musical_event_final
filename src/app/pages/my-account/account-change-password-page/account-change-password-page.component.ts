import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { IRequestChangePassword } from 'src/app/commons/services/api/user/user-api-model.interface';
import { DataUserService } from 'src/app/commons/services/local/data-user.service';
import { customPasswordValidator } from 'src/app/commons/validators/forms.validators';
import { PasswordStateMatcher } from '../../register-page/register-custom-validators';
import { UserApiService } from 'src/app/commons/services/api/user/user-api.service';

@Component({
	selector: 'app-account-change-password-page',
	templateUrl: './account-change-password-page.component.html',
	styleUrls: ['./account-change-password-page.component.scss']
})
export class AccountChangePasswordPageComponent {
	passwordStateMatcher = new PasswordStateMatcher();
	formGroup!: FormGroup;

	constructor(
		private _dataUserService: DataUserService,
		private _userApiService: UserApiService,
		private _formBuilder: FormBuilder,
		private _toastEvokeService: ToastEvokeService
	) {
		this._loadFormGroup();
	}
	mensajePassw = 'La contraseña debe tener al menos una mayúscula, minúscula, simbolo, número y mayor a 8 caracteres';
	clickChangePassword(): void {
		if (this.formGroup.valid) {
			this._userApiService.changePassword(this._getRequest()).subscribe({
				next: (response) => {
					if (response && response.success) {
						this._toastEvokeService.success('Exito', 'La contraseña ha sido cambiada correctamente');
						this.formGroup.reset();
					} else if (response && !response.success) {
						response.errors.forEach((error) => {
							this._toastEvokeService.danger('Error', error);
						});
					}
				}
			});
		}
	}
	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			oldPassword: [null, [customPasswordValidator, Validators.required]],
			newPassword: [null, [customPasswordValidator, Validators.required]]
		});
	}
	private _getRequest(): IRequestChangePassword {
		return {
			email: this._dataUserService.getEmail()!,
			oldPassword: this.oldPasswordField.value as string,
			newPassword: this.newPasswordField.value as string
		};
	}
	get oldPasswordField(): AbstractControl {
		return this.formGroup.get('oldPassword')!;
	}
	get newPasswordField(): AbstractControl {
		return this.formGroup.get('newPassword')!;
	}
}

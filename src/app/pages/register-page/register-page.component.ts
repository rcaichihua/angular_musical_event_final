import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { customPasswordValidator } from '../../commons/validators/forms.validators';
import { PATHS_AUTH_PAGES } from './../../commons/config/path-pages';
import { IRequestRegister } from './../../commons/services/api/user/user-api-model.interface';
import { UserApiService } from './../../commons/services/api/user/user-api.service';
import { crossPasswordMatchingValidatior, PasswordStateMatcher } from './register-custom-validators';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
	readonly pathLogin = PATHS_AUTH_PAGES.loginPage.withSlash;

	passwordStateMatcher = new PasswordStateMatcher();
	formGroup!: FormGroup;
	disabledButton = false;

	constructor(private _router: Router, private _userApiService: UserApiService, private _formBuilder: FormBuilder) {
		this._loadFormGroup();
	}

	clickRegister(): void {
		// console.log(this.formGroup.errors);

		if (this.formGroup.valid) {
			this._userApiService.register(this._getRequest()).subscribe({
				next: (response) => {
					if (response && response.success) {
						void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
					}
				},
				error: () => (this.disabledButton = false)
			});
		}
	}

	private _getRequest(): IRequestRegister {
		return {
			firstName: this.firtsField.value as string,
			lastName: this.lastNameField.value as string,
			typeDocument: this.typeDocumentField.value as number,
			documentNumber: this.documentNumberField.value as string,
			email: this.emailField.value as string,
			password: this.passwordField.value as string,
			confirmPassword: this.passwordField.value as string,
			age: this.ageField.value ? (this.ageField.value as number) : undefined
		};
	}

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group(
			{
				firstName: [null, Validators.required],
				lastName: [null, Validators.required],
				typeDocument: [null, Validators.required],
				documentNumber: [null, [Validators.required]],
				email: [null, [Validators.required, Validators.email]],
				password: [null, [customPasswordValidator, Validators.required]],
				confirmPassword: [null, [Validators.required]],
				age: null
			},
			{ validators: crossPasswordMatchingValidatior }
		);
	}

	get firtsField(): AbstractControl {
		return this.formGroup.get('firstName')!;
	}

	get lastNameField(): AbstractControl {
		return this.formGroup.get('lastName')!;
	}

	get typeDocumentField(): AbstractControl {
		return this.formGroup.get('typeDocument')!;
	}

	get documentNumberField(): AbstractControl {
		return this.formGroup.get('documentNumber')!;
	}

	get emailField(): AbstractControl {
		return this.formGroup.get('email')!;
	}

	get passwordField(): AbstractControl {
		return this.formGroup.get('password')!;
	}

	get confirmPasswordField(): AbstractControl {
		return this.formGroup.get('confirmPassword')!;
	}

	get ageField(): AbstractControl {
		return this.formGroup.get('age')!;
	}
}

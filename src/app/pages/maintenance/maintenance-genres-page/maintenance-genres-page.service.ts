import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { concatMap, EMPTY, map, Observable, tap } from 'rxjs';
import { IRequestCreateGenre, IResponseGenre } from 'src/app/commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from 'src/app/commons/services/api/genre/genre-api.service';
import { IResponse } from '../../../commons/services/api/api-models-base.interface';
import { CRUD_METHOD, STATUS_CRUD } from '../../../commons/util/enums';

@Injectable()
export class MaintenanceGenresPageService {
	formGroup!: FormGroup;
	constructor(
		private _confirmBoxEvokeService: ConfirmBoxEvokeService,
		private _toastEvokeService: ToastEvokeService,
		private _genreApiService: GenreApiService,
		private _formBuilder: FormBuilder
	) {
		this._loadFormGroup();
	}

	deleteEvent(idGenre: number): Observable<boolean> {
		return this._confirmBoxEvokeService.warning('Evento', '¿Esta seguro de eliminar el Genero?', 'Si', 'Cancelar').pipe(
			concatMap((responseQuestion) => (responseQuestion.success ? this._genreApiService.deleteGenre(idGenre) : EMPTY)),
			concatMap((response) => {
				if (response.success) {
					this._toastEvokeService.success('Exito', 'El genero a sido eliminado');
					return this._succes(true);
				}
				return this._succes(false);
			})
		);
	}

	updateForm(idGenre: number): Observable<IResponse<IResponseGenre>> {
		return this._genreApiService.getGenre(idGenre).pipe(
			tap((response) => {
				if (response.success) {
					const eventResponse = response.result;
					this.idField.setValue(eventResponse.id);
					this.descriptionField.setValue(eventResponse.description);
					this.statusField.setValue(eventResponse.status ? STATUS_CRUD.ACTIVO : STATUS_CRUD.INACTIVO);
				}
			})
		);
	}

	loadGenres(): Observable<IResponseGenre[]> {
		return this._genreApiService.getGenres().pipe(map((response) => this._getDataGenres(response)));
	}

	private _getDataGenres(response: IResponse<IResponseGenre[]>) {
		if (response.success) {
			return response.result;
		}
		return [];
	}

	saveGenre(method: CRUD_METHOD): Observable<boolean> {
		const request: IRequestCreateGenre = {
			description: this.descriptionField.value as string
		};

		return this._confirmBoxEvokeService
			.warning('Genero', '¿Esta seguro de guardar la información?', 'Si', 'Cancelar')
			.pipe(
				concatMap((responseQuestion) => (responseQuestion.success ? this._getMethod(method, request) : EMPTY)),
				concatMap((response) => {
					if (response.success) {
						this._toastEvokeService.success('Exito', 'La información ha sido guardada.');
						return this._succes(true);
					}

					return this._succes(false);
				})
			);
	}

	private _getMethod(method: CRUD_METHOD, request: IRequestCreateGenre): Observable<IResponse<number>> {
		const idEvent = this.idField.value as number;

		return method === CRUD_METHOD.SAVE
			? this._genreApiService.createGenre(request.description)
			: this._genreApiService.updateGenre(idEvent, request.description);
	}

	private _succes(isSucces: boolean): Observable<boolean> {
		return new Observable<boolean>((subscriber) => {
			subscriber.next(isSucces);
			subscriber.complete();
		});
	}

	//#region  load Form and getters y setters

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			id: [null],
			description: [null, Validators.required],
			status: [null, Validators.required]
		});
	}

	get idField(): AbstractControl {
		return this.formGroup.get('id')!;
	}

	get descriptionField(): AbstractControl {
		return this.formGroup.get('description')!;
	}

	get statusField(): AbstractControl {
		return this.formGroup.get('status')!;
	}

	//#endregion
}

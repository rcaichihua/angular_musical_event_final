import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { concatMap, EMPTY, map, Observable, tap } from 'rxjs';
import { IResponse } from '../../../commons/services/api/api-models-base.interface';
import {
	IRequestCreateEvent,
	IResponseListAllEvent,
	IResposeEventById
} from '../../../commons/services/api/event/event-api-model.interface';
import { EventApiService } from '../../../commons/services/api/event/event-api.service';
import { CRUD_METHOD, STATUS_CRUD } from '../../../commons/util/enums';

@Injectable()
export class MaintenanceEventsPageService {
	formGroup!: FormGroup;
	constructor(
		private _confirmBoxEvokeService: ConfirmBoxEvokeService,
		private _toastEvokeService: ToastEvokeService,
		private _eventApiService: EventApiService,
		private _datePipe: DatePipe,
		private _formBuilder: FormBuilder
	) {
		this._loadFormGroup();
	}

	deleteEvent(idEvent: number): Observable<boolean> {
		return this._confirmBoxEvokeService.warning('Evento', '¿Esta seguro de eliminar el Evento?', 'Si', 'Cancelar').pipe(
			concatMap((responseQuestion) => (responseQuestion.success ? this._eventApiService.deletEvent(idEvent) : EMPTY)),
			concatMap((response) => {
				if (response.success) {
					this._toastEvokeService.success('Exito', 'El evento a sido eliminado');
					return this._succes(true);
				}
				return this._succes(false);
			})
		);
	}

	endEvent(idEvent: number): void {
		this._eventApiService.finalizeEvent(idEvent).subscribe((response) => {
			if (response.success) {
				this._toastEvokeService.success('Exito', 'El evento a sido finalizado');
			}
		});
	}

	updateForm(idEvent: number): Observable<IResponse<IResposeEventById>> {
		return this._eventApiService.getEventById(idEvent).pipe(
			tap((response) => {
				if (response.success) {
					const eventResponse = response.result;
					this.idField.setValue(eventResponse.id);
					this.titleField.setValue(eventResponse.title);
					this.descriptionField.setValue(eventResponse.description);
					this.dateField.setValue(new Date(eventResponse.dateEvent));
					this.hourField.setValue(this._datePipe.transform(eventResponse.dateEvent, 'HH:mm'));
					this.placeField.setValue(eventResponse.place);
					this.ticketsQuantityField.setValue(eventResponse.ticketsQuantity);
					this.priceField.setValue(eventResponse.unitPrice),
						this.genreField.setValue(eventResponse.genreId),
						this.statusField.setValue(eventResponse.status ? STATUS_CRUD.ACTIVO : STATUS_CRUD.INACTIVO);
					this.imageField.setValue(eventResponse.imageUrl);
				}
			})
		);
	}

	loadEvents(existingData: IResponseListAllEvent[], page?: number, rows?: number): Observable<IResponseListAllEvent[]> {
		return this._eventApiService
			.getAllEvents('', page, rows)
			.pipe(map((response) => this._getDataEvents(existingData, response)));
	}

	private _getDataEvents(existingData: IResponseListAllEvent[], response: IResponse<IResponseListAllEvent[]>) {
		if (response.success) {
			if (existingData && existingData.length > 0) {
				const currentData = existingData.concat(response.result);
				const orderEvents = currentData.sort((a, b) => b.id - a.id);
				return orderEvents;
			}
			return response.result;
		}

		return [];
	}

	saveEvent(method: CRUD_METHOD): Observable<boolean> {
		const base64 = (this.imageField.value as string).split(',')[1];
		const request: IRequestCreateEvent = {
			imageBase64: base64,
			title: this.titleField.value as string,
			description: this.descriptionField.value as string,
			date: this._datePipe.transform(this.dateField.value as Date, 'yyyy-MM-dd')!,
			time: this.hourField.value as string,
			ticketsQuantity: this.ticketsQuantityField.value as number,
			unitPrice: this.priceField.value as number,
			genreId: this.genreField.value as number,
			fileName: this.fileNameField.value as string,
			place: this.placeField.value as string
		};

		return this._confirmBoxEvokeService
			.warning('Evento', '¿Esta seguro de guardar la información?', 'Si', 'Cancelar')
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

	private _getMethod(method: CRUD_METHOD, request: IRequestCreateEvent): Observable<IResponse<number>> {
		const idEvent = this.idField.value as number;

		return method === CRUD_METHOD.SAVE
			? this._eventApiService.createEvent(request)
			: this._eventApiService.updateEvent(idEvent, request);
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
			title: [null, Validators.required],
			description: [null, Validators.required],
			date: [null, Validators.required],
			hour: [null, Validators.required],
			ticketsQuantity: [null, Validators.required],
			price: [null, Validators.required],
			place: [null, Validators.required],
			genre: [null, Validators.required],
			status: [null, Validators.required],
			image: [null, Validators.required],
			fileName: [null]
		});
	}

	get idField(): AbstractControl {
		return this.formGroup.get('id')!;
	}

	get titleField(): AbstractControl {
		return this.formGroup.get('title')!;
	}

	get descriptionField(): AbstractControl {
		return this.formGroup.get('description')!;
	}

	get dateField(): AbstractControl {
		return this.formGroup.get('date')!;
	}

	get hourField(): AbstractControl {
		return this.formGroup.get('hour')!;
	}

	get ticketsQuantityField(): AbstractControl {
		return this.formGroup.get('ticketsQuantity')!;
	}

	get priceField(): AbstractControl {
		return this.formGroup.get('price')!;
	}

	get placeField(): AbstractControl {
		return this.formGroup.get('place')!;
	}

	get genreField(): AbstractControl {
		return this.formGroup.get('genre')!;
	}

	get statusField(): AbstractControl {
		return this.formGroup.get('status')!;
	}

	get imageField(): AbstractControl {
		return this.formGroup.get('image')!;
	}

	get fileNameField(): AbstractControl {
		return this.formGroup.get('fileName')!;
	}
	//#endregion
}

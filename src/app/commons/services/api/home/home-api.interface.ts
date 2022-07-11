import { IResponse } from '../api-models-base.interface';

export interface IResponseHome {
	genres: IResponse<IHomeGenres[]>;
	events: IResponse<IHomeEvents[]>;
}

export interface IHomeEvents {
	id: number;
	title: string;
	description: string;
	dateEvent: string;
	timeEvent: string;
	ticketsQuantity: number;
	unitPrice: number;
	genre: string;
	status: string;
	imageUrl: string;
	place: string;
}

export interface IHomeGenres {
	description: string;
	id: number;
	status: boolean;
}

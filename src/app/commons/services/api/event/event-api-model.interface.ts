//#region  CREATE EVENT
export interface IRequestCreateEvent {
	title: string;
	description: string;
	date: string;
	time: string;
	ticketsQuantity: number;
	unitPrice: number;
	fileName: string;
	imageBase64: string;
	genreId: number;
	place: string;
}
//#endregion

//#region GET LIST ALL EVENTS / GET EVENT BY GENRE ID
export interface IResponseListAllEvent {
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
	place?: string;
}

//#endregion

//#region  GET EVENT BYB ID
export interface IResposeEventById {
	title: string;
	description: string;
	dateEvent: string;
	ticketsQuantity: number;
	unitPrice: number;
	imageUrl: string;
	place: string;
	genreId: number;
	finalized: boolean;
	id: number;
	status: boolean;
}

//#endregion

//#region GET MINIMA DATA BY GENRE
export interface IResponseMinimalDataByGenre {
	id: number;
	title: string;
}
//#endregion

//#region CREATE SALE
export interface IRequestCreateSale {
	eventId: number;
	quantity: number;
	unitPrice: number;
}
//#endregion

//#region GET SALE BY ID / GET SALE BY USER
export interface IResponseSaleById {
	id: number;
	dateEvent: string;
	timeEvent: string;
	genre: string;
	imageUrl?: string;
	title: string;
	operationNumber: string;
	fullName: string;
	quantity: number;
	saleDate: string;
	saleTime: string;
	totalSale: number;
}
//#endregion

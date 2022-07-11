import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DemoService {
	constructor() {
		console.log('---DemoService---');
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DemoCorsService {
	constructor(private http: HttpClient) {}

	getGreeting(): Observable<unknown> {
		return this.http.get<unknown>('apidemo/greeting');
	}
}

import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
	canDeactivate(): Observable<boolean> | boolean;
}

@Injectable({
	providedIn: 'root'
})
export class FormEventGuard implements CanDeactivate<CanComponentDeactivate> {
	canDeactivate(component: CanComponentDeactivate): boolean | Observable<boolean> {
		return component.canDeactivate ? component.canDeactivate() : true;
	}
}

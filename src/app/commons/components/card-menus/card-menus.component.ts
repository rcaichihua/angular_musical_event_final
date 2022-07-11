// import { Component, Input } from '@angular/core';
// import { ICardMenu } from './../../models/components.interface';

// @Component({
// 	selector: 'app-card-menus',
// 	templateUrl: './card-menus.component.html',
// 	styleUrls: ['./card-menus.component.scss']
// })
// export class CardMenusComponent {
// 	@Input() menus: ICardMenu[] = [];

// 	clickMenu(menu: ICardMenu): void {
// 		this._activeMenu(menu);
// 	}

// 	private _activeMenu(menu: ICardMenu): void {
// 		this.menus.forEach((item) => (item.active = false));
// 		menu.active = true;
// 	}
// }
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ICardMenu } from './../../models/components.interface';

@Component({
	selector: 'app-card-menus',
	templateUrl: './card-menus.component.html',
	styleUrls: ['./card-menus.component.scss']
})
export class CardMenusComponent {
	@Input() menus: ICardMenu[] = [];

	currentRoute = '';

	constructor(private _router: Router) {
		this._router.events.pipe(filter((value) => value instanceof NavigationEnd)).subscribe((event) => {
			setTimeout(() => {
				const navigation = event as NavigationEnd;
				this.currentRoute = navigation.url;
				this._selectMenu(this.currentRoute);
			}, 10);
		});
	}

	clickMenu(menu: ICardMenu): void {
		// this._activeMenu(menu);
	}

	private _selectMenu(pathNavigation: string): void {
		const menu = this.menus.find((item) => item.path === pathNavigation);
		if (menu) {
			this._activeMenu(menu);
		}
	}

	private _activeMenu(menu: ICardMenu): void {
		this.menus.forEach((item) => (item.active = false));
		menu.active = true;
	}
}

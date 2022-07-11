import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DemoService } from './demo.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
	title = 'musical-event';
	constructor(private _demoService: DemoService) {
		console.log('-constructor---');
		this.title = 'MitoCode';
	}

	ngAfterViewInit(): void {
		console.log('---ngAfterViewInit---');
	}

	ngOnInit(): void {
		console.log('---ngOnInit---');
	}
}

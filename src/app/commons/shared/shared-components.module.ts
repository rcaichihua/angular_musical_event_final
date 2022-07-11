import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CardEventComponent } from '../components/card-event/card-event.component';
import { CardMenusComponent } from '../components/card-menus/card-menus.component';

@NgModule({
	declarations: [CardEventComponent, CardMenusComponent],
	imports: [CommonModule, MatCardModule, RouterModule],
	exports: [CardEventComponent, CardMenusComponent]
})
export class SharedComponentsModule {}

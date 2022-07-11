import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/commons/shared/shared-components.module';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';

@NgModule({
	declarations: [MyAccountComponent],
	imports: [MyAccountRoutingModule, SharedComponentsModule]
})
export class MyAccountModule {}

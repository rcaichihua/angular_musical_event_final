import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoService } from '../../demo.service';
import { SharedFormBasicModule } from './../../commons/shared/shared-form-basic.module';
import { LoginPageComponent } from './login-page.component';

export const routes: Routes = [{ path: '', component: LoginPageComponent }];

@NgModule({
	declarations: [LoginPageComponent],
	imports: [RouterModule.forChild(routes), SharedFormBasicModule],
	providers: [DemoService]
})
export class LoginPageModule {}

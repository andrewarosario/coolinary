import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginInstagramPage } from './login-instagram';

@NgModule({
  declarations: [
    LoginInstagramPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginInstagramPage),
  ],
})
export class LoginInstagramPageModule {}

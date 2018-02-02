import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuGeralComponent } from './menu-geral';

@NgModule({
  declarations: [
    MenuGeralComponent
  ],
  imports: [
    IonicPageModule.forChild(MenuGeralComponent),
  ],
  exports: [
    MenuGeralComponent
  ]
})

export class MenuGeralComponentModule {}

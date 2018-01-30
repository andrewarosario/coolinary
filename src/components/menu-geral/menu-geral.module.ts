import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuGeralComponent } from './menu-geral';
import { InfoUsuarioComponent } from '../info-usuario/info-usuario';

@NgModule({
  declarations: [
    MenuGeralComponent,
    //InfoUsuarioComponent,
  ],
  imports: [
    IonicPageModule.forChild(MenuGeralComponent),
  ],
  exports: [
    MenuGeralComponent
  ]
})

export class MenuGeralComponentModule {}

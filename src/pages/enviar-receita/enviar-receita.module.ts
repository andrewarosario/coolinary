import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnviarReceitaPage } from './enviar-receita';

@NgModule({
  declarations: [
    EnviarReceitaPage,
  ],
  imports: [
    IonicPageModule.forChild(EnviarReceitaPage),
  ],
})
export class EnviarReceitaPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltroReceitasPage } from './filtro-receitas';

@NgModule({
  declarations: [
    FiltroReceitasPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltroReceitasPage),
  ],
})
export class FiltroReceitasPageModule {}

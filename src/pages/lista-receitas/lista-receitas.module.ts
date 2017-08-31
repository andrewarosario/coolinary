import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaReceitasPage } from './lista-receitas';

@NgModule({
  declarations: [
    ListaReceitasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaReceitasPage),
  ],
})
export class ListaReceitasPageModule {}

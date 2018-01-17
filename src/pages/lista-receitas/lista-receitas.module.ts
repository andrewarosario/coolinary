import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaReceitasPage } from './lista-receitas';
import { BarraPorcentagemReceitaComponent } from '../../components/barra-porcentagem-receita/barra-porcentagem-receita';
import { NenhumaReceitaComponent } from '../../components/nenhuma-receita/nenhuma-receita';

@NgModule({
  declarations: [
    ListaReceitasPage, 
    BarraPorcentagemReceitaComponent,
    NenhumaReceitaComponent
  ],
  imports: [
    IonicPageModule.forChild(ListaReceitasPage),
  ],
})
export class ListaReceitasPageModule {}

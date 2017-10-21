import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarraPorcentagemReceitaComponent } from './barra-porcentagem-receita';

@NgModule({
  declarations: [
    BarraPorcentagemReceitaComponent,
  ],
  imports: [
    IonicPageModule.forChild(BarraPorcentagemReceitaComponent),
  ],
  exports: [
      BarraPorcentagemReceitaComponent
  ]
})

export class BarraPorcentagemReceitaComponentModule {

}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarraProgressoComponent } from './barra-progresso';

@NgModule({
  declarations: [
    BarraProgressoComponent,
  ],
  imports: [
    IonicPageModule.forChild(BarraProgressoComponent),
  ],
  exports: [
      BarraProgressoComponent
  ]
})

export class BarraProgressoComponentModule {

}

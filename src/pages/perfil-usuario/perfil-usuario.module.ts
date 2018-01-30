import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilUsuarioPage } from './perfil-usuario';
import { BarraProgressoComponent } from '../../components/barra-progresso/barra-progresso';
import { InfoUsuarioComponent } from '../../components/info-usuario/info-usuario';

@NgModule({
  declarations: [
    PerfilUsuarioPage,
    BarraProgressoComponent,
    InfoUsuarioComponent,
  ],
  imports: [
    IonicPageModule.forChild(PerfilUsuarioPage),
  ],
})
export class PerfilUsuarioPageModule {}

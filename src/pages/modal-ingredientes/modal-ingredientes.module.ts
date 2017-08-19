import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalIngredientesPage } from './modal-ingredientes';
import { SelectSearchableModule } from '../../components/select/select-module';

@NgModule({
  declarations: [
    ModalIngredientesPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalIngredientesPage),
    SelectSearchableModule
  ],
})
export class ModalIngredientesPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalIngredientesPage } from './modal-ingredientes';

@NgModule({
  declarations: [
    ModalIngredientesPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalIngredientesPage)
  ],
})
export class ModalIngredientesPageModule {}

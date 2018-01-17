import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceitaPage } from './receita';
import { YoutubePipe } from '../../pipes/youtube/youtube';

@NgModule({
  declarations: [
    ReceitaPage,
    YoutubePipe
  ],
  imports: [
    IonicPageModule.forChild(ReceitaPage),
  ],
})
export class ReceitaPageModule {}

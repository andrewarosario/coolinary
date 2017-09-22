import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Receita } from '../../models/receita/receita.interface';

@Component({
    selector: 'page-receita',
    templateUrl: 'receita.html',
})
export class ReceitaPage {

    receita: Receita;

    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Receita } from '../../models/receita/receita.interface';

@Component({
    selector: 'page-receita',
    templateUrl: 'receita.html',
})
export class ReceitaPage {

    receita: Receita;

    estateProperty = {
        name: 'Pretty house',
        description: `It’s a 2 bedroom, 2 bathroom laneway house that also has a spacious study off the upstairs landing.
                    Sporting modern finishes and some cute touches like wall niches and bamboo accents,
                    this laneway house is a great example of what can be built on most of Vancouver’s standard 33 x 122
                    foot lots.`,
        price: '850000',
        image: 'https://www.smallworks.ca/wp-content/uploads/exterior11.jpg',
        style: 'Modern Interior',
        size: '33\' Lot',
        features: [
        {
            icon: 'heart',
            title: 'Adicionar aos favoritos'
        },
        {
            icon: 'bicycle',
            title: 'Bike Stations'
        },
        {
            icon: 'rose',
            title: 'Beautiful Garden'
        }
        ]
    };

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.receita = navParams.get('receita');

    }

}

import { Component } from '@angular/core';

/**
 * Generated class for the TesteComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'teste',
  templateUrl: 'teste.html'
})
export class TesteComponent {

  text: string;

  constructor() {
    console.log('Hello TesteComponent Component');
    this.text = 'Hello World';
  }

}

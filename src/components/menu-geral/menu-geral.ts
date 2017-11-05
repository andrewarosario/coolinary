import { Component } from '@angular/core';

@Component({
    selector: 'menu-geral',
    templateUrl: 'menu-geral.html'
})
export class MenuGeralComponent {

  text: string;

  constructor() {
      this.text = 'Hello World';
  }

}

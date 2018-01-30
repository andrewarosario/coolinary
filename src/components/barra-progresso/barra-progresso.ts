import { Component, Input } from '@angular/core';

@Component({
    selector: 'barra-progresso',
    templateUrl: 'barra-progresso.html'
})

export class BarraProgressoComponent {

    @Input() progresso: number;
    
    constructor() {
      
    }

}
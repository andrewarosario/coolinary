import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario.interface';

@Component({
    selector: 'info-usuario',
    templateUrl: 'info-usuario.html'
})
export class InfoUsuarioComponent {

    @Input() usuario: Usuario;
    @Input() ehMenu: boolean;

    constructor() {
       
    }

}
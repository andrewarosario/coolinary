import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { Usuario } from '../../models/usuario/usuario.interface';
import { UsuarioService } from '../../providers/usuario/usuario.service';

import * as firebase from 'firebase/app';

@Component({
    selector: 'page-perfil-usuario',
    templateUrl: 'perfil-usuario.html',
})
export class PerfilUsuarioPage {

    usuarioAtual: Usuario;
    podeEditar: boolean = false;
    private arquivoFoto: File;
    progressoUpload: number;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public authService: AuthService,
                public usuarioService: UsuarioService) {

        this.usuarioService.usuarioAtual
        .subscribe((usuario: Usuario) => {
            console.log(usuario);
            this.usuarioAtual = usuario;
        });

    }

    ionViewCanEnter(): Promise<boolean> {
        return this.authService.autenticado;
    }

    ionViewDidLoad() {

    }

    enviar(event: Event): void {
        event.preventDefault();

        if (this.arquivoFoto) {
            let tarefaUpload = this.usuarioService.uploadFoto(this.arquivoFoto, this.usuarioAtual.$key);

            tarefaUpload.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {

                this.progressoUpload = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            }, (error: Error) => {
                console.log('Erro ao enviar a foto');
            });

            tarefaUpload.then((UploadTaskSnapshot: firebase.storage.UploadTaskSnapshot) => {
                this.editarUsuario(tarefaUpload.snapshot.downloadURL);
            });

        } else {
            this.editarUsuario();
        }
    }

    private editarUsuario(urlFoto?: string): void {
        this.usuarioService.editar({
            nome: this.usuarioAtual.nome,
            usuario: this.usuarioAtual.usuario,
            foto: urlFoto || this.usuarioAtual.foto || ''
        }).then(() => {
            this.podeEditar = false;
            this.arquivoFoto = undefined;
            this.progressoUpload = 0;
        })
    }

    selecionarFoto(event): void {      
        this.arquivoFoto = event.target.files[0];
    }

}
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { Usuario } from '../../models/usuario/usuario.interface';
import { UsuarioService } from '../../providers/usuario/usuario.service';

import * as firebase from 'firebase/app';
import { ListaReceitasPage } from '../lista-receitas/lista-receitas';
import { TabsPage } from '../tabs/tabs';
import { AtualizaReceitasService } from '../../providers/atualiza-receitas/atualiza-receitas';
import { EnviarReceitaPage } from '../enviar-receita/enviar-receita';

@Component({
    selector: 'page-perfil-usuario',
    templateUrl: 'perfil-usuario.html',
})
export class PerfilUsuarioPage {

    backgroundURL: string = 'assets/img/background.jpg';

    usuarioAtual: Usuario;
    podeEditar: boolean = false;
    private arquivoFoto: File;
    progressoUpload: number;

    paginas = [
        {titulo: 'Receitas Favoritas', componente: ListaReceitasPage, icone: 'heart'},
        {titulo: 'Envie sua Receita', componente: EnviarReceitaPage, icone: 'send'},
        {titulo: 'Sair', componente: TabsPage, icone: 'exit'},
    ]

    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public alertCtrl: AlertController,
                public authService: AuthService,
                public usuarioService: UsuarioService,
                public atualizaReceitasService: AtualizaReceitasService) {

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

    abrirPagina(pagina) {

        if (pagina.titulo == 'Receitas Favoritas') {
            this.navCtrl.push(ListaReceitasPage, {tipo: 'Favoritas'});
            return
        }

        if (pagina.titulo == 'Envie sua Receita') {
            this.navCtrl.push(pagina.componente);
            return
        }

        if (pagina.titulo == 'Sair') {

            this.alertCtrl.create({
                message: 'Você deseja realmente sair?',
                buttons: [
                    {
                        text: 'Sim',
                        handler: () => {
                            this.authService.logout()
                                .then(() => {
                                    this.atualizaReceitasService.setAtualizar(true);
                                    this.navCtrl.setRoot(TabsPage);
                                    return;
                                });
                        }
                    },
                    {
                        text: 'Não'
                    }
                ]
            }).present();
        }
    }
}
import { NavController, App, MenuController } from "ionic-angular";
import { OnInit } from "@angular/core";
import { AuthService } from "../../providers/auth/auth.service";

export abstract class BaseComponent implements OnInit {

    protected navCtrl: NavController;

    constructor(public app: App,
                public authService: AuthService,
                public menuCtrl: MenuController) {
        
    }

    ngOnInit(): void {
        this.navCtrl = this.app.getActiveNav();
    }

}
import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ActionSheetController  } from 'ionic-angular';

import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';
import { EnvironmentProvider } from '../../providers/environment-provider';

import { WorkInfPage } from '../work/work-inf';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
    selector: 'page-work-list',
    templateUrl: 'work-list.html',
    providers: [JsonpService]
})
export class WorkListPage {

    loading: Loading;
    items: Array<any>;

    webServiceUrl: string;

    categoryMenu: string = 'A';
    aaa: any;


    htmlElement: string;


    testUrl: string;

    public urlC: SafeResourceUrl;

    constructor(public navCtrl: NavController, public navParams: NavParams
        , private globalVars: GlobalVars
        , private jsonpService: JsonpService
        , private loadingCtrl: LoadingController
        , private alertCtrl: AlertController
        , private modalCtrl: ModalController
        , private environmentProvider: EnvironmentProvider
        , private sanitizer : DomSanitizer
        ) {

        this._initializeApp();

    }


    public _initializeApp() {

        var data = [];

        data.push({
            CATEGORY_CD: this.categoryMenu
        });

        this.showLoading();
        this.jsonpService.getDefaultAPI('7004', data).subscribe(
            data => {

                console.log('>>>>>>> ' + data);
                if (data.length > 0) {
                    this.items = data;
                }
                
            },
            err => {
                this.loading.dismiss();
            },
            () => {
                this.loading.dismiss();

            }
        );//jsonpService
    }



    changeItemMenus(index: string) {
        this.categoryMenu = index;

        this._initializeApp();
    }

    showInfo(param) {

        let modal = this.modalCtrl.create(WorkInfPage, param);
        modal.onDidDismiss(data => {
            console.log('address search DATA');

            if (data != null) {
                console.log('ok');
            } else {
                console.log('no');
            }
        });

        modal.present();
    }


    convertDate(value): string {

        return value.substring(0, 10);;
    }

    showError(text) {
        setTimeout(() => {
            this.loading.dismiss();
        });

        var alert = this.alertCtrl.create({
            title: 'QPASS',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: this.globalVars.loading
        });
        this.loading.present();
    }




}

import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ActionSheetController  } from 'ionic-angular';

import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';
import { EnvironmentProvider } from '../../providers/environment-provider';

import { WorkInfPage } from '../work/work-inf';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
//import { SearchType } from '../search/search-type';

//

@Component({
    selector: 'page-search-list',
    templateUrl: 'search-list.html',
    providers: [JsonpService]
})
export class SearchListPage {

//

//filter: SearchType = new SearchType();


//
    loading: Loading;
    items: Array<any>;

itemInfos: Array<any>;
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


        this.jsonpService.getDefaultAPI('8999', data).subscribe(
            data => {

                console.log('>>>>>>> ');

                console.log(data);
                console.log( data.A);
                console.log( data.B);

                this.items = data.A;


                console.log(this.items);
this.itemInfos = data.B;


          

//USER_RAWID: 10000001
           
            },
            err => {
    
            },
            () => {
  

            }
        );//jsonpService
    }


test() {
    /*
var kkkk = this.items.B.filter(
                task => task.USER_RAWID ===10000001);
    return kkkk;
*/
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

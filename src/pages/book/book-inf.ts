import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ViewController } from 'ionic-angular';
import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';
import { EnvironmentProvider } from '../../providers/environment-provider';


import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { BookTicketPage } from '../book/book-ticket';

@Component({
    selector: 'page-book-inf',
    templateUrl: 'book-inf.html',
    providers: [JsonpService]
})
export class BookInfPage {

    loading: Loading;
    selectedItem: any;
    icons: string[];
    items: Array<{ title: string, note: string, icon: string }>;


    webServiceUrl: string;

    ALIAS: string;
    COMMENT: string;
    COST: string;
    CREATE_DTTS: string;
    IMG_ALIAS: string;
    IMG_SMALL: string;
    MAKE_DTTS: string;
    MEMBER_EMAIL: string;
    MEMBER_ID: string;
    POSTER: string;
    RAWID: string;
    RNK: string;
    URL: string;
    USER_ALIAS: string;
    USER_IMG: string;
    USER_RAWID: string;
    BG_IMG: string;
    MOVIE: string;
    youtubeUrl: string;
    urlA : any;


    URL_MOVIE: SafeResourceUrl;


    constructor(
        public navCtrl: NavController
        , private view: ViewController
        , public events: Events
        , private navParams: NavParams
        , private jsonpService: JsonpService
        , private loadingCtrl: LoadingController
        , private modalCtrl: ModalController
        , private alertCtrl: AlertController
        , private environmentProvider: EnvironmentProvider
        , private globalVars: GlobalVars
        , private sanitizer: DomSanitizer
    ) {

        //console.log(this.navParams.get('COMMENT'));

        this._initializeApp();

    }


    _initializeApp() {
   
        this.webServiceUrl = this.environmentProvider.getWebServiceUrl();


        this.RAWID = this.navParams.get('ART_RAWID');

        this.getArtListInfo();
    }

    getArtListInfo() {

        var data = [];
        data.push({
            RAWID: this.RAWID
        });

        this.showLoading();

        this.jsonpService.getDefaultAPI('8003', data).subscribe(
            data => {

                if (data != null) {
                    this.items = data;


                    this.youtubeUrl = 'https://www.youtube.com/embed/' + data[0].URL.toString().trim() + '?rel=0';

                   // this.USER_IMG = data[0].USER_IMG.toString().trim();
                   // this.USER_ALIAS = data[0].ALIAS;
                   // this.ALIAS = data[0].TITLE.toString().trim();
                    this.MAKE_DTTS = this.navParams.get('OPEN_DTTS');  //OPEN_DTTS


                    this.POSTER = data[0].POSTER.toString().trim();
   


                } else {
                    this.showError('예약정보가 없습니다');
                }

            },
            err => {
                this.showError('예약정보가 없습니다');

            },
            () => {
                this.loading.dismiss();
            }
        ); //json end

    }


    getaaa() {
        return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/E5ln4uR4TwQ?rel=0');
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: this.globalVars.loading
        });
        this.loading.present();
    }

    showError(text) {
        setTimeout(() => {
            this.loading.dismiss();
        });

        let alert = this.alertCtrl.create({
            title: 'QPASS',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    dismiss() {
         this.view.dismiss();

    }


    pay() {


        this.events.publish('event:artbook');
        this.view.dismiss();
    

    }



}

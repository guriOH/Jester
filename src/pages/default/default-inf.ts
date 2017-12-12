import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ViewController } from 'ionic-angular';
import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';
import { EnvironmentProvider } from '../../providers/environment-provider';


import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'page-default-inf ',
    templateUrl: 'default-inf.html',
    providers: [JsonpService]
})
export class DefaultInfPage {

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


        this.RAWID = this.navParams.get('RAWID');



        /*
        this.ALIAS = this.navParams.get('ALIAS');
        this.COMMENT = this.navParams.get('COMMENT');
        this.CREATE_DTTS = this.navParams.get('CREATE_DTTS');
        this.IMG_ALIAS = this.navParams.get('IMG_ALIAS');
        this.IMG_SMALL = this.navParams.get('IMG_SMALL');
        this.COST = this.navParams.get('COST');

        this.MAKE_DTTS = this.navParams.get('MAKE_DTTS');
        this.MEMBER_EMAIL = this.navParams.get('MEMBER_EMAIL');
        this.MEMBER_ID = this.navParams.get('MEMBER_ID');
        this.POSTER = this.navParams.get('POSTER');
        this.RAWID = this.navParams.get('RAWID');

        this.RNK = this.navParams.get('RNK');
        this.URL = this.navParams.get('URL');

        this.youtubeUrl = 'https://www.youtube.com/embed/' + this.navParams.get('URL').toString().trim() + '?rel=0';
        this.BG_IMG = 'http://img.youtube.com/vi/' + this.navParams.get('URL').toString().trim() + '/0.jpg';
       
        //getSafeUrl(url) {
        //this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);


        //this.URL_MOVIE = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.navParams.get('URL').toString().trim() + '?rel=0');   

       // console.log(this.URL_MOVIE);
        this.USER_ALIAS = this.navParams.get('USER_ALIAS');
        this.USER_IMG = this.navParams.get('USER_IMG');
        this.USER_RAWID = this.navParams.get('USER_RAWID');


       // this.urlA = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/E5ln4uR4TwQ?rel=0');

        */
        this.getArtListInfo();
    }

    getArtListInfo() {


   
        var data = [];

        data.push({
            RAWID: this.RAWID
        });


        this.showLoading();

        this.jsonpService.getDefaultAPI('7005', data).subscribe(
            data => {

                if (data != null) {
                    this.items = data;


                    this.youtubeUrl = 'https://www.youtube.com/embed/' + data[0].URL.toString().trim() + '?rel=0';

                    this.USER_IMG = data[0].USER_IMG.toString().trim();
                    this.USER_ALIAS = data[0].ALIAS;
                    this.ALIAS = data[0].TITLE.toString().trim();
                    this.MAKE_DTTS = data[0].Q_DTTS.toString().trim();


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
        this.events.publish('event:tickeybuy');
        this.view.dismiss();
    }


}

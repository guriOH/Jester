import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ViewController } from 'ionic-angular';

import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';
import { Default } from '../default/default';
import { EnvironmentProvider } from '../../providers/environment-provider';

import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { FirebaseMessageService } from '../../firebase/firebasemessage-service';

@Component({
    selector: 'page-q-booking',
    templateUrl: 'q-booking.html',
    providers: [JsonpService , FirebaseMessageService]
})
export class QbookingPage {

    loading: Loading;
    selectedItem: any;
    icons: string[];
    items: Array<{ title: string, note: string, icon: string }>;
  

    webServiceUrl: string;
    IMG_ALIAS: string;
    TITLE: string;
    ALIAS: string;
    COST: string;
    CREATE_DTTS: string;
    CREATE_HOUR: string;
    CREATE_MIN: string;
    RAWID: string;
    MONEY: string;
    NAME: string;
    DATE: string;
    WEEK: string;
    PHONE_CODE: string;
    ADDRESS: string;

    QUEUE_COMMENT: string;
    QUEUE_NO: string;


    fireItems: FirebaseListObservable<any>;


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
        , public firebaseMessage: FirebaseMessageService
        , private globalVars: GlobalVars) {

        this._initializeApp();

    }


    _initializeApp() {
        this.IMG_ALIAS = this.navParams.get('IMG_ALIAS');
        this.ALIAS = this.navParams.get('ALIAS');

        this.CREATE_DTTS = this.navParams.get('CREATE_DTTS');
        this.DATE = this.navParams.get('CREATE_DTTS').toString().substring(5, 10);

        this.RAWID = this.navParams.get('RAWID');
        this.MONEY = this.navParams.get('MONEY');
        this.NAME = this.navParams.get('NAME');
        this.TITLE = this.navParams.get('TITLE');
        this.PHONE_CODE = this.navParams.get('PHONE_CODE');
        this.ADDRESS = this.navParams.get('ADDRESS');



        let somedate = new Date(this.navParams.get('CREATE_DTTS'));
        this.WEEK = this.getWeekDay(somedate);

        this.webServiceUrl = this.environmentProvider.getWebServiceUrl();
        this.getQueueInfo();

        //test
        this.test();
    }

    getQueueInfo() {

        this.showLoading();
        //  console.log(this.param);
        //json start
        var data = [];

        data.push({
            RAWID: this.navParams.get('RAWID')
        });

        this.jsonpService.getDefaultAPI('1013', data).subscribe(
            data => {

                console.log(data);
                if (data.length > 0) {
                    this.items = data;
        
                    this.COST = data[0].COST;
                    this.CREATE_HOUR = data[0].CREATE_HOUR;
                    this.CREATE_MIN = data[0].CREATE_MIN;
                    this.QUEUE_COMMENT = data[0].QUEUE_COMMENT;
                    this.QUEUE_NO = data[0].QUEUE_NO;

                } else {
                    this.showError('예약정보가 없습니다');
                }

                this.loading.dismiss();

            },
            err => {
                this.showError('예약정보가 없습니다');
                this.loading.dismiss();
            },
            () => {

            }
        ); //json end
        
    }
    //1013
    convertMM(value): string {

        let title = value;
        let min = Number(value);
        if (min < 10) { title = '0' + value; }

        return title;
    }
    getWeekDay(valueDate) {

        let week = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
        return week[valueDate.getDay()];
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
       // this.view.dismiss();

        this.events.publish('event:default');
       // this.events.publish('event:authority');
        this.navCtrl.popToRoot();

        //this.navCtrl(Default);
       // this.view.dismiss();
    }

    test() {


        if (this.globalVars.vars == null) {
            return;
        }

        if (this.globalVars.vars.length > 0) {


            this.fireItems = this.firebaseMessage.createMessageChat();

            //let responsefireItems = this.firebaseMessage.sendChat('qpass-admin');
            this.fireItems.push(
                {
                    RAWID: this.RAWID

                }
            );


            //test



        }
    }


}

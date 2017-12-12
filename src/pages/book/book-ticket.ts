import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ViewController } from 'ionic-angular';
import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';
import { Default } from '../default/default';
import { EnvironmentProvider } from '../../providers/environment-provider';

import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { FirebaseMessageService } from '../../firebase/firebasemessage-service';

@Component({
    selector: 'page-book-ticket',
    templateUrl: 'book-ticket.html',
    providers: [JsonpService , FirebaseMessageService]
})
export class BookTicketPage {

    loading: Loading;
    selectedItem: any;
    icons: string[];
    items: Array<{ title: string, note: string, icon: string }>;
  

    itemsA: Array<any>;
    itemsB: Array<any>;

    webServiceUrl: string;

    RAWID: string;
    
    OPEN_DTTS: string;


    CUSTOMER_RAWID: string;
    IMG_ALIAS: string;
    F_AGE: string;
    T_AGE: string;
    RUNNING: string;
    Q_DTTS: string;
    TITLE: string;
    HH: string;
    MM: string;
    PEOPLE: string;
    LOCATION_ID: string;
    COST: string;
    CREATE_DTTS: string;

    ALIAS: string;
    USER_IMG: string;
    PHONE_NUMBER: string;


    SEAT: string;





    LAT: string;
    LNG: string;


    

    WEEK: string;
    MEMBER_RAWID: string;
    KEY_RAWID : number;
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



        this.OPEN_DTTS = this.navParams.get('OPEN_DTTS');


        this.KEY_RAWID = this.navParams.get('KEY_RAWID');


        //this.MEMBER_RAWID = this.navParams.get('USER_RAWID');

        this.webServiceUrl = this.environmentProvider.getWebServiceUrl();
        this.getQueueInfo();


    }

    getQueueInfo() {

        let customer_rawid_ = '';

        if (this.globalVars.vars == null) {
            customer_rawid_ = '10010012';
        } else {
            if (this.globalVars.vars.length > 0) {
                customer_rawid_ = this.globalVars.vars[0].rawid;
            } else {
                customer_rawid_ = '10010012';
            }
        }



        this.showLoading();
        //  console.log(this.param);
        //json start
        var data = [];

        data.push({
            KEY_RAWID: this.KEY_RAWID,
            CUSTOMER_RAWID: customer_rawid_
        });



        this.jsonpService.getDefaultAPI('8006', data).subscribe(
            data => {

                if (data != null) {
                    console.log(data.A);
                    this.itemsA = data.A;
                    this.itemsB = data.B;

                    this.USER_IMG = data.A[0].USER_IMG;
                    this.PHONE_NUMBER = data.A[0].PHONE_NUMBER;  
                    this.ALIAS = data.A[0].ALIAS;

                    //this.ART_RAWID = data[0].ART_RAWID;
                    /*
                    this.ALIAS = data[0].ALIAS;
                    this.CUSTOMER_RAWID = data[0].CUSTOMER_RAWID;
                    this.IMG_ALIAS = data[0].IMG_ALIAS;
                    this.F_AGE = data[0].F_AGE;
                    this.T_AGE = data[0].T_AGE;
                    this.RUNNING = data[0].RUNNING;
                    this.Q_DTTS = this.convertDate(data[0].Q_DTTS);
                    this.TITLE = data[0].TITLE;
                    this.HH = data[0].HH;
                    this.MM = data[0].MM;
                    this.PEOPLE = data[0].PEOPLE;
                    this.COST = data[0].COST;
                    this.SEAT = data[0].SEAT;
                    this.CREATE_DTTS = data[0].CREATE_DTTS;

                    this.LOCATION_ALIAS = data[0].LOCATION_ALIAS;
                    this.PHONE_NUMBER = data[0].PHONE_NUMBER;
                    this.LOCATION_ID = data[0].LOCATION_ID;
                    this.LAT = data[0].LAT;
                    this.LNG = data[0].LNG;

                    let somedate = new Date(this.Q_DTTS);
                    this.WEEK = this.getWeekDay(somedate);
                    */

                   return;
               } else {
                    this.showError('예약정보가 없습니다');
                }

               

            },
            err => {
                this.showError('예약정보가 없습니다');
                this.loading.dismiss();
            },
            () => {
                this.loading.dismiss();

            }
        ); //json end
        
    }

    convertDate(value): string {

        return value.substring(0, 10);;
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
       // console.log('dddd');
        //this.navCtrl.popToRoot();

        //this.navCtrl(Default);
       this.view.dismiss();
    }

    callPrompt(uuid) {
        window.open("tel:" + uuid);
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



        }
    }


}

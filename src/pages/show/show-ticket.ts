import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ViewController } from 'ionic-angular';
import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';
import { Default } from '../default/default';
import { EnvironmentProvider } from '../../providers/environment-provider';

import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { FirebaseMessageService } from '../../firebase/firebasemessage-service';

@Component({
    selector: 'page-show-ticket',
    templateUrl: 'show-ticket.html',
    providers: [JsonpService , FirebaseMessageService]
})
export class ShowTicketPage {

    loading: Loading;
    selectedItem: any;
    icons: string[];
    items: Array<{ title: string, note: string, icon: string }>;
  

    webServiceUrl: string;

    RAWID: string;
    ALIAS: string;
    ART_RAWID: string;
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
    LOCATION_ALIAS: string;
    PHONE_NUMBER: string;
    SEAT: string;

    LAT: string;
    LNG: string;


    WEEK: string;
    MEMBER_RAWID: string;

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

        this.RAWID = this.navParams.get('RAWID');
        this.MEMBER_RAWID = this.navParams.get('USER_RAWID');



        //let somedate = new Date(this.navParams.get('CREATE_DTTS'));
        //this.WEEK = this.getWeekDay(somedate);

        this.webServiceUrl = this.environmentProvider.getWebServiceUrl();
        this.getQueueInfo();

        //test
        //this.test();
    }

    getQueueInfo() {

        this.showLoading();
        //  console.log(this.param);
        //json start
        var data = [];

        data.push({
            RAWID: this.navParams.get('RAWID'),
            USER_RAWID: this.MEMBER_RAWID
        });


        console.log(this.MEMBER_RAWID);


        this.jsonpService.getDefaultAPI('7003', data).subscribe(
            data => {
                console.log(data);
                if (data == null) {
                    
                   return;
               }
                if (data.length > 0) {
                    this.items = data;
        
                    this.ART_RAWID = data[0].ART_RAWID;
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


            //test



        }
    }


}

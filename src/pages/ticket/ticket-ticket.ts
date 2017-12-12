import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ViewController } from 'ionic-angular';
import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';
import { Default } from '../default/default';
import { EnvironmentProvider } from '../../providers/environment-provider';

import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { FirebaseMessageService } from '../../firebase/firebasemessage-service';

import { SearchAddrDaumPage } from '../map/search-addr-daum';


@Component({
    selector: 'page-ticket-ticket',
    templateUrl: 'ticket-ticket.html',
    providers: [JsonpService , FirebaseMessageService]
})
export class TicketTicketPage {

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
    MEMBER_IMG: string;
    MEMBER_ALIAS: string;
    ADDRESS: string;
    PHONE_NUMBER: string;


    SEAT: string;





    LAT: string;
    LNG: string;


    

    WEEK: string;
    MEMBER_RAWID: string;
    BOOK_RAWID : number;
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


        this.BOOK_RAWID = this.navParams.get('BOOK_RAWID');


        //this.MEMBER_RAWID = this.navParams.get('USER_RAWID');

        this.webServiceUrl = this.environmentProvider.getWebServiceUrl();
        this.getQueueInfo();


    }

    getQueueInfo() {

        let member_rawid_ = '';

        if (this.globalVars.vars == null) {
            member_rawid_ = '10010011';
        } else {
            if (this.globalVars.vars.length > 0) {
                member_rawid_ = this.globalVars.vars[0].rawid;
            } else {
                member_rawid_ = '10010011';
            }
        }



        this.showLoading();
        //  console.log(this.param);
        //json start
        var data = [];

        data.push({
            MEMBER_RAWID: member_rawid_,
            BOOK_RAWID: this.BOOK_RAWID
        });



        this.jsonpService.getDefaultAPI('9005', data).subscribe(
            data => {

                if (data != null) {
                    console.log(data.A);
                    this.itemsA = data.A;
                    this.itemsB = data.B;

                    this.MEMBER_IMG = data.A[0].MEMBER_IMG;
                    this.MEMBER_ALIAS = data.A[0].MEMBER_ALIAS;  
                    this.PHONE_NUMBER = data.A[0].PHONE_NUMBER;  
                    this.ADDRESS = data.A[0].ADDRESS;
                    this.LAT = data.A[0].LAT;
                    this.LNG = data.A[0].LNG;
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

    showModalPage() {

        let itemData = {
            ADDRESS: this.ADDRESS,
            ALIAS: this.MEMBER_ALIAS,
            LAT: this.LAT,
            LNG: this.LNG,
            PHONE_NUMBER: this.PHONE_NUMBER
        }

        let modal = this.modalCtrl.create(SearchAddrDaumPage, itemData);

        modal.onDidDismiss(data => {

            if (data != null) {
            } else {
                console.log('null');
            }
        });

        modal.present();

    }




}

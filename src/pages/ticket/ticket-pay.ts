import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ViewController } from 'ionic-angular';

import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';
import { QbookingPage } from '../qpass/q-booking';
import { EnvironmentProvider } from '../../providers/environment-provider';


import { TicketTicketPage } from '../ticket/ticket-ticket';
import swal from 'sweetalert2'; 


@Component({
    selector: 'page-ticket-pay',
    templateUrl: 'ticket-pay.html',
    providers: [JsonpService]
})

export class TicketPayPage {

    loading: Loading;

    items: Array<any>;
    itemsFood: Array<any>;
    webServiceUrl: string;
    KEY_RAWID: number;



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
    CATEGORY_CD: string;
    TIME_RAWID: string;
    ART_RAWID: string;
    OPEN_DTTS: string;
    USER_RAWID: string;

    

    RUNNING: string;
    HH_1: string;
    MM_1: string;
    HH_2: string;
    MM_2: string;
    BOOK_PEOPLE: number = 0;
    MAX_PEOPLE: number = 0;
    SUM_COST: number = 0;
    USER_COST: number = 0;


    SEATS: string = '';

    ISCONFIRM : boolean = false;




    PEOPLE: number = 0;
    TOTAL: number = 0;


    TICKET_PER: number = 0;
    FOOD_PER: number = 0;


    TICKET: number = 0;
    FOOD: number = 0;
    TICKET_COST: number = 0;
    FOOD_COST: number = 0;




    itemsSeat: Array<{ ROW: number, SEAT: number }>;
    itemsTimeList: Array<{ HH: string, MM: string }>;


    //IMG_ALIAS

    constructor(
        public navCtrl: NavController, private view: ViewController
        , private environmentProvider: EnvironmentProvider
        , public events: Events
        , private navParams: NavParams
        , private alertCtrl: AlertController
        , private jsonpService: JsonpService
        , private loadingCtrl: LoadingController
        , private modalCtrl: ModalController
        , private globalVars: GlobalVars) {


       // console.log(this.navParams.data);


        //this.param = navParams;
        // console.log(navParams);

        //if (navParams.get('count') != null) {
        //    this.rsvCount = Number(navParams.get('count'));
        //}

        //1012

        this._initializeApp();

    }

    _initializeApp() {

        this.itemsTimeList = [];
        for (let i = 10; i < 20; i++) {
            this.itemsTimeList.push({
                HH:  i.toString(),
                MM: '00'
            });
        }




        this.KEY_RAWID = this.navParams.get('KEY_RAWID');
        this.OPEN_DTTS = this.navParams.get('OPEN_DTTS');


        this.DATE = this.navParams.get('OPEN_DTTS').toString().substring(5, 10);


        this.IMG_ALIAS = this.navParams.get('IMG_ALIAS');
        this.ART_RAWID = this.navParams.get('ART_RAWID');

        //this.OPEN_RAWID = this.navParams.get('OPEN_RAWID');

        this.ADDRESS = this.navParams.get('LOCATION');

        this.CATEGORY_CD = this.navParams.get('CATEGORY_CD');


       // this.ALIAS = this.navParams.get('ALIAS');
        this.COST = this.navParams.get('COST');
       // this.CREATE_DTTS = this.navParams.get('CREATE_DTTS');
        
        this.RUNNING = this.navParams.get('RUNNING');

        this.TITLE = this.navParams.get('TITLE');


        let somedate = new Date(this.navParams.get('OPEN_DTTS'));
        this.WEEK = this.getWeekDay(somedate);

        this.webServiceUrl = this.environmentProvider.getWebServiceUrl();

        this.getArtShowInfList();

    }

    getArtShowInfList() {

        this.showLoading();
        //  console.log(this.param);
        //json start
        var data = [];

        data.push({
            KEY_RAWID: this.KEY_RAWID 
        });

        this.jsonpService.getDefaultAPI('9002', data).subscribe(
            data => {

                console.log(data);
                if (data != null) {

                    this.items = data.A;
                    this.itemsFood = data.B;
                    if (data.C[0].SUM_TICKET == null) {
                        console.log("0");
                    } else {
                        console.log(data.C[0].SUM_TICKET);
                    }
                    
                    if (data.A.length > 1) {
                        this.HH_1 = data.A[0].HH;
                        this.MM_1 = data.A[0].MM;
                        this.HH_2 = data.A[1].HH;
                        this.MM_2 = data.A[1].MM;


                        this.TICKET_PER = data.A[0].USER_COST;
                    } else {
                        this.HH_1 = data.A[0].HH;
                        this.MM_1 = data.A[0].MM;
                    }

                    if (data.B[0].COST != null) {
                        this.FOOD_PER = data.B[0].COST;
                    }

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

    onTimeChange(param) {


        this.HH_1 = this.itemsTimeList[param].HH;
        this.MM_1 = this.itemsTimeList[param].MM;

        let secondTime = parseInt(this.HH_1) + 2;
        this.HH_2 = secondTime.toString();
        this.MM_2 = this.MM_1;


    }


    changeTime(item) {


        if (item.USE_YN == 'N') { //미예약
  
            this.CREATE_HOUR = this.convertMM(item.CREATE_HOUR);
            this.CREATE_MIN = this.convertMM(item.CREATE_MIN);
            this.RAWID = item.QUEUE_RAWID;
            this.COST = item.COST;
        }
        
       // this.view.dismiss();
       // this.navCtrl.push(QbookingPage);

    }

    isUseYn(use) {
        console.log(use);

        if (use == 'N') {
            return 'seat keyvalue';
        } else {
            return 'row keyvalue';
        }


    }

    convertMM(value): string {

        console.log(value);
        let title = value;
        let min = Number(value);
        if (min < 10) { title = '0' + value; }

        return title;
    }

    dismiss() {
        this.view.dismiss();
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

    getWeekDay(valueDate) {

        let week = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
        return week[valueDate.getDay()];
    }

    confirmPay() {

        let self = this;
        swal({
            title: 'Do you want',
            text: 'Ticket',
            type: 'success',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(function () {

          
            self.pay();

            }, function (dismiss) {

               // parent.this.ISCONFIRM  = false;

        });


   

    }
    pay() {


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

        var d = new Date();
        let book_rawid = d.getTime();
 
        var data = [];

        data.push({
            TABLE_NAME: 'ART_RSV_APP',
            MEMBER_RAWID: member_rawid_,
            BOOK_RAWID: book_rawid,
            KEY_RAWID: this.KEY_RAWID,
            TICKET: this.TICKET,
            FOOD: this.FOOD,
            TICKET_COST: this.TICKET_COST,
            FOOD_COST: this.FOOD_COST
        });
      
        

        this.showLoading();
        //insert
        this.jsonpService.sqlInsertRawId(data).subscribe(
            data => {


                if (data != null) {
                    this.ticketBuyComplete(book_rawid);
                }

                // this.getSearchDataList(this.date);
            },
            err => {
                //이미 예약인 경우 이쪽으로 메세지가 들어온다

                this.loading.dismiss();
                this.showError('이미 예약이 완료되었습니다');

            },
            () => {
                this.loading.dismiss();
            }
        );


        /*
        if (this.globalVars.vars == null) {
            return;
        }

        if (this.globalVars.vars.length > 0) {
           this.showLoading();

            var data = [];

            data.push({
                TABLE_NAME: 'QUEUE_RSV_APP',
                MEMBER_RAWID: this.globalVars.vars[0].rawid,
                QUEUE_RAWID: this.RAWID,
                CATEGORY_CD: this.CATEGORY_CD

            });


            //insert
            this.jsonpService.sqlInsertRawId(data).subscribe(
                data => {

                    this.queueComplete();
                    this.loading.dismiss();
                    // this.getSearchDataList(this.date);
                },
                err => {
                    //이미 예약인 경우 이쪽으로 메세지가 들어온다

                    this.loading.dismiss();
                    this.showError('이미 예약이 완료되었습니다');

                },
                () => {
                    this.loading.dismiss();
                }
            );
        }//if
        */
    }

    setSumCost(param) {

        console.log(param);
        this.SUM_COST = this.SUM_COST + parseInt(param);
    }

    ticketBuyComplete(bookRawid) {

        let itemData = {
            BOOK_RAWID: bookRawid
        }

        this.navCtrl.push(TicketTicketPage, itemData);

        this.view.dismiss();

    }



    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: this.globalVars.loading
        });
        this.loading.present();
    }
    queueComplete() {
        this.view.dismiss();
        let itemData = {
            RAWID: this.RAWID,
            IMG_ALIAS: this.navParams.get('IMG_ALIAS'),
            ALIAS: this.navParams.get('ALIAS'),
            CREATE_DTTS: this.navParams.get('CREATE_DTTS'),
            MONEY: this.navParams.get('MONEY'),
            NAME: this.navParams.get('NAME'),
            TITLE: this.navParams.get('TITLE'),
            PHONE_CODE: this.navParams.get('PHONE_CODE'),
            ADDRESS: this.navParams.get('ADDRESS')
        }
        this.navCtrl.push(QbookingPage, itemData);
        
    }

    upTButtonClick() {

        this.TICKET = this.TICKET + 1;
        this.setTotalCost();
    }
    downTButtonClick() {
        this.TICKET = this.TICKET - 1;
        this.setTotalCost();
    }

    upFButtonClick() {

        this.FOOD = this.FOOD + 1;
        this.setTotalCost();
    }
    downFButtonClick() {
        this.FOOD = this.FOOD - 1;
        this.setTotalCost();
    }

    

    setTotalCost() {

        this.FOOD_COST = this.FOOD * this.FOOD_PER;
        this.TICKET_COST = this.TICKET * this.TICKET_PER;

        this.TOTAL = this.FOOD_COST + this.TICKET_COST;
    }

}

import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ViewController } from 'ionic-angular';

import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';
import { QbookingPage } from '../qpass/q-booking';
import { EnvironmentProvider } from '../../providers/environment-provider';

import { BookFoodPage } from '../book/book-food';
import { BookPayModal } from '../book/book-pay-modal';
import swal from 'sweetalert2'; 


@Component({
    selector: 'page-book-pay',
    templateUrl: 'book-pay.html',
    providers: [JsonpService]
})

export class BookPayPage {

    loading: Loading;
    param: any;
    items: Array<any>;
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

    PEOPLE: number = 0;
    TOTAL: number = 0;

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


        //console.log(this.navParams.data);


        this.param = navParams;
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




        this.USER_RAWID = this.navParams.get('USER_RAWID');
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
            USER_RAWID: this.USER_RAWID ,
            DATE: this.OPEN_DTTS 
        });

        this.jsonpService.getDefaultAPI('8005', data).subscribe(
            data => {

                if (data.length != null) {


                    this.items = data;

                    for (var i = 0; i < data.length; i++) {
                        this.SUM_COST = this.SUM_COST + parseInt(data[i].COST);
                        
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

        //KEY_RAWID
        var d = new Date();
        this.KEY_RAWID = d.getTime();

        var data = [];

        for (var i = 0; i < this.items.length; i++) {

            console.log(this.items[i].SEQ);
            if (parseInt(this.items[i].SEQ) === 1) {
                data.push({
                    TABLE_NAME: 'ART_BOOK_PRO',
                    KEY_RAWID: this.KEY_RAWID,
                    ART_RAWID: this.items[i].ART_RAWID,
                    CAN_RAWID: this.items[i].CAN_RAWID,
                    OPEN_DTTS: this.items[i].OPEN_DTTS,
                    CUSTOMER_RAWID: customer_rawid_,
                    HH: this.HH_1,
                    MM: this.MM_1,
                    PEOPLE: this.PEOPLE,
                    COST: this.TOTAL,
                    USE_YN: 'N',
                    BOOK_COST: 0,
                    USER_COST : this.USER_COST

                });

            } else {
                data.push({
                    TABLE_NAME: 'ART_BOOK_PRO',
                    KEY_RAWID: this.KEY_RAWID,
                    ART_RAWID: this.items[i].ART_RAWID,
                    CAN_RAWID: this.items[i].CAN_RAWID,
                    OPEN_DTTS: this.items[i].OPEN_DTTS,
                    CUSTOMER_RAWID: customer_rawid_,
                    HH: this.HH_2,
                    MM: this.MM_2,
                    PEOPLE: this.PEOPLE,
                    COST: this.TOTAL,
                    USE_YN: 'N',
                    BOOK_COST: 0,
                    USER_COST: this.USER_COST

                });
            }
            

        }


      
        

        this.showLoading();
        //insert
        this.jsonpService.sqlInsertList(data).subscribe(
            data => {

                if (parseInt(data) === 2) {
                    console.log('TWO INSERT')
                    this.ticketBuyComplete(data);
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

    ticketBuyComplete(ticketRawid) {

        let itemData = {
            OPEN_DTTS: this.OPEN_DTTS,
            KEY_RAWID: this.KEY_RAWID
        }

        this.navCtrl.push(BookFoodPage, itemData);

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

    upButtonClick() {

        this.PEOPLE = this.PEOPLE + 1;
        this.setTotalCost();


    }
    downButtonClick() {
        this.PEOPLE = this.PEOPLE - 1;
        this.setTotalCost();
    }

    setTotalCost() {
        this.TOTAL = this.SUM_COST * this.PEOPLE;
    }


    openPopover() {


        let modal = this.modalCtrl.create(BookPayModal);

        modal.onDidDismiss(data => {

            if (data != null) {
                this.USER_COST = data;
                console.log(this.USER_COST);
            } else {
                console.log('null');
            }
        });

        modal.present();
    }
}

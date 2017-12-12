import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ViewController } from 'ionic-angular';

import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';
import { QbookingPage } from '../qpass/q-booking';
import { EnvironmentProvider } from '../../providers/environment-provider';


@Component({
    selector: 'page-q-list',
    templateUrl: 'q-list.html',
    providers: [JsonpService]
})

export class QlistPage {

    loading: Loading;
    param: any;
    items: Array<any>;
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
    CATEGORY_CD: string;
    


    //IMG_ALIAS

    constructor(
        public navCtrl: NavController, private view: ViewController
        , private environmentProvider: EnvironmentProvider,
        public events: Events, private navParams: NavParams, private alertCtrl: AlertController, private jsonpService: JsonpService, private loadingCtrl: LoadingController, private modalCtrl: ModalController, private globalVars: GlobalVars) {

        this.param = navParams;
        // console.log(navParams);

        //if (navParams.get('count') != null) {
        //    this.rsvCount = Number(navParams.get('count'));
        //}

        //1012

        this._initializeApp();

    }

    _initializeApp() {
        this.IMG_ALIAS = this.navParams.get('IMG_ALIAS');
        this.ALIAS = this.navParams.get('ALIAS');
        this.COST = this.navParams.get('COST');
        this.CREATE_DTTS = this.navParams.get('CREATE_DTTS');
        this.DATE = this.navParams.get('CREATE_DTTS').toString().substring(5, 10);
        this.CREATE_HOUR = this.convertMM(this.navParams.get('CREATE_HOUR'));
        this.CREATE_MIN = this.convertMM(this.navParams.get('CREATE_MIN'));
        this.RAWID = this.navParams.get('RAWID');
        this.MONEY = this.navParams.get('MONEY');
        this.NAME = this.navParams.get('NAME');
        this.TITLE = this.navParams.get('TITLE');
        this.PHONE_CODE = this.navParams.get('PHONE_CODE');
        this.ADDRESS = this.navParams.get('ADDRESS');
        this.CATEGORY_CD = this.navParams.get('CATEGORY_CD');
        

        let somedate = new Date(this.navParams.get('CREATE_DTTS'));
        this.WEEK = this.getWeekDay(somedate);

        this.webServiceUrl = this.environmentProvider.getWebServiceUrl();
        this.getSearchHospitalList();
    }

    getSearchHospitalList() {

        this.showLoading();
        //  console.log(this.param);
        //json start
        var data = [];

        data.push({
            CUSTOMER_RAWID: this.navParams.get('CUSTOMER_RAWID'), //CREATE_DTTS
            DATE: this.navParams.get('CREATE_DTTS')
        });

        this.jsonpService.getDefaultAPI('1012', data).subscribe(
            data => {

                console.log(data);
                if (data.length > 0) {


                    this.items = data;

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

    pay() {

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


}

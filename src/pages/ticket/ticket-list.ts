import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ActionSheetController } from 'ionic-angular';
import { Device } from '@ionic-native/device'; 
import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';

import { EnvironmentProvider } from '../../providers/environment-provider';



import { SearchAddressPage } from '../map/search-address';
import { TicketPayPage } from '../ticket/ticket-pay';




@Component({
    selector: 'pages-ticket-list',
    templateUrl: 'ticket-list.html',
    providers: [JsonpService]
})
export class TicketListPage {

    loading: Loading;
    items: Array<any>;
    itemsInfo: Array<any>;

    parameter : Array<any>;
    strUuid: string = '';
    strCurrentAddr: string = '';
    strCurrentAddrColor: string = '';
    strTitle: string = '';
    webServiceUrl: string;

    targetValue: number = 1300;

    public selected: Number;
    public selectedDate: string = '';
    itemsWeek: Array<{ ID: Number, VALUE: string, WEEK: string, DAY: string }>;

    //test
    userLocation: string = '지역을 검색해 주세요';

    constructor(
        public navCtrl: NavController
        , public events: Events
        , private navParams: NavParams
        , private jsonpService: JsonpService
        , private loadingCtrl: LoadingController
        , private alertCtrl: AlertController
        , private modalCtrl: ModalController
        , private environmentProvider: EnvironmentProvider
        , private actionSheetCtrl : ActionSheetController 
        , private globalVars: GlobalVars) {

        //this.strTitle = 'SPC TEST';
        //this.strCurrentAddr = '현재위치정보 사용을 승인해 주세요';
        //this.strCurrentAddrColor = 'red';

        //this._initializeApp();
        //this._createEvent();
        //test


        this.itemsWeek = [];
        for (var i = 0; i < 8; i++) {


            let someDate = new Date(new Date().getTime() + (i * 24 * 60 * 60 * 1000));
            let week = this.getWeekDay(someDate);


            var dd = someDate.getDate();
            var mm = someDate.getMonth() + 1; //January is 0!
            var yyyy = someDate.getFullYear();

            var strMM: string = mm.toString();
            var strDD: string = dd.toString();

            if (mm < 10) { strMM = '0' + mm.toString(); }
            if (dd < 10) { strDD = '0' + dd.toString(); }

            var today = yyyy + '-' + strMM + '-' + strDD;



            this.itemsWeek.push({
                ID: i,
                VALUE: today,
                WEEK: week,
                DAY: strDD
            });

            if (i == 0) {
                this.selectedDate = today;
                this.selected = 0;
            }
        }


    }


    getArtListInfo() {


        this.webServiceUrl = this.environmentProvider.getWebServiceUrl();
    
        var data = [];

        data.push({
            DATE: this.selectedDate,
            LAT: 30,
            LNG: 40,
            DISTANCE: 5
        });

      
        this.showLoading();

        this.jsonpService.getDefaultAPI('9001', data).subscribe(
            data => {

                if (data != null) {
                    this.items = this.getDistinct(data);
                    this.itemsInfo = data;

                } else {
                    this.showError('내용이 없습니다.');
                }
            },
            err => {
                this.showError('내용이 없습니다');

            },
            () => {
                this.loading.dismiss();
            }
        ); //json end

    }



    getDistinct(value: any) {

        var uniqueNames = [];
        var itemData = [];
        for (var i = 0; i < value.length; i++) {
            if (uniqueNames.indexOf(value[i].KEY_RAWID) === -1) {
                uniqueNames.push(value[i].KEY_RAWID);
                itemData.push(value[i]);
            }
        }

        console.log(itemData.length);
        return itemData;


    }


    onSelect(param) {

        var actionSheet = this.actionSheetCtrl.create({
            title: param.TITLE,
            buttons: [
                {
                    text: '공연 예약하기',
                    handler: () => {
                        this.showlist(param);
                    }
                },
                {
                    text: '공연정보 보기',
                    handler: () => {


                        
                        this.parameter = param;

                        console.log(this.parameter);
                        this.showInfo(param);
                        // this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: '닫기',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();


        /*
        let modal = this.modalCtrl.create(DonateInfPage, param);
        modal.onDidDismiss(data => {
            console.log('address search DATA');

            if (data != null) {
                console.log('ok');
            } else {
                console.log('no');
            }
        });

        modal.present();
        */
    }
    //1013

    showlist(param) {

        this.navCtrl.push(TicketPayPage, param);

    }


    showInfo(param) {


        //let modal = this.modalCtrl.create(BookInfPage, param);
        //modal.onDidDismiss(data => {
       
        //    if (data != null) {
        //        console.log('ok');
        //    } else {
        //        console.log('no');
        //    }
        //});

        //modal.present();
    }



    ionViewDidLoad() {

    }

    public _initializeApp() {


        if (this.globalVars.vars == null) {
            return;
        }
        //1003 로그인이 되었을 경우 현재 위치를 가져올 수 있습니다.

        if (this.globalVars.vars.length > 0) {

            if (this.globalVars.AddressInfor != null) {

                this.strCurrentAddr = this.globalVars.AddressInfor[0].address;
            } else {

                var data = [];

                data.push({
                    MEMBER_RAWID: this.globalVars.vars[0].rawid
                });

                this.showLoading();
                this.jsonpService.getDefaultAPI('1003', data).subscribe(
                    data => {

                        console.log('69>>> ' + data.length);
                        if (data.length > 0) {

                            console.log('72>>> ' + data[0].ADDRESS);

                            this.globalVars.setAddress(data[0].ADDRESS, data[0].LAT, data[0].LNG);
                            this.strCurrentAddr = data[0].ADDRESS;

  
                        } 

                        this.loading.dismiss();

                    },
                    err => {
        
                        this.loading.dismiss();
                    },
                    () => {

                    }
                );//jsonpService

            }// if (this.globalVars.AddressInfor.length > 0)
        }//if (this.globalVars.vars.length > 0)
    }

    ngOnInit() {
  
      
    }

    convertDate(value): string {

        return value.substring(5, 10);;
    }



    showQpass() {
        //this.navCtrl.setRoot(QSearchPage);
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


    showAddressSearch() {

        console.log('start');

        //SearchAddrDaumPage , SearchAddressPage
        let modal = this.modalCtrl.create(SearchAddressPage, '');
        //modal.onDidDismiss
        modal.onDidDismiss(data => {
            console.log('address search DATA', data);

            if (data != null) {
                this.getAddress(data);
            }
        });

        modal.present();
        
    }

    getAddress(param: any) {

        console.log('data' + param)
        if (param.address != null) {
            this.userLocation = param.address;

        }
        //검색한 정보를 DB에 저장하기

    }


    onDateChange(date: Number) {



    for (let i = 0; i < this.itemsWeek.length; i++) {
        if (this.itemsWeek[i].ID == date) {
            this.selectedDate = this.itemsWeek[i].VALUE;
            break;
        }
    }

    this.selected = date;

    this.getArtListInfo();


    }

    getWeekDay(valueDate) {
        var week = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
        return week[valueDate.getDay()];
    }

}

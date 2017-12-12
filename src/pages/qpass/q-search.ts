﻿import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ViewController  } from 'ionic-angular';
import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';
import { DomSanitizer } from '@angular/platform-browser';

//test

import { EnvironmentProvider } from '../../providers/environment-provider';

import { ModalQfilter } from '../qpass/modal-q-filter';
import { QlistPage } from '../qpass/q-list';
import { Default } from '../default/default';

import { SearchAddressPage } from '../map/search-address';
//import { AroundMePage } from '../search/around';


@Component({
    selector: 'page-q-search',
    templateUrl: 'q-search.html',
    providers: [JsonpService, EnvironmentProvider]
})
export class QSearchPage {

    loading: Loading;
    strUuid: string = '';
    strCurrentAddr: string = '';
    strCurrentAddrColor: string = '';
    strTitle: string = '';

    items: Array<any>;
    itemsTime: Array<{ CREATE_HOUR: string, RAWID_LIST: string }>;

    

    //  items: Array<{title: string, note: string, icon: string}>;
    itemsCategory: Array<any>;

    itemsBookY: Array<any>;
    itemsBookN: Array<any>;

    //test
    test: string = '';

    webUrl: string = '';
    webServiceUrl: string;
    dateTime: Date = null;

    filtering : string = '30';
    public selectedTechId: string;
    theHtmlString: any;

    public selected: Number;
    public eventDate = {
        month: '1990-02-19',
        timeStarts: '09:00',
        timeEnds: '1990-02-20'
    }
    public selectedDate: string = '';
    itemsWeek: Array<{ ID: Number, VALUE: string, WEEK: string, DAY: string  }>;

    userLocation = { location: '출발지 검색', lat: '0', lng: '0', use : 'N' };


    constructor(
        public navCtrl: NavController
        , public events: Events
        , private navParams: NavParams
        , private jsonpService: JsonpService
        , private loadingCtrl: LoadingController
        , private modalCtrl: ModalController
        , private environmentProvider: EnvironmentProvider
        , private alertCtrl: AlertController
        , private view: ViewController
        , private sanitizer: DomSanitizer
        , private globalVars: GlobalVars) {


        /*
        this.strTitle = 'SPC TEST';
        this.strCurrentAddr = '현재위치정보 사용을 승인해 주세요';
        this.strCurrentAddrColor = 'red';

        this._initializeApp();
        this._createEvent();

        */

        //test
        /*

     
        var myArray = [
            { group: "one", color: "red",  date: "dddddd111"},
            { group: "two", color: "blue", date: "dddddd222" },
            { group: "one", color: "green", date: "dddddd333" },
            { group: "one", color: "black", date: "dddddd4444" }
        ];

        var group_to_values = myArray.reduce(function (obj, item) {
            obj[item.group] = obj[item.group] || [];
            obj[item.group].push(item);
            return obj;
        }, {});

        

        let aaaa: Array<any>;
        let bbbb: Array<any>;

        Object.keys(group_to_values).map(function (key) {
            if (key == 'one') {
                aaaa = group_to_values[key];
            } else {
                bbbb = group_to_values[key];
            }
    
        });

        this.itemsBookY = aaaa;
        console.log('this.itemsBookY ');
        console.log(this.itemsBookY );
   */
        /*

        this.Testitems = Object.keys(group_to_values).map(function (key) {
            return { group: key, color: group_to_values[key] };
        });

        for (var key in this.Testitems) {

            key.v
            myArray.push({
                'group': key,
                'color': newArray[key]
            });
        }

        */


        //this.dateTime = new Date(navParams.get('DATE_DTTS')); 
        this._createEvent();
        this._initializeApp();

    }



    _createEvent() {


        this.events.subscribe('event:default', () => {
            // user and time are the same arguments passed in `events.publish(user, time)`
            this.navCtrl.setRoot(Default);
        });
    }




    _initializeApp() {


        // itemsWeek: Array<{ ID: Number, VALUE: string, WEEK: string  }>;
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
            }
        }

        this.selected = 0;
  
        this.eventDate.month = '2017-09-18';//this.globalVars.getToday();
        this.eventDate.timeEnds = this.globalVars.getToday();
        this.webServiceUrl = this.environmentProvider.getWebServiceUrl();

        //this.getServiceQueueList();
        this.getLocationDb();
        this.getCodeDataList(); //category code


        //if (this.globalVars.vars == null) {
        //    return;
        //}
        //1003 로그인이 되었을 경우 현재 위치를 가져올 수 있습니다.

        /*
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

                        this.test = data[0].ADDRESS;

                        if (data.length > 0) {

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

        */
    }

    getLocationDb() {
        

        if (this.globalVars.vars == null) {
            return;
        }

        if (this.globalVars.vars.length > 0) {

            var data = [];

            data.push({
                USER_RAWID: this.globalVars.vars[0].rawid
            });

            this.jsonpService.getDefaultAPI('2001', data).subscribe(
                data => {

                    if (data.length > 0) {

                        this.userLocation.location = data[0].ADDRESS;
                        this.userLocation.lat = data[0].LAT;
                        this.userLocation.lng = data[0].LNG;
                        this.userLocation.use = 'Y'


                    } 
                   

                },
                err => {
                    
                },
                () => {

                }
            );//json end
        }//if

       
    }

    getWeekDay(valueDate) {

        let week = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
        return week[valueDate.getDay()];
    }
    onTimeChange(showtimeId: string) {

        this.showLoading();
        let rawid = '';
        for (var i = 0; i < this.itemsTime.length; i++) {


            if (this.itemsTime[i].CREATE_HOUR == showtimeId) {
                rawid = this.itemsTime[i].RAWID_LIST;
                break;
            }

        }




        

        //json start
        var data = [];

        data.push({
            RAWID: rawid
        });

        this.jsonpService.getDefaultAPI('1011', data).subscribe(
            data => {

                if (data.length > 0) {
                    this.items = data;
                    console.log(data);

                    //  html += ' <div  class="time" radio-group (ionChange)="onTimeChange($event)">';

                  


                    this.loading.dismiss();

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
        );//json end



        //여기서 값을 받아서 검색하기
    }

    onCategoryChange(category: string) {

 
        this.selectedTechId = category;
        if (this.userLocation.use == 'Y') {
            this.getSearchHospitalList();
        } else {
            //지역을 선택하쇼ㅔ요
        }
        
    }

    //category
    getCodeDataList() {

        this.showLoading();

        var data = [];

        data.push({
            CATEGORY: 'HOSPITAL'
        });

        this.jsonpService.getCommonAPI('2000', data).subscribe(
            data => {

                if (data.length > 0) {
                    this.loading.dismiss();
                
                    this.itemsCategory = data;
                } 

            },
            err => {
                this.loading.dismiss();
            },
            () => {
                this.loading.dismiss();
                

            }
        );//json end
    }

    getSearchHospitalList() {
        this.itemsTime = [];

        //this.showLoading();

        //json start
        var data = [];

        data.push({
            LAT: this.userLocation.lat,
            LNG: this.userLocation.lng,
            DISTANCE: '3000000000',  //1000 >> 1km,
            CATEGORY: this.selectedTechId ,
            DATE: this.selectedDate
        });

        this.jsonpService.getDefaultAPI('1010', data).subscribe(
            data => {

                console.log(data);
                if (data.length > 0) {


                   //  html += ' <div  class="time" radio-group (ionChange)="onTimeChange($event)">';
                  
                    let oldTime = 0;
                    for (var i = 0; i < data.length; i++) {
        
                        if (oldTime > 0) {
                            if (oldTime + 1 < Number(data[i].CREATE_HOUR)) {

                                for (var j = oldTime+1; j < Number(data[i].CREATE_HOUR); j++) {

                                    this.itemsTime.push({
                                        CREATE_HOUR: (j).toString(),
                                        RAWID_LIST: 'N'
                                    });
                                }
                            }
                            
                        }

                        this.itemsTime.push({
                            CREATE_HOUR: data[i].CREATE_HOUR.toString().trim(),
                            RAWID_LIST: data[i].RAWID_LIST.toString().trim()
                        });

                        oldTime = Number(data[i].CREATE_HOUR);

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
        );//json end
    }

    isAfterNow(value:string){

       if (value.trim() == 'N') {
           return true;
       } else {
           return false;
       }
    
    }
    

    getServiceQueueList() {

        var data = [];

        data.push({
            USER_RAWID: '555',
            DATE: this.eventDate.month
        });


        this.jsonpService.getDefaultAPI('1008', data).subscribe(
            data => {

                this.items = data;

                if (data != null) {

                   // this.itemsBookY = [];
                    let temp_Y: Array<any>;
                    let temp_N: Array<any>;
               
                    var group_to_values = data.reduce(function (obj, item) {
                        obj[item.BOOK] = obj[item.BOOK] || [];
                        obj[item.BOOK].push(item);
                        return obj;
                    }, {});

                    Object.keys(group_to_values).map(function (key) {


                        if (key.trim() == 'Y') { 
                            temp_Y = group_to_values[key];
                        } else {
                            temp_N = group_to_values[key];
                            //bbbb = group_to_values[key];
                        }

                    });


                    this.itemsBookY = temp_Y;
                    this.itemsBookN = temp_N;

                    /*

                    data.reduce(function (obj, item) {

                        obj[item.BOOK] = obj[item.BOOK] || [];



                        if (item.BOOK.trim() == 'Y') {
                            this.itemsBookY.push(item);
                            console.log(item.BOOK);
                        } else {
                            this.itemsBookN.push(item);
                        }

                    }, {});
                    */
                        /*

                    var group_to_values = data.reduce(function (obj, item) {
                       
                        obj[item.BOOK] = obj[item.BOOK] || [];

                        

                        if (item.BOOK.trim() == 'Y') {
                            this.itemsBookY.push(item);
                            console.log(item.BOOK);
                        } else {
                            this.itemsBookN.push(item);
                        }
                        obj[item.BOOK].push(item);
                        return obj;
                    }, {});

                    */



                    //console.log(this.itemsBookY);
                    //console.log(this.itemsBookN);


                //MEMBER_RAWID
                /*
                let aaaa: Array<any>;
                let bbbb: Array<any>;

                var group_to_values = data.reduce(function (obj, item) {
                    obj[item.BOOK] = obj[item.BOOK] || [];
                    obj[item.BOOK].push(item);
                    return obj;
                }, {});

                Object.keys(group_to_values).map(function (key) {


                    if (key.trim() == 'Y') {
                        console.log('key == ' + key);
                        aaaa = group_to_values[key];
                    } else {
                        console.log('key == ' + key);
                        bbbb = group_to_values[key];
                    }

                });

                console.log('aaa');
                console.log(aaaa);
                console.log('bbb');
                console.log(bbbb);

                */
                //console.log(data);
                this.loading.dismiss();
                }

            },
            err => {

                this.items = null;
                this.loading.dismiss();
                this.showError('아이디/패스워드가 틀');
            },
            () => {

            }
        );//json end
    }


    //getCommonAPI
 
    imageReserve(memberRawid): string {
        if (memberRawid != '' && memberRawid != null) {
            return 'o.png';
        }
        return 'x.png';
    }

    statusReserve(memberRawid): string {

        if (memberRawid != '' && memberRawid != null) {
            return '문자보내기';
        }
        return '예약대기';
    }

    statusPhone(memberRawid): string {

        if (memberRawid != '' && memberRawid != null) {
            return '전화걸기';
        }

        return '';

    }

    convertHH(value): string {

        let title = '';
        let hour = Number(value);
        if (hour < 12) { title = '오전 ' + value; }
        else { title = '오후 ' + (hour - 12).toString(); }

        return title;
    }

    convertMM(value): string {

        let title = value;
        let min = Number(value);
        if (min < 10) { title = '0' + value; }

        return title;
    }


    convertDate(value): string {

        return value.substring(5, 10);;
    }
    clickChangeData() {

 
        if (this.selectedTechId != null && this.userLocation.lat != '0') {
            this.getSearchHospitalList();
        }

        

    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: this.globalVars.loading
        });
        this.loading.present();
    }

    showPopupPage(item) {

        let itemData = {
            month: item
        }

        let modal = this.modalCtrl.create(QlistPage, item);

        modal.onDidDismiss(data => {

            if (data != null) {
               // this.clickSearchData(); //update 시 
            } else {
                console.log('null');
            }
        });

        modal.present();

    }

    //위치검색
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
            this.userLocation.location = param.address;
            this.userLocation.lat = param.lat;
            this.userLocation.lng = param.lng;
            this.userLocation.use = 'Y';
            this.insertLoation();
        }
        //검색한 정보를 DB에 저장하기

    }

    insertLoation() {

        if (this.globalVars.vars == null) {
            return;
        }

        if (this.globalVars.vars.length > 0) {
           
            var data = [];

            data.push({
                TABLE_NAME: 'REGISTER_LOCATION_APP',
                MEMBER_RAWID: this.globalVars.vars[0].rawid,
                ADDRESS: this.userLocation.location.trim(),
                LAT: this.userLocation.lat,
                LNG: this.userLocation.lng

            });


            //insert
            this.jsonpService.sqlInsertRawId(data).subscribe(
                data => {

                },
                err => {
        

                },
                () => {
              
                }
            );
        }//if

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

    openPopover() {


        let modal = this.modalCtrl.create(ModalQfilter);

        modal.onDidDismiss(data => {

            if (data != null) {
                this.filtering = data.toString();
            } else {
                console.log('null');
            }
        });

        modal.present();
    }

    closePage() {
        console.log('close');
        this.view.dismiss();
    }




    onDateChange(date: Number) {
        
        for (let i = 0; i < this.itemsWeek.length ; i++)
        {
            if (this.itemsWeek[i].ID == date) {
                this.selectedDate = this.itemsWeek[i].VALUE; 
                break;
            }
        }

        this.selected = date;

        if (this.selectedTechId != null && this.userLocation.use == 'Y') {
            this.getSearchHospitalList();
        }

    }

    /*SLIDE*/


}

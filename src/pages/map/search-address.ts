import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { JsonpService } from '../../services/jsonp-service';
//MapService
declare var daum;


@Component({
    selector: 'page-search-address',
    templateUrl: 'search-address.html',
    providers: [JsonpService]
})

export class SearchAddressPage {

    private searchQuery: string = '';
    selectedItem: boolean = false;
    id: any;
    icons: string[];
    loading: Loading;
    daumAddr: any;
    address: any;
    hidAddr: any;

    items: Array<{ title: string, note: string, icon: string }>;



    //map
    // @ViewChild('daum') daumElement: ElementRef;
    daum: any;



    constructor(private navCtrl: NavController
        , private view: ViewController
        , private alertCtrl: AlertController
        , private loadingCtrl: LoadingController
        , private jsonpService: JsonpService) {


     //   console.log('ㅁ');
       // var geocoder = new daum.maps.services.Geocoder();

        //console.log('c');
        // 주소로 좌표를 검색합니다
        //geocoder.addressSearch('오포', function (result, status) {

        //    // 정상적으로 검색이 완료됐으면 
        //    if (status === daum.maps.services.Status.OK) {
        //        console.log('lat' + result[0].y);
        //        //property.lat = result[0].y;
        //        //property.lng = result[0].x;

        //    }
        //});  

 
    }



    ionViewDidLoad() {
        this.execDaumPostCode();

    }




    public aaa() {
        console.log('aaaa');
    }


    execDaumPostCode() {

        this.daumAddr = document.getElementById('daum');

        var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        new daum.Postcode({
            oncomplete: function (data) {


                var fullAddr = data.address; // 최종 주소 변수
                var extraAddr = ''; // 



                // 기본 주소가 도로명 타입일때 조합한다.
                if (data.addressType === 'R') {


                    if (data.bname !== '') {
                        extraAddr += data.bname;
                    }
                    // 건물명이 있을 경우 추가한다.
                    if (data.buildingName !== '') {
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                    fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
                }

              //  this.getDaumGeolocationDataComplete(fullAddr);


                document.getElementById('btnSelect').innerText = fullAddr;
                document.getElementById('btnSelect').click();

            },
            onresize: function (size) {
                this.daumAddr.style.height = size.height + 'px';
            },
            width: '100%',
            height: '100%'
        }).embed(this.daumAddr);

        // iframe을 넣은 element를 보이게 한다.
        this.daumAddr.style.display = 'block';

        //   this.initLayerPosition();

    }

    public getDaumGeolocationDataComplete(addr) {

        console.log('SAVE MESSAGE CALL OL OK');

    }

    initLayerPosition() {

        var width = 300; //우편번호 서비스가 들어갈 element의 width
        var height = 460; //우편번호 서비스가 들어갈 element의 height
        var borderWidth = 5; //샘플에서 사용하는 border의 두께

        // 위에서 선언한 값들을 실제 element에 넣는다.
        this.daumAddr.style.width = width + 'px';
        this.daumAddr.style.height = height + 'px';
        this.daumAddr.style.border = borderWidth + 'px solid';
        // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
        this.daumAddr.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width) / 2 - borderWidth) + 'px';
        this.daumAddr.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height) / 2 - borderWidth) + 'px';

    }

    dismiss() {


        console.log('a');

        this.showLoading();

        let property = {
            address: document.getElementById('btnSelect').innerText,
            lat: '0',
            lng: '0'
        };

       


        this.jsonpService.getDaumGeolocationData(property).subscribe(
            data => {
                
                console.log(data.channel.item.length);
                if (data.channel.item.length > 0) {
                    console.log(data.channel.item[0].lat);
                    console.log(data.channel.item[0].lng);

                    property.lat = data.channel.item[0].lat;
                    property.lng = data.channel.item[0].lng;
                }

                this.loading.dismiss();
                this.view.dismiss(property);

            },
            err => {
                this.loading.dismiss();
                this.view.dismiss(property);

            },
            () => {
                console.log('SAVE MESSAGE CALL END');

            }

        );

      


        //db 연결하기
        /*
        this.jsonpService.getDaumGeolocationData(property).subscribe(
            data => {
                console.log(data);

                console.log(data.channel.item.length);
                if (data.channel.item.length > 0) {
                    console.log(data.channel.item[0].lat);
                    console.log(data.channel.item[0].lng);

                    property.lat = data.channel.item[0].lat;
                    property.lng = data.channel.item[0].lng;
                }

                this.loading.dismiss();
                this.view.dismiss(property);

            },
            err => {
                this.loading.dismiss();
                console.log(err);

            },
            () => {
                console.log('SAVE MESSAGE CALL END');

            }

        );
        */


    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

    showError(text) {
        setTimeout(() => {
            this.loading.dismiss();
        });

        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }
}
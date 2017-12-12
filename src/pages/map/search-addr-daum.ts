import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'; 

//StorageServices


declare var daum;

@Component({
    selector: 'page-search-addr-daum',
    templateUrl: 'search-addr-daum.html'
})

export class SearchAddrDaumPage   {

    @ViewChild('map') mapElement: ElementRef;
    map: any;

    address: string = '';
    alias: string = '';
    lat: string = '';
    lng: string = '';
    phondCode: string = '';
    phoneNumber: string = '';

    TITLE: string = '';

    daumMap: any;


    searchQuery: string = '';

    geolocations = { latitude: 0, longitude: 0 };
    from: string = '';
    to: string = '';

    items: Array<{ title: string, value: string }>;

    constructor(
        private navCtrl: NavController
        , private view: ViewController
        , private geolocation: Geolocation
        , private navParams: NavParams, public modalCtrl: ModalController, private alertCtrl: AlertController) {

 
        this.address = navParams.get('ADDRESS');
        this.alias = navParams.get('ALIAS');
        this.lat = navParams.get('LAT');
        this.lng = navParams.get('LNG');
       // this.phondCode = navParams.get('PHONE_CDOE');
        this.phoneNumber = navParams.get('PHONE_NUMBER');

        this.TITLE = this.alias + '-' + this.phoneNumber;


    }

    //on load services
    ionViewDidLoad() {
        this.loadMap();
    }


    loadMap() {
        console.log(this.lat);
        console.log(this.lng);


        //this.daumMap = document.getElementById('daum');
        let mapOption = {
            center: new daum.maps.LatLng(this.lat, this.lng), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

       // this.map = new daum.maps.Map(this.daumMap, mapOption);
        this.map = new daum.maps.Map(this.mapElement.nativeElement, mapOption);

        //this.map = new daum.maps.Map(this.mapElement.nativeElement, mapOption);


 
        // 마커가 표시될 위치입니다 
        let markerPosition = new daum.maps.LatLng(this.lat, this.lng); //bistel

        let marker = new daum.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(this.map);
   

   

        let iwContent = '<div style="padding:5px;">' + this.alias + '<br />' + this.address + '</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
   
         //인포윈도우를 생성합니다
        let infowindow = new daum.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable
        });

        /*
        //이렇게는 되지 않음 아래 처름 연결해야 함
        daum.maps.event.addListener(marker, 'click', function () {
            // 마커 위에 인포윈도우를 표시합니다
            infowindow.open(this.map, marker);
        });
        */
   
        daum.maps.event.addListener(marker, 'click', () => {
            // 마커 위에 인포윈도우를 표시합니다
            infowindow.open(this.map, marker);
        });
     
    }

    dismiss() {
        this.view.dismiss();
    }


 
}


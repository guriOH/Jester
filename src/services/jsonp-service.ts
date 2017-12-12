import { Jsonp, Headers, RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/';
//import 'rxjs/add/observable/throw';

import { Injectable } from '@angular/core';
import { EnvironmentProvider } from '../providers/environment-provider';
import 'rxjs/add/operator/map';

@Injectable()
export class JsonpService {

   // private url: any = "https://jobs.github.com/positions.json?description=python&location=new+york&callback=JSONP_CALLBACK";
   // private url: any = "http://localhost:6533/SickApp/Get?id=0&obj=[{%22RAWID%22:%22jongnam%22}]&callback=JSONP_CALLBACK";
   // private url: any = "http://localhost:6533/SickApp/Get?id=0&obj=[{%22RAWID%22:%22jongnam%22}]";

    private url: any = '';// "http://localhost:6533/SickApp/Get?id=0&obj=[{%22RAWID%22:%22jongnam%22}]";

    private callback = '&callback=JSONP_CALLBACK';
    private data: any;
    /*
    static get parameters() {
        return [[Http]];
    }
    */
    constructor(private jsonp: Jsonp, private environmentProvider: EnvironmentProvider) {

        this.url = this.environmentProvider.getJsonP();



    }

    //SQL INSERT/UPDATE/DELETE

    sqlInsert(property) {
        var data = JSON.stringify(property);
      
        var path = 'SetDatabase/Get?id=1&obj=' + data;
        var callUrl = this.url + path + this.callback;

        console.log(callUrl);
        var response = this.jsonp.get(callUrl).map(res => res.json());
        return response;

    }

    sqlInsertList(property) {
        var data = JSON.stringify(property);

        var path = 'SetDatabase/Get?id=6&obj=' + data;
        var callUrl = this.url + path + this.callback;

        console.log(callUrl);
        var response = this.jsonp.get(callUrl).map(res => res.json());
        return response;

    }

    //SQL INSERT/UPDATE/DELETE

    sqlInsertRawId(property) {
        var data = JSON.stringify(property);

        var path = 'SetDatabase/Get?id=4&obj=' + data;
        var callUrl = this.url + path + this.callback;

        console.log(callUrl);
        var response = this.jsonp.get(callUrl).map(res => res.json());
        return response;

    }

    //login
    getMemberLogin(property) {

        var data = JSON.stringify(property);
        var path = 'SickApp/Get?id=1001&obj=' + data;
        var callUrl = this.url + path + this.callback;
        var response = this.jsonp.get(callUrl).map(res => res.json());
        return response;

    }

    //login
    getRegisterLogin(property) {

        var data = JSON.stringify(property);
        var path = 'SickApp/Get?id=1000&obj=' + data;
        var callUrl = this.url + path + this.callback;
        var response = this.jsonp.get(callUrl).map(res => res.json());
        return response;

    }

    //default로 등록한 Address
    getDefaultAPI(id:string, property) {

        var data = JSON.stringify(property);
        var path = 'SickApp/Get?id='+id+'&obj=' + data;
        var callUrl = this.url + path + this.callback;

        console.log(callUrl);
        var response = this.jsonp.get(callUrl).map(res => res.json());
        return response;

    }




    //test
    searchHospitals(geolocation) {
        console.log(geolocation.lat);
        console.log(geolocation.lng);
        let baseUrl = this.environmentProvider.getWebControllInfo();
        console.log("Web Controll Info :" + baseUrl);

        var response = this.jsonp.get(this.url).map(res => res.json());
        return response;
    }

    //getHospitalCategoryList
    getHospitalCategoryList() {
 
        var path = 'SickApp/Get?id=0&obj=[{%22RAWID%22:%22jongnam%22}]';
        var callUrl = this.url + path + this.callback;
        var response = this.jsonp.get(callUrl).map(res => res.json());
        return response;
    }

    //insert
    setMessageCall(data) {

        //SAVE 호출하기
        var response = this.jsonp.get(this.url).map(res => res.json());
        return response;
        
    }

       //getSearchHospitalList
    getSearchHospitalList() {

        var baseUrl = this.environmentProvider.getWebControllInfo();
        console.log("Web Controll Info :" + baseUrl);
        var callUrl = baseUrl + '?id=ssss';
        var response = this.jsonp.get(this.url).map(res => res.json());
        return response;
    }

 

    //info-hospital
    getHospitalInfoData() {

        var baseUrl = this.environmentProvider.getWebControllInfo();
        console.log("Web Controll Info :" + baseUrl);
        var callUrl = baseUrl + '?id=ssss';
        var response = this.jsonp.get(this.url).map(res => res.json());
        return response;
    }

    //info-hospital > comment data list
    getHospitalInfoCommentData() {

        var baseUrl = this.environmentProvider.getWebControllInfo();
        console.log("Web Controll Info :" + baseUrl);
        var callUrl = baseUrl + '?id=ssss';
        var response = this.jsonp.get(this.url).map(res => res.json());
        return response;
    }

    //다음지로 좌표값 가져오기
    getDaumGeolocationData(property) {
      
        
        var data = property.address; 

        console.log(data);
        
        var path = 'https://apis.daum.net/local/geo/addr2coord?apikey=19a40b3b4b31307415704b0fcdfadaed&q=' + data +'&output=json';
        var callUrl = path + this.callback;

        console.log(callUrl);
       // callUrl = 'https://apis.daum.net/local/geo/addr2coord?apikey=ad363be7a20787102c42361ea82def86&q=&output=json&callback=JSONP_CALLBACK';
        var response = this.jsonp.get(callUrl).map(res => res.json());
        return response;
    }

    //가까운 병원 가져오기
    getHospitalDistanceCategoryList(property) {

        var data = JSON.stringify(property);
        var path = 'SickApp/Get?id=1004&obj=' + data;
        var callUrl = this.url + path + this.callback;
        var response = this.jsonp.get(callUrl).map(res => res.json());
        return response;


    }



    //commmon
    getCommonAPI(id: string, property) {

        var data = JSON.stringify(property);
        var path = 'CommonApp/Get?id=' + id + '&obj=' + data;
        var callUrl = this.url + path + this.callback;
        var response = this.jsonp.get(callUrl).map(res => res.json());
        return response;

    }
   
}

import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ModalController, NavParams, Events, AlertController, ActionSheetController  } from 'ionic-angular';

import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';
import { EnvironmentProvider } from '../../providers/environment-provider';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
    selector: 'page-purchase-list',
    templateUrl: 'purchase-list.html',
    providers: [JsonpService]
})
export class PurchaseListPage {
    
    categoryMenu: string = 'A';
    items: Array<any>;
    webServiceUrl: string;
    loading: Loading;
    isValid = true;
    constructor(public navCtrl: NavController, private jsonpService: JsonpService
      , private environmentProvider: EnvironmentProvider
    , private loadingCtrl: LoadingController) {
      this.items=[];
      this._initializeApp();
      
    }
  
    changeItemMenus(index: string) {
        this.categoryMenu = index;
        this._initializeApp();
    }

    public _initializeApp() {
        
                var data = [];
                
                this.webServiceUrl = this.environmentProvider.getWebServiceUrl();
                data.push({ 
                    MEMBER_RAWID:"10010012"
                }); 
               
                this.jsonpService.getDefaultAPI('7100', data).subscribe( 
                    
         
                     data => { 
                         if (data.length > 0) { 
                           console.log(data);
                           
                           for(var i=0; i<data.length ; i++){
                             this.items[i] = {
                               title: data[i].TITLE,
                               //content: 'Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.',
                               icon: data[i].CATEGORY_CD,
                               q_dtts : data[i].Q_DTTS.substring(0,10),
                               c_dtts : data[i].CREATE_DTTS.substring(0,10),
                               cost : data[i].COST,
                               sits : data[i].SEAT,
                               running : data[i].RUNNING,
                               category : data[i].CATEGORY_CD,
                               image: data[i].URL,
                               people : data[i].PEOPLE,
                               show : this.isValid,
                               time : {date: data[i].Q_DTTS.substring(0,10), time: data[i].HH+":"+data[i].MM}
                             }
                             
                             if(this.categoryMenu=='A'){
                                if(this.items[i].q_dtts.substring(8,10)>=this.items[i].c_dtts.substring(8,10)){
                                    this.items[i].show=true;
                                 }else{
                                    this.items[i].show=false;
                                 }
                             }else{
                                if(this.items[i].q_dtts.substring(8,10)<this.items[i].c_dtts.substring(8,10)){
                                    this.items[i].show=true;
                                 }else{
                                    this.items[i].show=false;
                                 }
                             }
                            
                           }
                         } else { 
                             
                         } 
                     }, 
                     err => { 
                        
             
                     }, 
                     () => { 
                         
                     } 
                 ); //json end 
            }
            public selectIcon(icon){
                if(icon=="연극"){
                  return 'megaphone'
                }else if(icon=="공연"){
                  return 'musical-notes'
                }else{
              
                }
              }
}

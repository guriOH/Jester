import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController} from 'ionic-angular';


import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';

import { EnvironmentProvider } from '../../providers/environment-provider';


import { BookTicketPage } from '../book/book-ticket';
import swal from 'sweetalert2'; 

@Component({
    selector: 'page-book-food',
  templateUrl: 'book-food.html',
  providers: [JsonpService]
})
export class BookFoodPage {


    items: Array<any>;

    webServiceUrl: string;
    OPEN_DTTS: string;
    FOOD_RAWID: string;

    KEY_RAWID : number;


    constructor(public navCtrl: NavController
        , private view: ViewController
        , private navParams: NavParams
        , private jsonpService: JsonpService
        , public modalCtrl: ModalController
        , private environmentProvider: EnvironmentProvider
        , private globalVars: GlobalVars
        ) {


        this.OPEN_DTTS = this.navParams.get('OPEN_DTTS');
        this.KEY_RAWID = this.navParams.get('KEY_RAWID');

        console.log(this.OPEN_DTTS);

        this.getFoodListInfo();


    }



    getFoodListInfo() {


        this.webServiceUrl = this.environmentProvider.getWebServiceUrl();

        var data = [];

        data.push({
            CUSTOMER_RAWID: 1000001
        });


   
        this.jsonpService.getDefaultAPI('8004', data).subscribe(
            data => {

                console.log(data);
                if (data != null) {
                    this.items = data;

                } else {
                   // this.showError('내용이 없습니다.');
                }
            },
            err => {
              //  this.showError('내용이 없습니다');

            },
            () => {
              //  this.loading.dismiss();
            }
        ); //json end

    }


    confirmPay(param) {

        this.FOOD_RAWID = param;
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



        var data = [];

        data.push({
            TABLE_NAME: 'ART_FOODBOOK_PRO',
            FOOD_RAWID: this.FOOD_RAWID,
            OPEN_DTTS: this.OPEN_DTTS,
            CUSTOMER_RAWID: customer_rawid_,
            KEY_RAWID  : this.KEY_RAWID 

        });


        //insert
        this.jsonpService.sqlInsertRawId(data).subscribe(
            data => {


                if (data != null) {
                    this.completed();
                }

   
            },
            err => {


            },
            () => {
      
            }
        );


    }

    completed() {

        let itemData = {
            OPEN_DTTS: this.OPEN_DTTS,
            KEY_RAWID: this.KEY_RAWID 
        }

        this.navCtrl.push(BookTicketPage, itemData);

        this.view.dismiss();

    }

}

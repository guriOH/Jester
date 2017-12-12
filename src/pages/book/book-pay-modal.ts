import { Component } from '@angular/core';

import { NavController, ViewController, NavParams, Loading, LoadingController, ModalController, AlertController } from 'ionic-angular';


@Component({
    selector: 'page-book-pay-modal',
    templateUrl: 'book-pay-modal.html'
})
export class BookPayModal{


    constructor(public navCtrl: NavController
        , private navParams: NavParams
        , private view: ViewController) {

        

        //this.RAWID = navParams.get('RAWID');
        //this.QUEUE_NO = navParams.get('QUEUE_NO');
        //this.QUEUE_COMMENT = navParams.get('QUEUE_COMMENT');

        //this.myForm = formBuilder.group({
        //    QUEUE_NO: [this.QUEUE_NO],
        //    QUEUE_COMMENT: [this.QUEUE_COMMENT]
        //});

        //if (navParams.get('MEMBER_RAWID') == null) {
        //    console.log("NULL");
        //} else {
        //    //데이타 가져와서 보여주기
        //    this.MEMBER_RAWID = navParams.get('MEMBER_RAWID');
        //    this.getServiceQueueList();
        //}

        //this._initializeApp();
  
    }

    public _initializeApp() {

   
  

    }
    close(filter : string) {
        this.view.dismiss(filter);
    }


    dismiss() {
        this.view.dismiss();
    }
   
}

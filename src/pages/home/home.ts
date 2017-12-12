import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2'
import { FirebaseMessageService } from '../../firebase/firebasemessage-service';


import swal from 'sweetalert2'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //providers: [FirebaseMessageService, swal] 
    providers: [FirebaseMessageService] 
})




export class HomePage {

    fireMessagelist: FirebaseListObservable<any>;

    fireItems: FirebaseListObservable<any>;

    rawid: number = 1;


    itemList: Array<any>;
    constructor(public navCtrl: NavController
        , public af: AngularFire
    ) {


        af.database.list('/messages', {
            query: {
                //orderByChild: 'RAWID',
                limitToLast: 1
            }
        }).subscribe(items => {

            this.itemList = items;
            console.log(this.itemList);
        });

     

       //af.database.list('/messages').subscribe(items => {
       //     console.log(items);
       // });


    }

    test() {

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(function() {
            swal(
                'Deleted!',
                'Your imaginary file has been deleted.',
                'success'
            );
        }, function(dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                );
            }
        });


        var url = '/messages';
       

        this.fireMessagelist = this.af.database.list(url, {
            query: {
                orderByChild: "RAWID",
                limitToLast: 1
            }
        });


      //  console.log(this.fireMessagelist );

        this.rawid = this.rawid + 999900000;
        this.fireMessagelist.push(
            {
                    RAWID: this.rawid,
                    VALUE: 'aaaaa'

            }
        );
    }



}

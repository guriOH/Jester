import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, ViewController, Events } from 'ionic-angular';
//import { AuthService } from '../../services/auth-service';
//import { RegisterPage } from '../register/register';
//import { HomePage } from '../home/home';
//import { DataService } from '../../providers/data-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { Http, Jsonp } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Device } from '@ionic-native/device'; 
import { Geolocation } from '@ionic-native/geolocation'; 
import { EmailValidator } from '../../util/email';
import { JsonpService } from '../../services/jsonp-service';

//global
import { GlobalVars } from '../../providers/global';

//page
import { Default } from '../default/default';
import { MemberSignPage } from '../account/member-sign';
import swal from 'sweetalert2'; 

//import { StorageServices } from '../../providers/storage-service';

@Component({
    selector: 'page-member-login',
    templateUrl: 'member-login.html',
    providers: [JsonpService]
})
export class MemberLoginPage {

    myForm: FormGroup;
    loading: Loading;
    registerCredentials = { email: '', password: '' };

    submitAttempt: boolean = false;

    //
    public data: any;
    private errorMessage: any;
    public people: any;
    constructor(private navCtrl: NavController
        , public formBuilder: FormBuilder
        , public events: Events
        , private view: ViewController
        , private alertCtrl: AlertController
        , private loadingCtrl: LoadingController
        , private jsonpService: JsonpService
        , private globalVars: GlobalVars
    ) {


        var uuid = '';//Device.uuid.toString().trim();
        uuid = '01063185544';

        this.myForm = formBuilder.group({
            email: ['', Validators.compose([Validators.maxLength(50), EmailValidator.isValidMailFormat, Validators.required])],
            password: ['', Validators.compose([Validators.minLength(4), Validators.required])]

        });

        this._createEvent();


    }//constructor



    _createEvent() {

        this.events.subscribe('event:register', () => {
            console.log('event');

            // user and time are the same arguments passed in `events.publish(user, time)`
            this.navCtrl.setRoot(Default);
        });
    }




    public login() {

        this.showLoading();

        if (this.myForm.valid) { // input data ok
            console.log("ok");

            this.registerCredentials.email = this.myForm.value["email"].toString().trim();
            this.registerCredentials.password = this.myForm.value["password"].toString().trim();
            var data = [];

            data.push({
                email: this.myForm.value["email"].toString().trim(),
                pwd: this.myForm.value["password"].toString().trim()
            });
            this.jsonpService.getRegisterLogin(data).subscribe(
                data => {
                    this.loading.dismiss();
                    if (data.length > 0) {
                        this.globalVars.setMember(data[0].ALIAS, this.myForm.value["email"].toString().trim(), data[0].RAWID, data[0].IMG_ALIAS);
                        this.events.publish('event:authority');
                        
                        this.dismiss();
                    } else {
                        this.showError('아이디/패스워드가 틀');
                    }

                },
                err => {
                    this.loading.dismiss();
                    this.showError('아이디/패스워드가 틀');
                 
                },
                () => {

                }
            );//jsonpService
        } else {
            this.loading.dismiss();
        }// if (this.myForm.valid)

    }

    loginAuto() {

        this.showLoading();


        var data = [];

        data.push({
            email: 'b@b.co.kr',
            pwd: '1111'
        });
        this.jsonpService.getRegisterLogin(data).subscribe(
            data => {
                this.loading.dismiss();
                if (data.length > 0) {
                    this.globalVars.setMember(data[0].ALIAS, 'b@b.co.kr', data[0].RAWID, data[0].IMG_ALIAS);
                    this.events.publish('event:authority');

                    this.dismiss();
                } else {
                    this.showError('아이디/패스워드가 틀');
                }

            },
            err => {
                this.loading.dismiss();
                this.showError('아이디/패스워드가 틀');

            },
            () => {

            }
        );//jsonpService



        
    }

    register() {

        this.navCtrl.push(MemberSignPage);
    }
    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: this.globalVars.loading
        });
        this.loading.present();
    }

    showError(text) {
        setTimeout(() => {
            this.loading.dismiss();
        });

        let alert = this.alertCtrl.create({
            title: '로그인 실패',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    dismiss() {

        let self = this;
        swal({
            title: 'Do you want',
            text: 'Ticket',
            type: 'success',
            confirmButtonText: 'Yes'
        }).then(function () {


            self.redirent();

        }, function (dismiss) {

            // parent.this.ISCONFIRM  = false;

        });

    }

    redirent() {

        //event:authority
        this.events.publish('event:authority');
          this.navCtrl.setRoot(Default);
        
    }
}


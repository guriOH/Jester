import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, Events } from 'ionic-angular';
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
import { NumberValidator } from '../../util/number-validator';
import { JsonpService } from '../../services/jsonp-service';

import { GlobalVars } from '../../providers/global';

import swal from 'sweetalert2'; 

//import { StorageServices } from '../../providers/storage-service';

@Component({
    selector: 'page-member-sign',
    templateUrl: 'member-sign.html',
    providers: [JsonpService]
})
export class MemberSignPage {

    myForm: FormGroup;
    loading: Loading;
    geolocations = { lat: 0, lng: 0 };
    registerCredentials = { email: '', password: '' };

    submitAttempt: boolean = false;

    uuid: string = '';

    //
    public data: any;
    private errorMessage: any;
    public people: any;
    constructor(private navCtrl: NavController
        , private events: Events
        , private formBuilder: FormBuilder
        , private alertCtrl: AlertController
        , private loadingCtrl: LoadingController
        , private jsonpService: JsonpService
        , private globalVars: GlobalVars
        , private device: Device,
        private geolocation: Geolocation
    ) {


        //시간이 걸려서 이곳에서 loadMap을 불러야 함


        this.geolocation.getCurrentPosition().then((pos) => {
            console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
            this.geolocations.lat = pos.coords.latitude;
            this.geolocations.lng = pos.coords.longitude;
        }).catch((error) => {
            console.log('Error getting location', error);
            });



  
        if (this.device.uuid != null) {

            this.uuid = this.device.uuid;

            if (this.uuid.indexOf('-') >= 0) {
                this.uuid = this.uuid.replace(/-/gi, "");
            }

            if (this.uuid.indexOf('.') >= 0) {
                this.uuid = this.uuid.replace(/\./gi, "");
            }

        } else {
            this.uuid = '010';
        }

   
        this.myForm = formBuilder.group({
            name: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.maxLength(50), EmailValidator.isValidMailFormat, Validators.required])],
            password_1: ['', Validators.compose([Validators.minLength(4), Validators.required])],
            password_2: ['', Validators.compose([Validators.required])],
            phone: [this.uuid, Validators.compose([NumberValidator.isValidNumbrFormat, Validators.required])]


        }, { 'validator': this.isMatching });

        //NumberValidator.isValidNumbrFormat
    }



    isMatching(group: FormGroup) {

        console.log("password check");
        console.log(group);
        var firstPassword = group.controls['password_1'].value;
        var secondPassword = group.controls['password_2'].value;

        if ((firstPassword && secondPassword) && (firstPassword != secondPassword)) {
            group.controls['password_2'].setErrors({ "pw_mismatch": true });
            return { "pw_mismatch": true };
        } else {

            console.log("match");
            return null;
        }
    }


    public createAccount() {
        this.submitAttempt = false;

        if (!this.myForm.valid) {
            this.submitAttempt = true;
            return;
        }


        this.showLoading();
        let phone = this.myForm.value["phone"].toString().trim();


        if (phone.indexOf('-') >= 0) {
            phone= this.uuid.replace(/-/gi, "");
        }

        if (phone.indexOf('.') >= 0) {
            phone = this.uuid.replace(/\./gi, "");
        }

        //let phoneCode = '';
        //let phoneNumber = '';

        //if (phone.length > 3) {
        //    phoneCode = phone.substring(0, 3);
        //    phoneNumber = phone.substring(3, phone.length - 1);

        //    console.log(phoneCode);
        //    console.log(phoneNumber);
        //}


        var data = [];

        data.push({
            TABLE_NAME: 'REGISTER_MST_APP',
            MEMBER_ID: this.myForm.value["name"].toString().trim(),
            ALIAS: this.myForm.value["name"].toString().trim(),
            MEMBER_EMAIL: this.myForm.value["email"].toString().trim(),
            PASSWORD: this.myForm.value["password_1"].toString().trim(),
            PHONE_CODE: phone
        });


        this.jsonpService.sqlInsertRawId(data).subscribe(
            data => {

                console.log(data);

                if (data != '') { //data is rawid

                    this.globalVars.setMember(this.myForm.value["name"].toString().trim()
                        , this.myForm.value["email"].toString().trim()
                        , data
                        , '');

                    this.dismiss();


                    //

                }

               

            },
            err => {
                //이미 이메일이 있는 경우 이쪽으로 들어온다
                this.loading.dismiss();
                this.showError('이미 이메일이 가입되어 있습니다');
            },
            () => {
                this.loading.dismiss();
                //  this.loading.dismiss();
            }
        );

    }

    private createAddress(memberRawid) {

        var data = [];

        data.push({
            TABLE_NAME: 'ADDRESS_MST_APP',
            MEMBER_RAWID: memberRawid,
            ADDRESS: '회원가입을 축하드립니다',
            LAT: this.geolocations.lat,
            LNG: this.geolocations.lng,
            USE_YN: 'Y'
        });

        this.showLoading();

        this.jsonpService.sqlInsertRawId(data).subscribe(
            data => {

                if (data != '') { //data is rawid

                    this.globalVars.setAddress('회원가입을 축하드립니다', this.geolocations.lat, this.geolocations.lng);

                }

                this.loading.dismiss();
                this.dismiss();


            },
            err => {
                //이미 이메일이 있는 경우 이쪽으로 들어온다
                this.loading.dismiss();
                this.showError('이미 이메일이 가입되어 있습니다');
            },
            () => {

            }
        );//jsondData
    }

    dismiss() {

        let self = this;
        swal({
            title: 'Do you want',
            text: 'Ticket',
            type: 'success',
            confirmButtonText: 'Yes'
        }).then(function () {

            console.log('dddd');
            self.redirent();

        }, function (dismiss) {

            // parent.this.ISCONFIRM  = false;

            });


       


    }

    redirent() {

        this.events.publish('event:register');
        this.events.publish('event:authority');
        this.navCtrl.popToRoot();
        
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
            title: '회원가입 에러',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }
}


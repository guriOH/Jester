import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {

    vars: Array<{ alias: string, email: string, rawid: string , img : string}>;
    AddressInfor: Array<{ address: string, lat: any, lng: any }>;

    loading: string = 'Loading...';

  	constructor() {

  	}//constructor

    setMember(alias: string, email: string, rawid: string, img : string){
        this.vars = [];
        this.vars.push({
                alias: alias,
                email: email,
                rawid: rawid,
                img: img
              });
        }

    setAddress(address: string, lat: any, lng: any) {

        console.log('4444');
        this.AddressInfor = [];
        this.AddressInfor.push({
            address: address,
            lat: lat,
            lng: lng
        });
    }

    isAuthorityCheck(): boolean {
        if (this.vars == null) {
            return false;
        }

        if (this.vars.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    isAddressCheck():boolean{
        if (this.vars == null) {
            console.log('1');
            return false;
        }

        if (this.vars.length > 0) {
            console.log('2');
            if (this.AddressInfor == null) {
                console.log('3');
                return false;
            } else {

                if (this.vars.length > 0) {
                    console.log('4');
                    return true;
                } else {
                    console.log('5');
                    return false;
                }
            }// if (this.globalVars.AddressInfor.length > 0)
        } else {//if (this.globalVars.vars.length > 0)
            console.log('6');
            return false;
        }
    }

    getToday(): string {
        var someDate = new Date();

        var dd = someDate.getDate();
        var mm = someDate.getMonth() + 1; //January is 0!
        var yyyy = someDate.getFullYear();

        var strMM: string = mm.toString();
        var strDD: string = dd.toString();

        if (mm < 10) { strMM = '0' + mm.toString(); }
        if (dd < 10) { strDD = '0' + dd.toString(); }

        var today = yyyy + '-' + strMM + '-' + strDD;
        return today;

    }

  }
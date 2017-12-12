import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Generated class for the YoutubePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'artlistTickerFilter',
})
export class ArtTicketListPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
    constructor() {

    }
    transform(value: any, filter: number) {


        return value.filter(
            task => task.KEY_RAWID === filter);



        //var aaaaa = value.filter(
        //    task => task.USER_RAWID === filter);
        //console.log('PPPPP');
        //console.log(aaaaa);
        //return value.filter(
        //    task => task.USER_RAWID === filter);



        //var uniqueNames = [];
        //var itemData = [];
        //for (var i = 0; i < value.length; i++) {
        //    if (uniqueNames.indexOf(value[i].USER_RAWID) === -1) {
        //        uniqueNames.push(value[i].USER_RAWID);
        //        itemData.push(value[i]);
        //    }
        //}

        //console.log(itemData.length);
        //return itemData;


    }

 
}

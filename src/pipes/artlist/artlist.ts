import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the YoutubePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'artlistFilter',
})
export class ArtListPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
    constructor() {

    }
    transform(value: any, filter : number) {


        return value.filter(
                task => task.USER_RAWID === filter);


            //if (filter == 1) {

            //    return value.filter(
            //        task => task.USER_RAWID === 10000001);
            //} else {
    
            //return value.filter(
            //                task => task.USER_RAWID ===10000002);
            //}




    }
}

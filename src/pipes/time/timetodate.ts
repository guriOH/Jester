import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Generated class for the YoutubePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'timetoDataConvert',
})
export class TimetoDatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
    constructor() {

    }
    transform(value: string) {


        return value.substring(5, 10);;



    }
}

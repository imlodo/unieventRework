import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, format: string = 'DD/MM/YYYY HH:mm:ss'): string {
    if (!value) {
      return '';
    }
    return moment(value).format(format);
  }
}
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
    // Specifica il formato dell'input
    const parsedDate = moment(value, 'DD/MM/YYYY HH:mm:ss');
    if (!parsedDate.isValid()) {
      return 'Data non valida';
    }
    return parsedDate.format(format);
  }
}

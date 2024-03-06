import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ApproximateNumber'
})
export class ApproximateNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 10000) {
      return value.toString();
    } else if (value < 1000000) {
      return (value / 1000).toFixed(1) + 'k';
    } else {
      return (value / 1000000).toFixed(1) + 'M';
    }
  }
}

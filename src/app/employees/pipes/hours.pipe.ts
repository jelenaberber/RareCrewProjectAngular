import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours'
})
export class HoursPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) {
      return 'Unknown';
    }
    return `${value} hrs`;
  }
}

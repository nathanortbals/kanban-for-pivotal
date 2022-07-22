import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estimate',
})
export class EstimatePipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value === undefined) {
      return 'Unestimated';
    }

    if (value === 1) {
      return `${value} point`;
    }

    return `${value} points`;
  }
}

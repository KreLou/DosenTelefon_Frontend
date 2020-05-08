import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerDisplay'
})
export class TimerDisplayPipe implements PipeTransform {

  transform(value: number): any {
    const minutes = this.getWithLeadingZero(Math.floor(value / 60));
    const seconds = this.getWithLeadingZero(value % 60);

    return `${minutes}:${seconds}`;
  }

  getWithLeadingZero(value: number, size = 2) {
    let s = value + '';
    while(s.length < size) s = '0' + s;
    return s;
  }

}

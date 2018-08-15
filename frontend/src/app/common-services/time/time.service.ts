import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {

  constructor() { }

  public centiToDisplay(centiTime: number): string {
    if (centiTime === -1) {
      return 'DNF';
    }
    if (centiTime === -2) {
      return 'DNS';
    }
    let cs = centiTime % 100;
    let s = Math.floor(centiTime / 100) % 60;
    let m = Math.floor(centiTime / 6000);
    if (m > 0) {
      return `${m}:${this.prefix(s)}.${this.prefix(cs)}`;
    }
    return `${s}.${this.prefix(cs)}`;
  }

  public displayToCenti(displayTime: string): number {
    if (displayTime === 'DNF') {
      return -1;
    }
    if (displayTime === 'DNS') {
      return -2;
    }
    let m = '0';
    let s = '0';
    let cs = '0';
    let r: string = null;
    if (displayTime.indexOf(':') > -1) {
      [m, r] = displayTime.split(':');
    }
    [s, cs] = (r || displayTime).split('.');
    return 6000 * parseInt(m, 10) + 100 * parseInt(s, 10) + parseInt(cs, 10);
  }

  private prefix(n: number): string {
    if (n < 10) {
      return `0${n}`;
    }
    return `${n}`;
  }
}

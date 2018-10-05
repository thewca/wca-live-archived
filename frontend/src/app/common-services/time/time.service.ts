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

  public inputToDisplay(input: string): string {
    if (input.length === 0) {
      return '';
    }
    if (input.indexOf('*') > -1 || input.indexOf('s') > -1) {
      return 'DNS';
    }
    if (input.indexOf('/') > -1 || input.indexOf('f') > -1) {
      return 'DNF';
    }
    let length = input.length;
    input = ('000000' + input).substr(-6);
    let s = parseInt(input.substr(-4,2) || '0', 10);
    let ms = parseInt(input.substr(-2), 10);
    if (length > 4) {
      return `${input.substr(0, input.length - 4)}:${this.prefix(s)}.${this.prefix(ms)}`;
    }
    return `${this.prefix(s)}.${this.prefix(ms)}`;
  }

  private prefix(n: number): string {
    if (n < 10) {
      return `0${n}`;
    }
    return `${n}`;
  }
}

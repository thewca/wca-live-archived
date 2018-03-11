import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {

  private static readonly R9f2Limit = 60000;

  constructor() { }

  public static CentiToDisplay(centi: number): string {
    if (centi >= TimeService.R9f2Limit) {
      centi = Math.round(centi / 100) * 100;
    }
    let cs = TimeService.ZeroFill(centi % 100);
    let s = Math.floor(centi / 100);
    let sec = TimeService.ZeroFill(s % 60);
    let m = TimeService.ZeroFill(Math.floor(s / 60));
    return `${m}:${sec}.${cs}`;
  }

  public static DisplayToCenti(display: string): number {
    let p = display.split(':');
    let m = parseInt(p[0], 10);
    p = p[1].split('.');
    let s = parseInt(p[0], 10), cs = parseInt(p[1], 10);
    return cs + s * 100 + m * 6000;
  }

  public static InputToDisplay(input: string): string {
    let cs = ('00' + input).substr(-2, 2);
    let s = ('0000' + input).substr(-4, 2);
    let m = TimeService.ZeroFill(input.substr(0, input.length - 4));
    if (!m) m = '00';
    if (m.length < 2) m = '0' + m;
    return TimeService.CentiToDisplay(TimeService.DisplayToCenti(`${m}:${s}.${cs}`));
  }

  public static InputToCenti(input: string): number {
    return TimeService.DisplayToCenti(TimeService.InputToDisplay(input));
  }

  private static ZeroFill(i: string | number): string {
    if (parseInt(`${i}`, 10) < 10) i = '0' + i;
    return `${i}`;
  }

}

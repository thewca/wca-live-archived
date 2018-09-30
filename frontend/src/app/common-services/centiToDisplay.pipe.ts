import { Pipe, PipeTransform } from "@angular/core";
import { TimeService } from "./time/time.service";

@Pipe({
  name: 'centiToDisplay',
  pure: true
})
export class CentiToDisplayPipe implements PipeTransform {
  constructor(private readonly _timeService: TimeService) {}

  transform(value: number): string {
    return this._timeService.centiToDisplay(value);
  }
}
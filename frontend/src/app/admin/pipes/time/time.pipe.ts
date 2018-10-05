import { Pipe, PipeTransform } from "@angular/core";
import { TimeService } from "../../../common-services/time/time.service";

@Pipe({
  name: 'time',
  pure: true
})
export class TimePipe implements PipeTransform {

  public constructor(private readonly _timeService: TimeService) {}

  transform(value: any) {
    return this._timeService.inputToDisplay(value);
  }
}
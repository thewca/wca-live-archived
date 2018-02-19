import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventName'
})
export class EventNamePipe implements PipeTransform {

  public transform(value: any): any {
    switch (value) {
      case '222': return '2x2x2 Cube';
      case '333': return '3x3x3 Cube';
      case '444': return '4x4x4 Cube';
      case '555': return '5x5x5 Cube';
      case '666': return '6x6x6 Cube';
      case '777': return '7x7x7 Cube';
      case '333bf': return '3x3x3 Blindfolded';
      case '444bf': return '4x4x4 Blindfolded';
      case '555bf': return '5x5x5 Blindfolded';
      case '333mb': return '3x3x3 Multi-Blind';
      case '333oh': return '3x3x3 One-Handed';
      case '333ft': return '3x3x3 With Feet';
      case '333fm': return '3x3x3 Fewest Moves';
      case 'pyram': return 'Pyraminx';
      case 'skewb': return 'Skewb';
      case 'minx': return 'Megaminx';
      case 'sq1': return 'Square-1';
      case 'clock': return 'Clock';
      default: return 'Unknown event';
    }
  }

}

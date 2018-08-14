import { EventId } from "./eventId.class";
import { Round } from "./round.model";
import { EventDto } from "./dto/event.dto";

export class Event {
  public id: EventId;
  public rounds: Round[];

  public static fromDto(dto: EventDto): Event {
    let m = new Event();
    m.id = new EventId(dto.id);
    m.rounds = dto.rounds.map(r => Round.fromDto(r));
    return m;
  }
}
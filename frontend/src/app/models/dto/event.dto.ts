import { ValidEventId } from "../eventId.class";
import { RoundDto } from "./round.dto";

export class EventDto {
  public id: ValidEventId;
  public rounds: RoundDto[];
}
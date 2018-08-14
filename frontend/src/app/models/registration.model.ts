import { EventId } from "./eventId.class";
import { RegistrationDto } from "./dto/registration.dto";

export class Registration {
  public eventIds: EventId[];
  public status: string;

  public static fromDto(dto: RegistrationDto): Registration {
    let m = new Registration();
    m.eventIds = dto.eventIds.map(id => new EventId(id));
    m.status = dto.status;
    return m;
  }
}
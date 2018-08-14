import { ValidEventId } from "../eventId.class";

export class RegistrationDto {
  eventIds: ValidEventId[];
  status: string;
}
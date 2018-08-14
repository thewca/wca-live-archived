import { RegistrationDto } from "./registration.dto";

export class PersonDto {
  countryIso2: string;
  delegatesCompetition: boolean;
  name: string;
  organizesCompetition: boolean;
  registration: RegistrationDto;
  wcaId: string;
}
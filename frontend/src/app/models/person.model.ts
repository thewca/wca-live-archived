import { Registration } from "./registration.model";
import { PersonDto } from "./dto/person.dto";

export class Person {
  public countryIso2: string;
  public delegatesCompetition: boolean;
  public name: string;
  public organizesCompetition: boolean;
  public registration: Registration;
  public wcaId: string;

  public static fromDto(dto: PersonDto): Person {
    let m = new Person();
    m.countryIso2 = dto.countryIso2;
    m.delegatesCompetition = dto.delegatesCompetition;
    m.name = dto.name;
    m.organizesCompetition = dto.organizesCompetition;
    m.registration = Registration.fromDto(dto.registration);
    m.wcaId = dto.wcaId;
    return m;
  }
}
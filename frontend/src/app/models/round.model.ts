import { RoundDto } from "./dto/round.dto";

export class Round {
  public format: string;
  public id: string;
  public results: any[];
  public timeLimit: { cumulativeRoundIds: string[], centiseconds: number };
  public opened: boolean;

  public static fromDto(dto: RoundDto): Round {
    let m = new Round();
    m.format = dto.format;
    m.id = dto.id;
    m.results = dto.results;
    m.timeLimit = dto.timeLimit;
    m.opened = dto.opened;
    return m;
  }
}
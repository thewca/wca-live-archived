import { RoundDto } from "./dto/round.dto";

export class Round {
  public advancementCondition?: { type: string, level: any };
  public cutoff?: { numberOfAttempts: number, attemptResult: number };
  public format: string;
  public id: string;
  public opened: boolean;
  public results?: any[];
  public timeLimit: { cumulativeRoundIds: string[], centiseconds: number };

  public static fromDto(dto: RoundDto): Round {
    let m = new Round();
    m.advancementCondition = dto.advancementCondition;
    m.cutoff = dto.cutoff;
    m.format = dto.format;
    m.id = dto.id;
    m.opened = dto.opened;
    m.results = dto.results;
    m.timeLimit = dto.timeLimit;
    return m;
  }
}
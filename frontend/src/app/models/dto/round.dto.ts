export class RoundDto {
  public advancementCondition?: { type: string, level: any };
  public cutoff?: { numberOfAttempts: number, attemptResult: number };
  public format: string;
  public id: string;
  public opened: boolean;
  public results?: any[];
  public timeLimit: { cumulativeRoundIds: string[], centiseconds: number };
}
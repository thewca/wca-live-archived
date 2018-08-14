export class RoundDto {
  public format: string;
  public id: string;
  public results: any[];
  public timeLimit: { cumulativeRoundIds: string[], centiseconds: number };
}
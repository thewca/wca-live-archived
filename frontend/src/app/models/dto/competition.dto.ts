export class CompetitionDto {
  public id: string;
  public name: string;
  public schedule: { startDate: string, numberOfDays: number }
}

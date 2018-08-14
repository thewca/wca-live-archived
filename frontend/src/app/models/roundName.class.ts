export abstract class RoundName {
  private static 1 = ['Final'];
  private static 2 = ['First Round', 'Final'];
  private static 3 = ['First Round', 'Semi-Final', 'Final'];
  private static 4 = ['First Round', 'Second Round', 'Semi-Final', 'Final'];

  public static getRoundName(currentRound: number, totalRounds: number): string {
    if (currentRound > totalRounds) {
      return 'Unknown Round';
    }
    return RoundName[totalRounds][currentRound - 1];
  }
}
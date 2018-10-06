import { Injectable } from "@angular/core";

@Injectable()
export class AverageService {
  public Mo3(results: number[]): number {
    if (results.length !== 3) {
      return null;
    }

    for(var i = 0; i < results.length; i++) {
      let r = results[i];
      if (r < 0) {
        return -1;
      }
    }

    let mean = results.reduce((a, b)=> a + b, 0)/3;
    if (mean >= 10 * 60 * 100) {
      return Math.round(mean / 100) * 100;
    }
    return Math.round(mean);
  }

  public Ao5(results: number[]): number {
    if (results.length !== 5) {
      return null;
    }
    let numInvalid = 0;
    let best = Number.MAX_SAFE_INTEGER;
    let worst = 0;

    for (var i = 0; i < results.length; i++) {
      let r = results[i];
      if (r < 0) {
        numInvalid++;
        if (numInvalid > 1) {
          return -1;
        }
      } else {
        if (r < best) {
          best = r;
        }
        if (r > worst) {
          worst = r;
        }
      }
    };

    let calcWith: number[] = results.filter(r => r > 0);
    let bestIx = calcWith.indexOf(best);
    delete calcWith[bestIx];
    if (numInvalid === 0) {
      let worstIx = calcWith.lastIndexOf(worst);
      delete calcWith[worstIx];
    }

    let avg = (calcWith.reduce((a, b) => a + b, 0))/3;

    // 9f1 and 9f2 ( https://www.worldcubeassociation.org/regulations/#9f1 )
    if (avg >= 10*60*100) { // 10 minutes in centiseconds)
      avg = Math.round(avg / 100) * 100;
    } else {
      avg = Math.round(avg);
    }

    return avg;
  }
}
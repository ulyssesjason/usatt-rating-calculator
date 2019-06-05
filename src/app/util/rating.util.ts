import {Player} from '../model/player';
import {RATING_CHARTS} from '../constants/rating.rule';
import {GameResultType} from '../model/game.result.type';
import {CommonUtil} from './common.util';

export class RatingUtil {


  RATING_MAP: Map<number, number> = new Map<number, number>();

  constructor() {
    RATING_CHARTS.forEach(c => {
      for (let i = c.lower; i < c.upper + 1; i++) {
        this.RATING_MAP.set(i, c.expected);
        this.RATING_MAP.set(-i, c.upset);
      }
    });
  }

  private ratingExchange(target: number, opponent: number, isWin: boolean): number {
    const winExchange = this.RATING_MAP.get(target - opponent);
    const loseExchange = this.RATING_MAP.get(opponent - target);
    return isWin ? winExchange : -loseExchange;
  }

  calculateCurrentResults(player: Player) {
    let rating = player.adjustedRating;
    player.results.forEach(r => {
      const exchange = this.ratingExchange(player.adjustedRating, r.opponentRating, r.type === GameResultType.WIN);
      rating += exchange;
      r.rateDelta = exchange;
    });
    player.finalRating = rating;
  }


  updatePlayer(player: Player) {

    if (player.results === undefined || player.results === null || player.results.length === 0) {
      // no game
      player.adjustedRating = player.initialRating;
      player.finalRating = player.initialRating;

    } else if (player.initialRating === undefined || player.initialRating === null) {
      this.unratedPlayerFlow(player);
    } else {
      this.ratedPlayerFlow(player);
    }
  }

  private ratedPlayerFlow(player: Player) {
    if (player.adjustedRating === undefined || player.adjustedRating === null) {
      player.adjustedRating = player.initialRating;
    }

    this.calculateCurrentResults(player);
    if (player.finalRating - player.initialRating >= 75) {
      this.adjustFlow(player);
    }
  }

  private unratedPlayerFlow(player: Player) {
    this.adjustFlow(player);
  }

  private adjustFlow(player: Player) {
    const winResults = player.results.filter(r => r.type === GameResultType.WIN);
    const loseResults = player.results.filter(r => r.type === GameResultType.LOSE);

    if (winResults.length === player.results.length || loseResults.length === player.results.length) {
      player.adjustedRating = this.adjustedForAllWinOrLose(player);
    } else {
      player.adjustedRating = this.adjustForWinLose(player);
    }

    this.calculateCurrentResults(player);
  }

  private adjustedForAllWinOrLose(player: Player): number {
    const allLose = (player.results.length === player.results.filter(r => r.type === GameResultType.LOSE).length);
    const median = CommonUtil.median(player.results.map(r => r.opponentRating));

    if (allLose) {
      const worstLose = Math.min(...player.results.map(r => r.opponentRating));
      const loseAdjust = Math.min(worstLose, median);
      if (player.initialRating === undefined || player.initialRating === null) {
        return loseAdjust;
      } else {
        return player.initialRating;
      }
    } else {
      if (player.initialRating === undefined || player.initialRating === null) {
        return median;
      } else {
        return Math.max(player.initialRating, median);
      }

    }
  }


  private adjustForWinLose(player: Player) {
    const winResults = player.results.filter(r => r.type === GameResultType.WIN);
    const loseResults = player.results.filter(r => r.type === GameResultType.LOSE);

    const bestWin = Math.max(...winResults.map(r => r.opponentRating));
    const worstLose = Math.min(...loseResults.map(r => r.opponentRating));

    const average = Math.floor((bestWin + worstLose) / 2);

    if (player.initialRating === undefined || player.initialRating === null) {
      return average;
    } else {
      return Math.floor((bestWin + worstLose + player.initialRating) / 3);
    }
  }


}

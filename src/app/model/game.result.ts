import {GameResultType} from './game.result.type';

export class GameResult {
  type: GameResultType;
  opponentRating: number;
  rateDelta: number;
}

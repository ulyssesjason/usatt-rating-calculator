import {GameResult} from './game.result';

export class Player {
  results: GameResult[];
  name: string;
  initialRating: number;
  adjustedRating: number;
  finalRating: number;
}

import {Component, OnInit} from '@angular/core';
import {RatingUtil} from '../util/rating.util';
import {Player} from '../model/player';
import {GameResultType} from '../model/game.result.type';
import {GameResult} from '../model/game.result';
import {CommonUtil} from '../util/common.util';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() {
  }

  ratingUtil = new RatingUtil();

  player = new Player();

  resultTypes = Object.values(GameResultType);

  newResult = new GameResult();

  ngOnInit() {
    this.player.results = [];
  }

  addResult(newResult: GameResult) {
    const cloned = new GameResult();
    Object.assign(cloned, newResult);
    this.player.results.push(cloned);
    this.ratingUtil.updatePlayer(this.player);
  }

  remove(result: GameResult) {
    CommonUtil.arrayRemove(this.player.results, result);
    this.ratingUtil.updatePlayer(this.player);
  }
}

import {RatingChart} from '../model/rating.chart';

export const RATING_CHARTS: RatingChart[] =
  [{lower: 0, upper: 12, expected: 8, upset: 8},
    {lower: 13, upper: 37, expected: 7, upset: 10},
    {lower: 38, upper: 62, expected: 6, upset: 13},
    {lower: 63, upper: 87, expected: 5, upset: 16},
    {lower: 88, upper: 112, expected: 4, upset: 20},
    {lower: 113, upper: 137, expected: 3, upset: 25},
    {lower: 138, upper: 162, expected: 2, upset: 30},
    {lower: 163, upper: 187, expected: 2, upset: 35},
    {lower: 188, upper: 212, expected: 1, upset: 40},
    {lower: 213, upper: 237, expected: 1, upset: 45},
    {lower: 238, upper: 3000, expected: 0, upset: 50},
  ];

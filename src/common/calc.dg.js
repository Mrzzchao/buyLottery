/**
 * Created by lichun on 2016/4/15.
 */
let tables = (function() {
  let tables = {};
  let jqsMap = ['-', 1, 2, 3, 3, 4, 5, 4, 5, 6, 5, 6, 7, 7, 0, 2, 4, 6, '-', 1, 2, 3, 3, 4, 5, 4, 5, 6, 5, 6, 7];
  let bqcMap = ['-', [0, 3],
    [0, 3],
    [0, 3, 6],
    [0, 3],
    [0, 3, 6],
    [0, 3, 6],
    [0, 3],
    [0, 3, 6],
    [0, 3, 6],
    [0, 3],
    [0, 3, 6],
    [0, 3, 6],
    [1, 4, 7],
    [4],
    [1, 4, 7],
    [1, 4, 7],
    [1, 4, 7],
    '-', [5, 8],
    [5, 8],
    [2, 5, 8],
    [5, 8],
    [2, 5, 8],
    [2, 5, 8],
    [5, 8],
    [2, 5, 8],
    [2, 5, 8],
    [5, 8],
    [2, 5, 8],
    [2, 5, 8]
  ];
  let rfMap = ['-', 1, 2, 1, 3, 2, 1, 4, 3, 2, 5, 4, 3, 0, 0, 0, 0, 0, '-', -1, -2, -1, -3, -2, -1, -4, -3, -2, -5, -4, -3];
  let rfspf;
  ['-7', '-6', '-5', '-4', '-3', '-2', '-1', '1', '2', '3', '4', '5', '6', '7'].forEach(function(rq) {
    rq = rq << 0;
    tables[rq] = {};
    [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5].forEach(function(yszq) {
      let tmp = tables[rq][yszq] = [],
        tmp2;
      for (let i = 0; i <= 30; i++) {
        if (i <= 12) { //胜
          if (i === 0) {
            tmp2 = yszq > 6 ? 1 : 0;
            if (rq > -6) {
              tmp.push([i, 6, 0, 0, 0, tmp2]);
              tmp.push([i, 6, 3, 0, 0, tmp2]);
            } else if (rq == -6) {
              tmp.push([i, 6, 0, 0, 1, tmp2]);
              tmp.push([i, 6, 3, 0, 1, tmp2]);
            } else {
              tmp.push([i, 6, 0, 0, 2, tmp2]);
              tmp.push([i, 6, 3, 0, 2, tmp2]);
            }
            if (yszq < 7) {
              if (rq > -1) {
                tmp.push([i, 7, 0, 0, 0, 0]);
                tmp.push([i, 7, 3, 0, 0, 0]);
                tmp.push([i, 7, 6, 0, 0, 0]);
              } else if (rq == -1) {
                tmp.push([i, 7, 0, 0, 0, 0]);
                tmp.push([i, 7, 3, 0, 0, 0]);
                tmp.push([i, 7, 6, 0, 0, 0]);
                tmp.push([i, 7, 0, 0, 1, 0]);
                tmp.push([i, 7, 3, 0, 1, 0]);
                tmp.push([i, 7, 6, 0, 1, 0]);
              } else {
                tmp.push([i, 7, 0, 0, 0, 0]);
                tmp.push([i, 7, 3, 0, 0, 0]);
                tmp.push([i, 7, 6, 0, 0, 0]);
                tmp.push([i, 7, 0, 0, 1, 0]);
                tmp.push([i, 7, 3, 0, 1, 0]);
                tmp.push([i, 7, 6, 0, 1, 0]);
                tmp.push([i, 7, 0, 0, 2, 0]);
                tmp.push([i, 7, 3, 0, 2, 0]);
                tmp.push([i, 7, 6, 0, 2, 0]);
              }
            } else {
              if (rq > -1) {
                tmp.push([i, 7, 0, 0, 0, 1]);
                tmp.push([i, 7, 0, 0, 0, 0]);
                tmp.push([i, 7, 3, 0, 0, 1]);
                tmp.push([i, 7, 3, 0, 0, 0]);
                tmp.push([i, 7, 6, 0, 0, 1]);
                tmp.push([i, 7, 6, 0, 0, 0]);
              } else if (rq == -1) {
                tmp.push([i, 7, 0, 0, 0, 1]);
                tmp.push([i, 7, 0, 0, 0, 0]);
                tmp.push([i, 7, 3, 0, 0, 1]);
                tmp.push([i, 7, 3, 0, 0, 0]);
                tmp.push([i, 7, 6, 0, 0, 1]);
                tmp.push([i, 7, 6, 0, 0, 0]);
                tmp.push([i, 7, 0, 0, 1, 1]);
                tmp.push([i, 7, 0, 0, 1, 0]);
                tmp.push([i, 7, 3, 0, 1, 1]);
                tmp.push([i, 7, 3, 0, 1, 0]);
                tmp.push([i, 7, 6, 0, 1, 1]);
                tmp.push([i, 7, 6, 0, 1, 0]);
              } else {
                tmp.push([i, 7, 0, 0, 0, 1]);
                tmp.push([i, 7, 0, 0, 0, 0]);
                tmp.push([i, 7, 3, 0, 0, 1]);
                tmp.push([i, 7, 3, 0, 0, 0]);
                tmp.push([i, 7, 6, 0, 0, 1]);
                tmp.push([i, 7, 6, 0, 0, 0]);
                tmp.push([i, 7, 0, 0, 1, 1]);
                tmp.push([i, 7, 0, 0, 1, 0]);
                tmp.push([i, 7, 3, 0, 1, 1]);
                tmp.push([i, 7, 3, 0, 1, 0]);
                tmp.push([i, 7, 6, 0, 1, 1]);
                tmp.push([i, 7, 6, 0, 1, 0]);
                tmp.push([i, 7, 0, 0, 2, 1]);
                tmp.push([i, 7, 0, 0, 2, 0]);
                tmp.push([i, 7, 3, 0, 2, 1]);
                tmp.push([i, 7, 3, 0, 2, 0]);
                tmp.push([i, 7, 6, 0, 2, 1]);
                tmp.push([i, 7, 6, 0, 2, 0]);
              }

            }
            continue;
          }

          tmp2 = yszq > jqsMap[i] ? 1 : 0;
          if (rq > 0) {
            bqcMap[i].forEach(function(bqc) {
              tmp.push([i, jqsMap[i], bqc, 0, 0, tmp2])
            })
          } else { //分别判断
            if (rq + rfMap[i] > 0) {
              rfspf = 0;
            } else if (rq + rfMap[i] == 0) {
              rfspf = 1;
            } else {
              rfspf = 2;
            }
            bqcMap[i].forEach(function(bqc) {
              tmp.push([i, jqsMap[i], bqc, 0, rfspf, tmp2])
            });
          }
        } else if (i <= 17) { //平

          if (i === 13) {
            if (yszq < 8) {
              if (rq > 0) {
                bqcMap[i].forEach(function(bqc) {
                  tmp.push([i, jqsMap[i], bqc, 1, 0, 0])
                })
              } else { //分别判断
                bqcMap[i].forEach(function(bqc) {
                  tmp.push([i, jqsMap[i], bqc, 1, 2, 0])
                })
              }
            } else {
              if (rq > 0) {
                bqcMap[i].forEach(function(bqc) {
                  tmp.push([i, jqsMap[i], bqc, 1, 0, 0]);
                  tmp.push([i, jqsMap[i], bqc, 1, 0, 1])
                })
              } else { //分别判断
                bqcMap[i].forEach(function(bqc) {
                  tmp.push([i, jqsMap[i], bqc, 1, 2, 0]);
                  tmp.push([i, jqsMap[i], bqc, 1, 2, 1])
                })
              }
            }

          } else {
            tmp2 = yszq > jqsMap[i] ? 1 : 0;
            if (rq > 0) {
              bqcMap[i].forEach(function(bqc) {
                tmp.push([i, jqsMap[i], bqc, 1, 0, tmp2])
              })
            } else { //分别判断
              bqcMap[i].forEach(function(bqc) {
                tmp.push([i, jqsMap[i], bqc, 1, 2, tmp2])
              })
            }
          }


        } else { //负
          if (i === 18) {
            tmp2 = yszq > 6 ? 0 : 1;
            if (rq > 6) {
              tmp.push([i, 6, 5, 2, 0, tmp2]);
              tmp.push([i, 6, 8, 2, 0, tmp2]);
            } else if (rq == 6) {
              tmp.push([i, 6, 5, 2, 1, tmp2]);
              tmp.push([i, 6, 8, 2, 1, tmp2]);
            } else {
              tmp.push([i, 6, 5, 2, 2, tmp2]);
              tmp.push([i, 6, 8, 2, 2, tmp2]);
            }


            if (yszq < 7) {
              if (rq < 1) {
                tmp.push([i, 7, 2, 2, 2, 0]);
                tmp.push([i, 7, 5, 2, 2, 0]);
                tmp.push([i, 7, 8, 2, 2, 0]);
              } else if (rq == 1) {
                tmp.push([i, 7, 2, 2, 2, 0]);
                tmp.push([i, 7, 5, 2, 2, 0]);
                tmp.push([i, 7, 8, 2, 2, 0]);
                tmp.push([i, 7, 2, 2, 1, 0]);
                tmp.push([i, 7, 5, 2, 1, 0]);
                tmp.push([i, 7, 8, 2, 1, 0]);
              } else {
                tmp.push([i, 7, 2, 2, 2, 0]);
                tmp.push([i, 7, 5, 2, 2, 0]);
                tmp.push([i, 7, 8, 2, 2, 0]);
                tmp.push([i, 7, 2, 2, 1, 0]);
                tmp.push([i, 7, 5, 2, 1, 0]);
                tmp.push([i, 7, 8, 2, 1, 0]);
                tmp.push([i, 7, 2, 2, 2, 0]);
                tmp.push([i, 7, 5, 2, 2, 0]);
                tmp.push([i, 7, 8, 2, 2, 0]);
              }
            } else {
              if (rq < 1) {
                tmp.push([i, 7, 2, 2, 2, 0]);
                tmp.push([i, 7, 2, 2, 2, 1]);
                tmp.push([i, 7, 5, 2, 2, 0]);
                tmp.push([i, 7, 5, 2, 2, 1]);
                tmp.push([i, 7, 8, 2, 2, 0]);
                tmp.push([i, 7, 8, 2, 2, 1]);
              } else if (rq == 1) {
                tmp.push([i, 7, 2, 2, 2, 0]);
                tmp.push([i, 7, 2, 2, 2, 1]);
                tmp.push([i, 7, 5, 2, 2, 0]);
                tmp.push([i, 7, 5, 2, 2, 1]);
                tmp.push([i, 7, 8, 2, 2, 0]);
                tmp.push([i, 7, 8, 2, 2, 1]);
                tmp.push([i, 7, 2, 2, 1, 0]);
                tmp.push([i, 7, 2, 2, 1, 1]);
                tmp.push([i, 7, 5, 2, 1, 0]);
                tmp.push([i, 7, 5, 2, 1, 1]);
                tmp.push([i, 7, 8, 2, 1, 0]);
                tmp.push([i, 7, 8, 2, 1, 1]);
              } else {
                tmp.push([i, 7, 2, 2, 2, 0]);
                tmp.push([i, 7, 2, 2, 2, 1]);
                tmp.push([i, 7, 5, 2, 2, 0]);
                tmp.push([i, 7, 5, 2, 2, 1]);
                tmp.push([i, 7, 8, 2, 2, 0]);
                tmp.push([i, 7, 8, 2, 2, 1]);
                tmp.push([i, 7, 2, 2, 1, 0]);
                tmp.push([i, 7, 2, 2, 1, 1]);
                tmp.push([i, 7, 5, 2, 1, 0]);
                tmp.push([i, 7, 5, 2, 1, 1]);
                tmp.push([i, 7, 8, 2, 1, 0]);
                tmp.push([i, 7, 8, 2, 1, 1]);
                tmp.push([i, 7, 2, 2, 2, 0]);
                tmp.push([i, 7, 2, 2, 2, 1]);
                tmp.push([i, 7, 5, 2, 2, 0]);
                tmp.push([i, 7, 5, 2, 2, 1]);
                tmp.push([i, 7, 8, 2, 2, 0]);
                tmp.push([i, 7, 8, 2, 2, 1]);
              }
            }

            continue;
          }

          tmp2 = yszq > jqsMap[i] ? 1 : 0;
          if (rq < 0) {
            bqcMap[i].forEach(function(bqc) {
              tmp.push([i, jqsMap[i], bqc, 2, 2, tmp2])
            })
          } else { //分别判断
            if (rq + rfMap[i] > 0) {
              rfspf = 0;
            } else if (rq + rfMap[i] == 0) {
              rfspf = 1;
            } else {
              rfspf = 2;
            }

            bqcMap[i].forEach(function(bqc) {
              tmp.push([i, jqsMap[i], bqc, 2, rfspf, tmp2])
            })
          }
        }

      }
    });


  });
  return tables;
})();
let playMeta = {
  "269": 3,
  "270": 8,
  "271": 31,
  "272": 9,
  "354": 3,
  "406": 2
};
// 算法内部使用的玩法ID顺序
let _playid_order = ['271', '270', '272', '354', '269', '406'];

let code_order = {
  354: ['3', '1', '0'],
  269: ['3', '1', '0'],
  271: [
    '胜其它', '1:0', '2:0', '2:1', '3:0', '3:1', '3:2', '4:0', '4:1', '4:2', '5:0', '5:1', '5:2',
    '平其它', '0:0', '1:1', '2:2', '3:3',
    '负其它', '0:1', '0:2', '1:2', '0:3', '1:3', '2:3', '0:4', '1:4', '2:4', '0:5', '1:5', '2:5'
  ],
  270: ['0', '1', '2', '3', '4', '5', '6', '7'],
  272: ['3-3', '3-1', '3-0', '1-3', '1-1', '1-0', '0-3', '0-1', '0-0'],
  406: ['1', '2']
};

function code_from_ordinal(playid, code_ord) {
  return code_order[playid][code_ord];
}
/**
 * 计算奖金
 *
 * @param match_results 一场比赛各玩法的赛果组合
 * @param bet 用户投注选择
 * @returns {number} 奖金
 */
function calc_match_prize(match_results, bet) {
  let sum = 0;
  let playid_ord, playid, code_ord, code;
  for (let i = 0; i < match_results.length; i++) {
    playid_ord = i;
    playid = _playid_order[playid_ord];
    code_ord = match_results[i];
    code = code_from_ordinal(playid, code_ord);
    if (bet[playid] && bet[playid][code]) {
      if (typeof(bet[playid][code]) !== 'number') {
        throw new Error("奖金必须为数字");
      }
      sum += bet[playid][code];
    }
  }
  return sum;
}

let calc = function(rangqiu, yszq, peilvInfo) {
  let fixMin = Object.keys(peilvInfo).some(function(playid) {
    return playMeta[playid] === Object.keys(peilvInfo[playid]).length
  });
  rangqiu = Number(rangqiu);
  if (rangqiu < -7) {
    rangqiu = -7;
  } else if (rangqiu > 7) {
    rangqiu = 7;
  }
  if (yszq === '0.0') yszq = '1.5'; //todo
  let table = tables[rangqiu][yszq],
    min = 0,
    max = 0;
  table.forEach(function(match_results) {
    let prize = calc_match_prize(match_results, peilvInfo);
    if (prize > 0) {
      if (prize > max) {
        max = prize;
      }
      if (min === 0 || prize < min) {
        min = prize;
      }
    }
  });
  return {
    min: min,
    max: max,
    fixMin: fixMin ? min : 0
  }



};

/**
 * 计算奖金范围
 */
let calcAll = function(peilvInfo, rangqiuInfo, yszqInfo) {
  let min = 100000;
  let max = 0,
    fixMin = 0;
  Object.keys(peilvInfo).forEach(function(mid) {
    let result = calc(rangqiuInfo[mid], yszqInfo[mid], peilvInfo[mid]);
    if (min == null) {
      min = result.min;
    } else {
      min = Math.min(result.min, min);
    }
    max += result.max;
    fixMin += result.fixMin

  });
  // console.timeEnd('abc')
  return {
    max: max.toFixed(2),
    min: ((min === 100000) ? 0 : (fixMin || min)).toFixed(2)
  }
}

export const calculator = {
  calcAll: calcAll
}

import {AllSgMap} from '~common/constants'

let objValue = function (obj) {
    return Object.keys(obj).map(function (key) { return obj[key] });
};

/**
 * 子过关配置列表
 */
let AllSgList = objValue(AllSgMap).sort(function (a, b) {
    return a.id - b.id
});

/**
 * 根据子过关id获取对应的配置
 */
let getSgtypeById = function (sgid) {
    return AllSgMap[sgid]
};

/**
 * 根据比赛场数和玩法,获取子过关类型
 * @param num      比赛场次数量
 * @param playtype 玩法
 * @return {
 *      ziyou: []       自由过关的可选过关方式列表
 *      duochuan: []     多串过关的可选过关方式列表
 * }
 */
let getAllowSgTypes = function (num, playtype) {
    let Conf = {
        "sfc": 4,
        "bqc": 4,
        "jqs": 6,
        "bf": 4,
        "dxq":8
    };
    let maxNum = Conf[playtype] || 8;
    let ret = {
        ziyou: [],
        duochuan: []
    };

    AllSgList.forEach(function (sg) {
        if (sg.nnum <= num && sg.nnum <= maxNum) {
            if (sg.isd) {
                ret.duochuan.push(sg);
            } else {
                ret.ziyou.push(sg);
            }
        }
    });

    return ret;
};

/**
 * 从集合中找出num个一组的所有组合集合
 * @param {array}  set
 * @param {number} num
 * @return {array}
 */
let combine = function (set, num) {
    let r = [];
    (function f(t, a, n) {
        if (n == 0) return r.push(t);
        for (let i = 0, l = a.length; i <= l - n; i++) {
            f(t.concat([a[i]]), a.slice(i + 1), n - 1);
        }
    })([], set, num);
    return r;
};


/**
 * 计算m中取n个的组合数
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
let permutation = function (m, n) {
    if (n > m) return 0;
    let s = 1;
    for (let i = 0; i < n; i++) {
        s = s * (m - i) / (i + 1);
    }
    return s;
};

let convertObjToArray = function (obj) {
    let sizeArray = [];
    let maxPlArray = [];
    let minPlArray = [];

    Object.keys(obj).forEach(function (mid) {
        let item = obj[mid];
        let values = objValue(item);

        sizeArray.push(values.length);
        maxPlArray.push(Math.max.apply(Math, values));
        minPlArray.push(Math.min.apply(Math, values));
    });

    return {
        sizeArray: sizeArray,
        maxPlArray: maxPlArray,
        minPlArray: minPlArray.sort(function (a, b) {
            return a - b
        })
    }
};

/**
 * 计算最大值
 */
let calcMax = function (array, sg) {
    let sum = 0;
    let _tmpArray = combine(array, sg.nnum);

    if (sg.isd) {
        _tmpArray.forEach(function (item) {
            sg.dc.forEach(function (sid) {
                let _tmpsg = getSgtypeById(sid);
                sum += calcMax(item, _tmpsg);
            });
        });
    } else {
        _tmpArray.forEach(function (item) {
            sum += getLimitP(item);
        });
    }
    return sum;
};

let getLimitP = function (item) {
    let _p = item.reduce(function (a, b) {
        return a * b
    });

    //_p = Math.floor(_p * 100) / 100;

    //单关投注，单注最高奖金限额为500万元；
    //2或3场过关投注，单注最高奖金限额为20万元；
    //4或5场过关投注，单注最高奖金限额为50万元；
    //6场过关投注，单注最高奖金限额100万元。
    if (item.length <= 3) {
        if (_p >= 100000) {
            _p = 100000;
        }
    } else if (item.length <= 5) {
        if (_p >= 250000) {
            _p = 250000;
        }
    } else if (item.length == 6) {
        if (_p >= 500000) {
            _p = 500000;
        }
    } else {
        if (_p >= 2500000) {
            _p = 2500000;
        }
    }
    return _p;
};

let parseMinSg = function (sg, len) {
    if (sg.isd) {
        let _sg = getSgtypeById(sg.dc[0]);
        return {
            minnum: _sg.nnum,
            zhushu: permutation(len - _sg.nnum, sg.nnum - _sg.nnum)
        }
    } else {
        return {
            minnum: sg.nnum,
            zhushu: 1
        }
    }
};

let calcMin = function (minPlArray, minSg) {
    let tmparray = minPlArray.slice(0, minSg.minnum);
    return getLimitP(tmparray) * minSg.zhushu
};

/**
 * 根据选中的比赛的选项和赔率,以及过关方式,计算出奖金范围和可搭配出的注数
 * @param  {object}  allmatches  选中的比赛及赔率信息
 * @param  {array}   sgtypes     过关方式列表
 */
let calc = function (allmatches, sgtypes) {
    let _result = convertObjToArray(allmatches);

    let maxP = 0;
    let minP = 0;
    let zhushu = 0;

    let minSg = null;

    sgtypes.forEach(function (sid) {
        let sg = getSgtypeById(sid);

        maxP += calcMax(_result.maxPlArray, sg);
        zhushu += calcMax(_result.sizeArray, sg);

        let tmpsg = parseMinSg(sg, _result.minPlArray.length);

        if (minSg === null) {
            minSg = tmpsg;
        } else {
            if (tmpsg.minnum < minSg.minnum) {
                minSg = tmpsg;
            } else if (tmpsg.minnum == minSg.minnum) {
                minSg.zhushu += tmpsg.zhushu;
            }
        }
    });

    minP = calcMin(_result.minPlArray, minSg);

    return {
        zhushu: zhushu,
        maxP: maxP,
        minP: minP
    };
};

/**
 * 过关group,优先多串
 */
function getGggroup(selectGgType) {
    let gggroup = 3;
    for (let i = 0, j = selectGgType.length; i < j; i++) {
        if (getSgtypeById(selectGgType[i]).isd) {
            gggroup = 2;
            break;
        }
    }
    return gggroup;
}

export const calculator = {
    calc: calc,
    getAllowSgTypes: getAllowSgTypes,
    getSgtypeById: getSgtypeById,
    getGggroup: getGggroup
}

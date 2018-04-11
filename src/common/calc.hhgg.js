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
 *
 * @param num  比赛场次数量
 */
let getAllowSgTypes = function (num,selectedObject) {
    let maxNum = 8;
    Object.keys(selectedObject).some(function(mid){
        if("271" in selectedObject[mid] || "272" in selectedObject[mid]){
            maxNum = 4;
            return true;
        }else if("270" in selectedObject[mid]){
            maxNum = 6;
        }
    });

    let r = {
        ziyou: [],
        duochuan: []
    };

    AllSgList.forEach(function (sg) {
        if (sg.nnum <= num && sg.nnum <= maxNum) {
            if (sg.isd) {
                r.duochuan.push(sg);
            } else {
                r.ziyou.push(sg);
            }
        }
    });
    return r;
};

let getSgtypeById = function (sgid) {
    return AllSgMap[sgid];
};

let combine = function (arr, num) {
    let r = [];
    (function f(t, a, n) {
        if (n == 0) return r.push(t);
        for (let i = 0, l = a.length; i <= l - n; i++) {
            f(t.concat([a[i]]), a.slice(i + 1), n - 1);
        }
    })([], arr, num);
    return r;
};


//计算m中取n个的组合数
let permutation = function (m, n) {
    if (n > m) return 0;
    let s = 1;
    for (let i = 0; i < n; i++) {
        s = s * (m - i) / (i + 1);
    }
    return s;
};

let arrayflatten = function (array) {
    let ret = [];
    array.forEach(function (item) {
        if (Array.isArray(item)) {
            ret.push.apply(ret, item);
        }
        else {
            ret.push(item);
        }
    });

    return ret;
};

/**
 * 按入参做笛卡尔积
 * 只接受一个参数 且为数组
 * cartesianProductOf([[1,2,3],[4,5,6]])
 * @returns {*}
 */
let cartesianProductOf_Array = function (array) {
    return array.reduce(function (a, b) {
        return arrayflatten(a.map(function (x) {
            return b.map(function (y) {
                return x.concat([y]);
            });
        }));
    }, [
        []
    ]);
};

let getLimitP = function (item) {

    let _p = item.reduce(function (a, b) {
        return a * b
    });

    //_p = Math.floor(_p * 100) / 100;

    // 单关投注，单注最高奖金限额为500万元；
    // 2或3场过关投注，单注最高奖金限额为20万元；
    // 4或5场过关投注，单注最高奖金限额为50万元；
    // 6场过关投注，单注最高奖金限额100万元。
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

let tables = (function(){
    let tables = {};
    let jqsMap = ['-',1,2,3,3,4,5,4,5,6,5,6,7,7,0,2,4,6,'-',1,2,3,3,4,5,4,5,6,5,6,7];
    let bqcMap = ['-',[0,3],[0,3],[0,3,6],[0,3],[0,3,6],[0,3,6],[0,3],[0,3,6],[0,3,6],[0,3],[0,3,6],[0,3,6],
        [1,4,7],[4],[1,4,7],[1,4,7],[1,4,7],
        '-',[5,8],[5,8],[2,5,8],[5,8],[2,5,8],[2,5,8],[5,8],[2,5,8],[2,5,8],[5,8],[2,5,8],[2,5,8]
    ];
    let rfMap = ['-',1,2,1,3,2,1,4,3,2,5,4,3,0,0,0,0,0,'-',-1,-2,-1,-3,-2,-1,-4,-3,-2,-5,-4,-3];
    let rfspf;
    ['-7','-6','-5','-4','-3','-2','-1','1','2','3','4','5','6','7'].forEach(function(rq){
        rq = rq<<0;
        tables[rq] = {};
        [0.5,1.5,2.5,3.5,4.5,5.5,6.5,7.5,8.5,9.5,10.5].forEach(function (yszq) {
            let tmp = tables[rq][yszq] = [],tmp2;
            for(let i=0;i<=30;i++){
                if(i<=12){//胜
                    if(i===0){
                        tmp2=yszq>6?1:0;
                        if(rq>-6){
                            tmp.push([i,6,0,0,0,tmp2]);
                            tmp.push([i,6,3,0,0,tmp2]);
                        }else if(rq==-6){
                            tmp.push([i,6,0,0,1,tmp2]);
                            tmp.push([i,6,3,0,1,tmp2]);
                        }else{
                            tmp.push([i,6,0,0,2,tmp2]);
                            tmp.push([i,6,3,0,2,tmp2]);
                        }
                        if(yszq<7){
                            if(rq>-1){
                                tmp.push([i, 7, 0, 0, 0,0]);
                                tmp.push([i, 7, 3, 0, 0,0]);
                                tmp.push([i, 7, 6, 0, 0,0]);
                            }else if(rq==-1){
                                tmp.push([i, 7, 0, 0, 0,0]);
                                tmp.push([i, 7, 3, 0, 0,0]);
                                tmp.push([i, 7, 6, 0, 0,0]);
                                tmp.push([i, 7, 0, 0, 1,0]);
                                tmp.push([i, 7, 3, 0, 1,0]);
                                tmp.push([i, 7, 6, 0, 1,0]);
                            }else{
                                tmp.push([i, 7, 0, 0, 0,0]);
                                tmp.push([i, 7, 3, 0, 0,0]);
                                tmp.push([i, 7, 6, 0, 0,0]);
                                tmp.push([i, 7, 0, 0, 1,0]);
                                tmp.push([i, 7, 3, 0, 1,0]);
                                tmp.push([i, 7, 6, 0, 1,0]);
                                tmp.push([i, 7, 0, 0, 2,0]);
                                tmp.push([i, 7, 3, 0, 2,0]);
                                tmp.push([i, 7, 6, 0, 2,0]);
                            }
                        }else {
                            if(rq>-1){
                                tmp.push([i, 7, 0, 0, 0,1]);tmp.push([i, 7, 0, 0, 0,0]);
                                tmp.push([i, 7, 3, 0, 0,1]);tmp.push([i, 7, 3, 0, 0,0]);
                                tmp.push([i, 7, 6, 0, 0,1]);tmp.push([i, 7, 6, 0, 0,0]);
                            }else if(rq==-1){
                                tmp.push([i, 7, 0, 0, 0,1]);tmp.push([i, 7, 0, 0, 0,0]);
                                tmp.push([i, 7, 3, 0, 0,1]);tmp.push([i, 7, 3, 0, 0,0]);
                                tmp.push([i, 7, 6, 0, 0,1]);tmp.push([i, 7, 6, 0, 0,0]);
                                tmp.push([i, 7, 0, 0, 1,1]);tmp.push([i, 7, 0, 0, 1,0]);
                                tmp.push([i, 7, 3, 0, 1,1]);tmp.push([i, 7, 3, 0, 1,0]);
                                tmp.push([i, 7, 6, 0, 1,1]);tmp.push([i, 7, 6, 0, 1,0]);
                            }else{
                                tmp.push([i, 7, 0, 0, 0,1]);tmp.push([i, 7, 0, 0, 0,0]);
                                tmp.push([i, 7, 3, 0, 0,1]);tmp.push([i, 7, 3, 0, 0,0]);
                                tmp.push([i, 7, 6, 0, 0,1]);tmp.push([i, 7, 6, 0, 0,0]);
                                tmp.push([i, 7, 0, 0, 1,1]);tmp.push([i, 7, 0, 0, 1,0]);
                                tmp.push([i, 7, 3, 0, 1,1]);tmp.push([i, 7, 3, 0, 1,0]);
                                tmp.push([i, 7, 6, 0, 1,1]);tmp.push([i, 7, 6, 0, 1,0]);
                                tmp.push([i, 7, 0, 0, 2,1]);tmp.push([i, 7, 0, 0, 2,0]);
                                tmp.push([i, 7, 3, 0, 2,1]);tmp.push([i, 7, 3, 0, 2,0]);
                                tmp.push([i, 7, 6, 0, 2,1]);tmp.push([i, 7, 6, 0, 2,0]);
                            }

                        }
                        continue;
                    }

                    tmp2 = yszq>jqsMap[i]?1:0;
                    if(rq>0){
                        bqcMap[i].forEach(function(bqc){
                            tmp.push([i,jqsMap[i],bqc,0,0,tmp2])
                        })
                    }else{//分别判断
                        if(rq+rfMap[i]>0){
                            rfspf = 0;
                        }else if(rq+rfMap[i]==0){
                            rfspf = 1;
                        }else{
                            rfspf = 2;
                        }
                        bqcMap[i].forEach(function(bqc){
                            tmp.push([i,jqsMap[i],bqc,0,rfspf,tmp2])
                        });
                    }
                }else if(i<=17){//平

                    if(i===13){
                        if(yszq<8){
                            if(rq>0){
                                bqcMap[i].forEach(function(bqc){
                                    tmp.push([i,jqsMap[i],bqc,1,0,0])
                                })
                            }else{//分别判断
                                bqcMap[i].forEach(function(bqc){
                                    tmp.push([i,jqsMap[i],bqc,1,2,0])
                                })
                            }
                        }else {
                            if(rq>0){
                                bqcMap[i].forEach(function(bqc){
                                    tmp.push([i,jqsMap[i],bqc,1,0,0]);
                                    tmp.push([i,jqsMap[i],bqc,1,0,1])
                                })
                            }else{//分别判断
                                bqcMap[i].forEach(function(bqc){
                                    tmp.push([i,jqsMap[i],bqc,1,2,0]);
                                    tmp.push([i,jqsMap[i],bqc,1,2,1])
                                })
                            }
                        }

                    }else {
                        tmp2 = yszq>jqsMap[i]?1:0;
                        if(rq>0){
                            bqcMap[i].forEach(function(bqc){
                                tmp.push([i,jqsMap[i],bqc,1,0,tmp2])
                            })
                        }else{//分别判断
                            bqcMap[i].forEach(function(bqc){
                                tmp.push([i,jqsMap[i],bqc,1,2,tmp2])
                            })
                        }
                    }


                }else {//负
                    if(i===18){
                        tmp2=yszq>6?0:1;
                        if(rq>6){
                            tmp.push([i,6,5,2,0,tmp2]);
                            tmp.push([i,6,8,2,0,tmp2]);
                        }else if(rq==6){
                            tmp.push([i,6,5,2,1,tmp2]);
                            tmp.push([i,6,8,2,1,tmp2]);
                        }else{
                            tmp.push([i,6,5,2,2,tmp2]);
                            tmp.push([i,6,8,2,2,tmp2]);
                        }


                        if(yszq<7){
                            if(rq<1){
                                tmp.push([i, 7, 2, 2, 2, 0]);
                                tmp.push([i, 7, 5, 2, 2, 0]);
                                tmp.push([i, 7, 8, 2, 2, 0]);
                            }else if(rq==1){
                                tmp.push([i, 7, 2, 2, 2, 0]);
                                tmp.push([i, 7, 5, 2, 2, 0]);
                                tmp.push([i, 7, 8, 2, 2, 0]);
                                tmp.push([i, 7, 2, 2, 1, 0]);
                                tmp.push([i, 7, 5, 2, 1, 0]);
                                tmp.push([i, 7, 8, 2, 1, 0]);
                            }else{
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
                        }else {
                            if(rq<1){
                                tmp.push([i, 7, 2, 2, 2,0]);tmp.push([i, 7, 2, 2, 2,1]);
                                tmp.push([i, 7, 5, 2, 2,0]);tmp.push([i, 7, 5, 2, 2,1]);
                                tmp.push([i, 7, 8, 2, 2,0]);tmp.push([i, 7, 8, 2, 2,1]);
                            }else if(rq==1){
                                tmp.push([i, 7, 2, 2, 2,0]);tmp.push([i, 7, 2, 2, 2,1]);
                                tmp.push([i, 7, 5, 2, 2,0]);tmp.push([i, 7, 5, 2, 2,1]);
                                tmp.push([i, 7, 8, 2, 2,0]);tmp.push([i, 7, 8, 2, 2,1]);
                                tmp.push([i, 7, 2, 2, 1,0]);tmp.push([i, 7, 2, 2, 1,1]);
                                tmp.push([i, 7, 5, 2, 1,0]);tmp.push([i, 7, 5, 2, 1,1]);
                                tmp.push([i, 7, 8, 2, 1,0]);tmp.push([i, 7, 8, 2, 1,1]);
                            }else{
                                tmp.push([i, 7, 2, 2, 2,0]);tmp.push([i, 7, 2, 2, 2,1]);
                                tmp.push([i, 7, 5, 2, 2,0]);tmp.push([i, 7, 5, 2, 2,1]);
                                tmp.push([i, 7, 8, 2, 2,0]);tmp.push([i, 7, 8, 2, 2,1]);
                                tmp.push([i, 7, 2, 2, 1,0]);tmp.push([i, 7, 2, 2, 1,1]);
                                tmp.push([i, 7, 5, 2, 1,0]);tmp.push([i, 7, 5, 2, 1,1]);
                                tmp.push([i, 7, 8, 2, 1,0]);tmp.push([i, 7, 8, 2, 1,1]);
                                tmp.push([i, 7, 2, 2, 2,0]);tmp.push([i, 7, 2, 2, 2,1]);
                                tmp.push([i, 7, 5, 2, 2,0]);tmp.push([i, 7, 5, 2, 2,1]);
                                tmp.push([i, 7, 8, 2, 2,0]);tmp.push([i, 7, 8, 2, 2,1]);
                            }
                        }

                        continue;
                    }

                    tmp2 = yszq>jqsMap[i]?1:0;
                    if(rq<0){
                        bqcMap[i].forEach(function(bqc){
                            tmp.push([i,jqsMap[i],bqc,2,2,tmp2])
                        })
                    }else{//分别判断
                        if(rq+rfMap[i]>0){
                            rfspf = 0;
                        }else if(rq+rfMap[i]==0){
                            rfspf = 1;
                        }else{
                            rfspf = 2;
                        }

                        bqcMap[i].forEach(function(bqc){
                            tmp.push([i,jqsMap[i],bqc,2,rfspf,tmp2])
                        })
                    }
                }

            }
        });


    });
    return tables;
})();
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
    406:['1','2']
};

let _playid_order = ['271', '270', '272', '354', '269','406'];

let _sum = function (array) {
    return array.reduce(function (a, b) {
        return a + b
    });
};

/**
 * 赛过互斥后的结果 过滤可能的赛果
 * @param selectedObject
 * @param rqObject
 * @returns {{minResult: {}, maxResult: {}}}
 */
let filterEnableResult = function (selectedObject, rqObject,yszqObject) {
    let minResult = {};
    let maxResult = {};
    let optResult = {};

    Object.keys(selectedObject).forEach(function (mid) {
        let obj = selectedObject[mid];

        let rq = rqObject[mid];
        if (rq == null) {
            throw mid + " 没有提供让球相关的数据";
        }
        let yszq = yszqObject[mid];
        if (yszq === undefined) {
            yszq = 1.5;
            // throw mid + " 没有提供预设总分相关的数据";
        }
        /**
         * 这里是将每个玩法选了几个投注项转成数组
         * @type {Array}
         */
        let optObjct = [];
        Object.keys(obj).forEach(function (playid) {
            let opts = obj[playid];

            optObjct.push(Object.keys(opts).length);
        });


        let enableArray = tables[rq + ""][yszq+''];
        let minObject = [];
        let maxObject = [];
        let max = 0;
        let min = Infinity;

        enableArray.forEach(function (item) {
            let prize = 0;
            let tempObject = [];

            item.forEach(function (optionIndex, index) {
                let playid = _playid_order[index];
                let selectoption = code_order[playid][optionIndex];

                if (obj[playid] && obj[playid][selectoption]) {
                    prize += obj[playid][selectoption];
                    tempObject.push(obj[playid][selectoption]);
                }
            });

            if (prize > max) {
                max = prize;
                maxObject = tempObject;
            }
            if (prize > 0 && prize < min) {
                min = prize;
                minObject = tempObject;
            }
        });

        minResult[mid] = minObject;
        maxResult[mid] = maxObject;
        optResult[mid] = optObjct;
    });

    return {
        minResult: minResult,
        maxResult: maxResult,
        optResult: optResult
    }
};


let calcMax = function (arr, sgtype) {
    let sum = 0;
    let _t = combine(arr, sgtype.nnum);
    if (sgtype.isd) {
        _t.forEach(function (item) {
            cartesianProductOf_Array(item).forEach(function (p) {
                sgtype.dc.forEach(function (sid) {
                    let _tmpsg = getSgtypeById(sid);
                    sum += calcMax(p, _tmpsg);
                });
            });
        });
    } else {
        _t.forEach(function (item) {
            if (Array.isArray(item[0])) {
                item = item.map(function (tmp) {
                    return _sum(tmp);
                });
            }

            let prize = getLimitP(item);
            sum += prize;
        });
    }

    return sum;
};

let parseMinSg = function (sg, minkeys, optResult) {
    if (sg.isd) {
        let _sg = getSgtypeById(sg.dc[0]);
        let tempK = minkeys.slice(_sg.nnum);
        let allM = tempK.map(function (mid) {
            return optResult[mid].length;
        });

        let _arr = combine(allM, sg.nnum - _sg.nnum);
        let _z = 0;
        _arr.forEach(function (item) {
            _z += item.reduce(function (a, b) {
                return a * b
            });
        });
        return {
            minnum: _sg.nnum,
            zhushu: _z
        }
    } else {
        return {
            minnum: sg.nnum,
            zhushu: 1
        }
    }
};

let calc = function (selectedObject, rqObject, yszqObject,sgtypes) {
    let _result = filterEnableResult(selectedObject, rqObject,yszqObject);
    let minKeys = Object.keys(_result.minResult);
    minKeys.sort(function (a, b) {
        return _sum(_result.minResult[a]) - _sum(_result.minResult[b])
    });

    let maxP = 0;
    let minP = 0;
    let zhushu = 0;

    let minSg;

    let maxPlValues = objValue(_result.maxResult);
    let zhushuValues = objValue(_result.optResult);
    sgtypes.forEach(function (sid) {
        let sg = getSgtypeById(sid);
        maxP += calcMax(maxPlValues, sg);
        zhushu += calcMax(zhushuValues, sg);

        let tmpsg = parseMinSg(sg, minKeys, _result.optResult);
        if (minSg == null) {
            minSg = tmpsg;
        } else {
            if (tmpsg.minnum < minSg.minnum) {
                minSg = tmpsg;
            } else if (tmpsg.minnum == minSg.minnum) {
                minSg.zhushu += tmpsg.zhushu;
            }
        }
    });

    let clMin = minKeys.slice(0, minSg.minnum);
    let tmpMinArr = [];
    clMin.forEach(function (mid) {
        tmpMinArr.push(_sum(_result.minResult[mid]));
    });
    let sigleMin = tmpMinArr.reduce(function (a, b) {
        return a * b;
    });
    //sigleMin = Math.floor(sigleMin * 100) / 100;
    minP = sigleMin * minSg.zhushu;
    return {
        zhushu: zhushu,
        maxP: maxP,
        minP: minP
    };
};

let tz_playid_order = ['354', '269', '270', '271', '272','406'];


let mkratelist = function (selectObj, matchlistGroupByMid) {
    let mids = Object.keys(selectObj);
    let processnameObj = {};
    mids.forEach(function (mid) {
        let processname = matchlistGroupByMid[mid].processname;
        processnameObj[processname] = mid;
    });

    let processnames = Object.keys(processnameObj).sort();

    let tempA = [];
    processnames.forEach(function (processname) {
        let mid = processnameObj[processname];
        let matchSel = selectObj[mid];

        let playids = Object.keys(matchSel).sort(function (a, b) {
            return tz_playid_order.indexOf(a) - tz_playid_order.indexOf(b);
        });

        playids.forEach(function (p) {
            let _t1 = mid + "|" + processname + "|" + p + "[";
            let rp = matchSel[p];
            let _co = code_order[p];
            let _rs = Object.keys(rp).sort(function (a, b) {
                return _co.indexOf(a) - _co.indexOf(b);
            });
            let _tmp = [];
            _rs.forEach(function (_r) {
                _tmp.push(_r + "#" + rp[_r]);
            });
            _t1 = _t1 + _tmp.join(",") + "]";
            tempA.push(_t1);
        });
    });
    return tempA;
};

function getGggroup(selectGgType) {
    let gggroup = 3;
    for (let i = 0, j = selectGgType.length; i < j; i++) {
        if (getSgtypeById(selectGgType[i]).isd) {
            gggroup = 2;
            break;
        }
    }
    return gggroup
}

export const calculator = {
    calc: calc,
    getAllowSgTypes: getAllowSgTypes,
    mkratelist: mkratelist,
    getSgtypeById: getSgtypeById,
    getGggroup: getGggroup,
}

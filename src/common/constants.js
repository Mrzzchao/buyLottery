/**
 * Created by Zhangzc on 2017/12/8.
 */

 // 选项初始化模板
export const SelectTpl = {
    spf: {
        draw: false,
        lost: false,
        win: false
    },
    nspf: {
        draw: false,
        lost: false,
        win: false
    },
    dxq: {
        big: false,
        small: false
    },
    bf: {
        a10: false,
        a20: false,
        a21: false,
        a30: false,
        a31: false,
        a32: false,
        a40: false,
        a41: false,
        a42: false,
        a50: false,
        a51: false,
        a52: false,
        aother: false,
        b10: false,
        b20: false,
        b21: false,
        b30: false,
        b31: false,
        b32: false,
        b40: false,
        b41: false,
        b42: false,
        b50: false,
        b51: false,
        b52: false,
        bother: false,
        c00: false,
        c11: false,
        c22: false,
        c33: false,
        cother: false
    },
    bqc: {
        aa: false,
        ab: false,
        ac: false,
        ba: false,
        bb: false,
        bc: false,
        ca: false,
        cb: false,
        cc: false
    },
    jqs: {
        s0: false,
        s1: false,
        s2: false,
        s3: false,
        s4: false,
        s5: false,
        s6: false,
        s7: false
    }
}

 // 选项名字表
export const SelectNameMap = {
    spf: {
        draw: '平[让]',
        lost: '负[让]',
        win: '胜[让]'
    },
    nspf: {
        draw: '平',
        lost: '负',
        win: '胜'
    },
    dxq: {
        big: '大球',
        small: '小球'
    },
    bf: {
        a10: '0:1',
        a20: '0:2',
        a21: '1:2',
        a30: '0:3',
        a31: '1:3',
        a32: '2:3',
        a40: '0:4',
        a41: '1:4',
        a42: '2:4',
        a50: '0:5',
        a51: '1:5',
        a52: '2:5',
        aother: '胜其他',
        b10: '0:1',
        b20: '0:2',
        b21: '1:2',
        b30: '0:3',
        b31: '1:3',
        b32: '2:3',
        b40: '0:4',
        b41: '1:4',
        b42: '2:4',
        b50: '0:5',
        b51: '1:5',
        b52: '2:5',
        bother: '负其他',
        c00: '0:0',
        c11: '1:1',
        c22: '2:2',
        c33: '3:3',
        cother: '平其他'
    },
    bqc: {
        aa: '胜-胜',
        ab: '胜-平',
        ac: '胜-负',
        ba: '平-胜',
        bb: '平-平',
        bc: '平-负',
        ca: '负-胜',
        cb: '负-平',
        cc: '负-负'
    },
    jqs: {
        s0: '0球',
        s1: '1球',
        s2: '2球',
        s3: '3球',
        s4: '4球',
        s5: '5球',
        s6: '6球',
        s7: '7+球'
    }
}

// 子过关表
export const AllSgMap = {
    "1": { id: 1, sid: 1, sname: "2串1", nnum: 2, isd: false },
    "3": { id: 2, sid: 3, sname: "3串1", nnum: 3, isd: false },
    "7": { id: 3, sid: 7, sname: "4串1", nnum: 4, isd: false },
    "15": { id: 4, sid: 15, sname: "5串1", nnum: 5, isd: false },
    "26": { id: 5, sid: 26, sname: "6串1", nnum: 6, isd: false },
    "41": { id: 6, sid: 41, sname: "7串1", nnum: 7, isd: false },
    "48": { id: 7, sid: 48, sname: "8串1", nnum: 8, isd: false },
    "56": { id: 8, sid: 56, sname: "3串3", nnum: 3, isd: true, dc: [1] },
    "4": { id: 9, sid: 4, sname: "3串4", nnum: 3, isd: true, dc: [1, 3] },
    "8": { id: 10, sid: 8, sname: "4串4", nnum: 4, isd: true, dc: [3] },
    "9": { id: 11, sid: 9, sname: "4串5", nnum: 4, isd: true, dc: [3, 7] },
    "10": { id: 12, sid: 10, sname: "4串6", nnum: 4, isd: true, dc: [1] },
    "12": { id: 13, sid: 12, sname: "4串11", nnum: 4, isd: true, dc: [1, 3, 7] },
    "16": { id: 14, sid: 16, sname: "5串5", nnum: 5, isd: true, dc: [7] },
    "17": { id: 15, sid: 17, sname: "5串6", nnum: 5, isd: true, dc: [7, 15] },
    "18": { id: 16, sid: 18, sname: "5串10", nnum: 5, isd: true, dc: [1] },
    "20": { id: 17, sid: 20, sname: "5串16", nnum: 5, isd: true, dc: [3, 7, 15] },
    "21": { id: 18, sid: 21, sname: "5串20", nnum: 5, isd: true, dc: [1, 3] },
    "23": { id: 19, sid: 23, sname: "5串26", nnum: 5, isd: true, dc: [1, 3, 7, 15] },
    "27": { id: 20, sid: 27, sname: "6串6", nnum: 6, isd: true, dc: [15] },
    "28": { id: 21, sid: 28, sname: "6串7", nnum: 6, isd: true, dc: [15, 26] },
    "29": { id: 22, sid: 29, sname: "6串15", nnum: 6, isd: true, dc: [1] },
    "30": { id: 23, sid: 30, sname: "6串20", nnum: 6, isd: true, dc: [3] },
    "57": { id: 24, sid: 57, sname: "6串22", nnum: 6, isd: true, dc: [7, 15, 26] },
    "32": { id: 25, sid: 32, sname: "6串35", nnum: 6, isd: true, dc: [1, 3] },
    "34": { id: 26, sid: 34, sname: "6串42", nnum: 6, isd: true, dc: [3, 7, 15, 26] },
    "35": { id: 27, sid: 35, sname: "6串50", nnum: 6, isd: true, dc: [1, 3, 7] },
    "37": { id: 28, sid: 37, sname: "6串57", nnum: 6, isd: true, dc: [1, 3, 7, 15, 26] },
    "42": { id: 29, sid: 42, sname: "7串7", nnum: 7, isd: true, dc: [26] },
    "43": { id: 30, sid: 43, sname: "7串8", nnum: 7, isd: true, dc: [26, 41] },
    "44": { id: 31, sid: 44, sname: "7串21", nnum: 7, isd: true, dc: [15] },
    "45": { id: 32, sid: 45, sname: "7串35", nnum: 7, isd: true, dc: [7] },
    "46": { id: 33, sid: 46, sname: "7串120", nnum: 7, isd: true, dc: [1, 3, 7, 15, 26, 41] },
    "49": { id: 34, sid: 49, sname: "8串8", nnum: 8, isd: true, dc: [41] },
    "50": { id: 35, sid: 50, sname: "8串9", nnum: 8, isd: true, dc: [41, 48] },
    "51": { id: 36, sid: 51, sname: "8串28", nnum: 8, isd: true, dc: [26] },
    "52": { id: 37, sid: 52, sname: "8串56", nnum: 8, isd: true, dc: [15] },
    "53": { id: 38, sid: 53, sname: "8串70", nnum: 8, isd: true, dc: [7] },
    "54": { id: 39, sid: 54, sname: "8串247", nnum: 8, isd: true, dc: [1, 3, 7, 15, 26, 41, 48] }
}

// 比分的字段映射表
export const bfNameMap = {
    a10: '1:0',
    a20: '2:0',
    a21: '2:1',
    a30: '3:0',
    a31: '3:1',
    a32: '3:2',
    a40: '4:0',
    a41: '4:1',
    a42: '4:2',
    a50: '5:0',
    a51: '5:1',
    a52: '5:2',
    aother: '胜其它',
    b10: '0:1',
    b20: '0:2',
    b21: '1:2',
    b30: '0:3',
    b31: '1:3',
    b32: '2:3',
    b40: '0:4',
    b41: '1:4',
    b42: '2:4',
    b50: '0:5',
    b51: '1:5',
    b52: '2:5',
    bother: '负其它',
    c00: '0:0',
    c11: '1:1',
    c22: '2:2',
    c33: '3:3',
    cother: '平其它'
}

// 半全场字段名称映射表
export const bqcNameMap = {
    aa: '胜-胜',
    ab: '胜-负',
    ac: '胜-平',
    ba: '负-胜',
    bb: '负-负',
    bc: '负-平',
    ca: '平-胜',
    cb: '平-负',
    cc: '平-平'
}

// 进球数
export const jqsNameMap = {
    s0: '0球',
    s1: '1球',
    s2: '2球',
    s3: '3球',
    s4: '4球',
    s5: '5球',
    s6: '6球',
    s7: '7+球',
}

// 玩法的映射表
export const playTypeNameMap = {
    'spf': '让球胜平负',
    'nspf': '胜平负',
    'bf': '比分',
    'bqc': '半全场',
    'jqs': '进球数',
    'ht': '混合过关',
    'dxq':'大小球'
}

// 玩法id表
export const playTypeIDMap = {
    'spf': 269,
    'jqs': 270,
    'bf': 271,
    'bqc': 272,
    'ht': 312,
    'nspf': 354,
    'dxq':406
}

// 选项名称
export const optionNameMap = {
    bf: {
        a10: '1:0',
        a20: '2:0',
        a21: '2:1',
        a30: '3:0',
        a31: '3:1',
        a32: '3:2',
        a40: '4:0',
        a41: '4:1',
        a42: '4:2',
        a50: '5:0',
        a51: '5:1',
        a52: '5:2',
        aother: '胜其它',
        b10: '0:1',
        b20: '0:2',
        b21: '1:2',
        b30: '0:3',
        b31: '1:3',
        b32: '2:3',
        b40: '0:4',
        b41: '1:4',
        b42: '2:4',
        b50: '0:5',
        b51: '1:5',
        b52: '2:5',
        bother: '负其它',
        c00: '0:0',
        c11: '1:1',
        c22: '2:2',
        c33: '3:3',
        cother: '平其它'
    },
    spf: {
        win: '胜',
        draw: '平',
        lost: '负'
    },
    nspf: {
        win: '胜',
        draw: '平',
        lost: '负'
    },
    jqs: {
        s0: '0球',
        s1: '1球',
        s2: '2球',
        s3: '3球',
        s4: '4球',
        s5: '5球',
        s6: '6球',
        s7: '7+球',
    },
    bqc: {
        aa: '胜-胜',
        ab: '胜-负',
        ac: '胜-平',
        ba: '负-胜',
        bb: '负-负',
        bc: '负-平',
        ca: '平-胜',
        cb: '平-负',
        cc: '平-平'
    },
    dxq:{
        big:'大球',
        small:'小球'
    }
}

// 选项代码
export const optionCodeMap = {
    nspf: {
        win: 3,
        draw: 1,
        lost: 0
    },
    spf: {
        win: 3,
        draw: 1,
        lost: 0
    },
    dxq: {
        big: 1,
        small: 2
    },
    bf: {
        a10: '1:0',
        a20: '2:0',
        a21: '2:1',
        a30: '3:0',
        a31: '3:1',
        a32: '3:2',
        a40: '4:0',
        a41: '4:1',
        a42: '4:2',
        a50: '5:0',
        a51: '5:1',
        a52: '5:2',
        aother: '胜其它',
        b10: '0:1',
        b20: '0:2',
        b21: '1:2',
        b30: '0:3',
        b31: '1:3',
        b32: '2:3',
        b40: '0:4',
        b41: '1:4',
        b42: '2:4',
        b50: '0:5',
        b51: '1:5',
        b52: '2:5',
        bother: '负其它',
        c00: '0:0',
        c11: '1:1',
        c22: '2:2',
        c33: '3:3',
        cother: '平其它'
    },
    jqs: {
        s0: '0',
        s1: '1',
        s2: '2',
        s3: '3',
        s4: '4',
        s5: '5',
        s6: '6',
        s7: '7',
    },
    bqc: {
        aa: '3-3',
        ab: '3-0',
        ac: '3-1',
        ba: '0-3',
        bb: '0-0',
        bc: '0-1',
        ca: '1-3',
        cb: '1-0',
        cc: '1-1'
    }
}

export default {
    SelectTpl,
    SelectNameMap,
    AllSgMap,
    bfNameMap,
    jqsNameMap,
    playTypeNameMap,
    playTypeIDMap,
    optionNameMap,
    optionCodeMap
}

/**
 * Created by Zhangzc on 2017/12/8.
 */
import {SelectTpl} from '~common/constants'

export function mapActions (acts, ns) {
    let aTypes = {}
    let actions = {}
    Object.keys(acts).forEach((key) => {
        aTypes[key] = [ns, key].join('/')
        actions[aTypes[key]] = acts[key]
    })
    return {actions, aTypes}
}

export function mapMutations (muts, ns) {
    let mTypes = {}
    let mutations = {}
    Object.keys(muts).forEach((key) => {
        mTypes[key] = [ns, key].join('/')
        mutations[mTypes[key]] = muts[key]
    })
    return {mutations, mTypes}
}

// 初始化选项标志位
export function initSelection(data) {
    let obj = {}
    data.forEach((item) => {
        const tpl = JSON.parse(JSON.stringify(SelectTpl)) // 深复制
        obj[item.mid || item.id] = tpl
    })
    return obj
}

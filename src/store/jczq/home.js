import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'
import {initSelection} from '~common/util'

const ns = 'jczq/home'

const initState = {
    play: {
        init: {    // 初始化
            ht: null,
            nspf: null,
            spf: null,
            bf: null,
            jqs: null,
            bqc: null,
            dg: null
        },
        filter: {  // 过滤后比赛
            ht: null,
            nspf: null,
            spf: null,
            bf: null,
            jqs: null,
            bqc: null,
            dg: null
        }
    },
    selection: {},           // 选项标志列表
    filterSelection: {},     // 已选中项标志列表
    playType: null,          // 玩法类型
    selectedMatchList: [],   // 已选择比赛列表
    hasMoreStatus: {},       // 更多选择项状态标志列表
    expData: {},             // 历史战绩列表
    peilvList: {},           // 赔率列表
    filterOption: {          // 筛选配置
        filterPl: 'all',
        leagueSelection: null
    },
    outer: {                 // 弹窗组件
        component: null,
        params: null
    }
}

const actionsInfo = mapActions({
    async getPlay({state, commit, dispatch}, type) {
        if(type === 'dg') {    // 单关特殊化处理
          dispatch(aTypes.getDg)
        } else {
          try {
            const play = await ajax(`/mapi/v1/jczq/matches_${type}`)
            commit(mTypes.setPlay, {play, type})
            return play
          } catch (e) {
            console.error('the server is error:' + e.message);
          } finally {
            const play = state.play.init[type]
            const len = Object.keys(state.selection).length
            if(play && !len) {
              commit(mTypes.setSelection, initSelection(play))
            }
          }
        }
    },
    async getDg({state, commit}) {
        try {
            let data = await ajax(`/ews/jczq/data/dggp_nspf_spf`)
            data = data.map((item) => {     // 将单关数据格式处理得和其他玩法一致
                let obj = {}
                obj = Object.assign({}, item.mdata, item.cdata, item.pdata)
                obj.nspfpl = obj.nspf_pl
                obj.spfpl = obj.spf_pl
                obj.mid = obj.id
                return obj
            })
            commit(mTypes.setDg, data)
            return data
        } catch (e) {
            console.error('the server is error:' + e.message);
        } finally {
            const play = state.play.init.dg
            const len = Object.keys(state.selection).length
            if(play && !len) {
                commit(mTypes.setSelection, initSelection(play))
            }
        }
    },
    async getExpandedData({commit}, mid) {
        const expData = await ajax(`/mapi/v1/odds/zq/europe2/${mid}/end`)
        commit(mTypes.setExpandedData, {expData, mid})
        return expData
    },
    async getPeilv({commit}, mid) {            // 获取彩种赔率
        const peilv = await ajax(`/ews/jczq/data/dggp?matchesid=${mid}`)
        commit(mTypes.setPeilv, peilv)
        return peilv
    }
}, ns)

const mutationsInfo = mapMutations({
    setDialog(state, {component, params}) {
        state.outer.component = component
        state.outer.params = params
    },
    setPlay(state, {play, type}) {
        state.play.init[type] = play
        if(!state.play.filter[type]) {  // 避免请求数据覆盖筛选数据
            state.play.filter[type] = play
        }
    },
    setFilterPlay(state, {play, type}) {
        state.play.filter[type] = play
    },
    setDg(state, dg) {
        state.play.init.dg = dg
        state.play.filter.dg = dg
    },
    setExpandedData(state, {expData, mid}) {
        state.expData[mid] = expData
    },
    setPeilv(state, peilv) {
        Object.assign(state.peilvList, peilv)
    },
    setFilterOption(state, {leagueSelection, filterPl}) {
        state.filterOption.leagueSelection = leagueSelection
        state.filterOption.filterPl = filterPl
    },
    setSelection(state, selection) {
        state.selection = selection
    },
    setAsyncSelection(state, {filterMatches, type}) {    // 处理筛选赛事以后的选中状态列表
        let copyObj = {}
        const originSelection = JSON.parse(JSON.stringify(state.selection))
        state.selection = initSelection(state.play.init[type])
        filterMatches.forEach((item) => {
            copyObj[item.mid] = originSelection[item.mid]
        })
        Object.assign(state.selection, copyObj)
    },
    setFilterSelection(state, filterSelection) {
        state.filterSelection = filterSelection
    },
    setPlayType(state, playType) {
        state.playType = playType
    },
    setSelectedMatchList(state, selectedMatchList) {
        state.selectedMatchList = selectedMatchList
    },
    setHasMoreStatus(state, hasMoreStatus) {
        state.hasMoreStatus = hasMoreStatus
    },
    resetFilter(state, type) {
        const iState = JSON.parse(JSON.stringify(initState))
        state.play.filter[type] = JSON.parse(JSON.stringify(state.play.init[type]))
        state.filterOption = iState.filterOption
    },
    reset(state) {
        const iState = JSON.parse(JSON.stringify(initState))
        Object.keys(state).forEach((key) => {
            state[key] = iState[key]
        })
    }
}, ns)



const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state: JSON.parse(JSON.stringify(initState)), actions, mutations}

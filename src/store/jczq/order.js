import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'

const ns = 'jczq/order'

const initState = {
    peilvList: {}           // 赔率列表
}

const actionsInfo = mapActions({
    async getPeilv({commit}, mid) {            // 获取彩种赔率
        const peilv = await ajax(`/ews/jczq/data/dggp?matchesid=${mid}`)
        commit(mTypes.setPeilv, peilv)
        return peilv
    }
}, ns)

const mutationsInfo = mapMutations({
    setPeilv(state, peilv) {
        Object.assign(state.peilvList, peilv)
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

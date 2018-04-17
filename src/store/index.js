import Vue from 'vue'
import Vuex from 'vuex'
import jczqHome from './jczq/home'
import jczqOrder from './jczq/order'

Vue.use(Vuex)

const state = {
    agreeTime: null,  // 同意协议时间戳
    toast: {
        msg: null    // 提示信息
    },
    outer: {                 // 弹窗组件
        component: null,
        params: null
    }
}

const mutations = {
    refreshAgreeTime(state) {
        state.agreeTime = Date.now()
    },
    setDialog(state, {component, params}) {
        state.outer.component = component
        state.outer.params = params
    },
    closeDialog(state) {
        state.outer.component = null,
        state.outer.params = null
    },
    setToast(state, {msg, delay=2000}) {
        state.toast.msg = msg
        setTimeout(() => {
            state.toast.msg = ''
        }, delay)
    }
}

export function createStore() {
    return new Vuex.Store({
        state,
        mutations,
        modules: {
          jczqHome, jczqOrder
        }
    })
}

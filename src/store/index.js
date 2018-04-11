import Vue from 'vue'
import Vuex from 'vuex'
import jczqHome from './jczq/home'

Vue.use(Vuex)

const state = {
    agreeTime: null,  // 同意协议时间戳
    toast: {
        msg: null,    // 提示信息
        next: null,   // 回调函数
    }
}

const mutations = {
    refreshAgreeTime(state) {
        state.agreeTime = Date.now()
    },
    setToast(state, {msg, next}) {
        state.toast.msg = msg
        state.toast.next = next
    }
}

export function createStore() {
    return new Vuex.Store({
        state,
        mutations,
        modules: {
          jczqHome
        }
    })
}

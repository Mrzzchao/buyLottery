<template>
    <div class="l-flex-1 l-relative l-flex-column">
        <ul class="dingd-table l-full l-scroll-y" drunk-scroll>
            <li class="slide"
                v-for="item,idx in selectedMatchList">

                <div class="dingd-table-bd">
                    <div class="itm-td1" v-tap="{methods: removeItem, idx: idx}">
                        <i class="ico-del"></i>
                    </div>
                    <div class="itm-td2">
                        <div class="betbtn-3btn-m">
                            <div class="betbtn-rang"
                                 :class="{'betbtn-rang-red': item.rangqiu > 0, 'betbtn-rang-green': item.rangqiu < 0}">
                                {{(item.rangqiu > 0 ? '+' : '') + item.rangqiu}}
                            </div>
                            <span class="betbtn"
                                  v-tap="{methods: () => {selection[item.mid].spf.win = !selection[item.mid].spf.win}}"
                                  :class="{'betbtn-on': selection[item.mid].spf.win}">
                                <span class="gray" v-if="item.homestanding > 0">[{{item.homestanding}}]</span>
                                {{item.homesxname}}
                                <i>主胜{{item.spfpl.win}}</i>
                                <span v-if="item.spfpl.win < 1.6" class="ico-hot"></span>
                            </span>
                            <span class="betbtn"
                                  v-tap="{methods: () => {selection[item.mid].spf.draw = !selection[item.mid].spf.draw}}"
                                  :class="{'betbtn-on': selection[item.mid].spf.draw}">
                                VS<i>平{{item.spfpl.draw}}</i>
                            </span>
                            <span class="betbtn"
                                  v-tap="{methods: () => {selection[item.mid].spf.lost = !selection[item.mid].spf.lost}}"
                                  :class="{'betbtn-on': selection[item.mid].spf.lost}">
                                {{item.awaysxname}}
                                <span class="gray" v-if="item.awaystanding > 0">[{{item.awaystanding}}]</span>
                                <i>客胜{{item.spfpl.lost}}</i>
                                <span v-if="item.spfpl.lost < 1.6" class="ico-hot"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </li>
            <agree/>
        </ul>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~store/jczq/home'
import {SelectNameMap} from '~common/constants'
import {initSelection} from '~common/util'
import more from '~components/jczq/more.vue'
import agree from '~components/jczq/agree.vue'
export default {
    components: {
        more,
        agree
    },
    data() {
        return {
            expanded: {},                                                // 更多历史战绩
            selection: this.$store.state.jczqHome.selection,                 // 选项状态列表
            selectedMatchList: this.$store.state.jczqHome.selectedMatchList, // 已选比赛列表
            hasMoreStatus: {}                                            // 用户更多选中列表
        }
    },
    computed: {
        hasSelectList() {
            let obj = {}
            this.selectedMatchList.forEach((item) => {
                const selectObj = this.getHasSelection(this.selection[item.mid])
                if(Object.keys(selectObj).length) {
                    obj[item.mid] = selectObj
                }
            })
            return obj
        },

    },
    methods: {
        initHasMoreStatus() {       // 初始化点击更多按钮的标志位
            this.hasMoreStatus = {}
            Object.keys(this.hasSelectList).forEach((mid) => {
                this.$set(this.hasMoreStatus, mid, true)
            })
        },
        getHasSelection(selection) {
            let obj = {}
            const keys = Object.keys(selection)
            keys.forEach((key) => {
                let arr = []
                const selectItem = selection[key]
                return Object.keys(selectItem).forEach((key2) => {
                    if(selectItem[key2]) {
                        arr.push(key2)
                        obj[key] = arr
                    }
                })
            })
            return obj
        },
        openMoreSel({match}) {
            this.$store.commit('setDialog', {
                component: more,
                params: {
                    match,
                    type: 'all',
                    selection: this.selection[match.mid],
                    onConfirm: () => {
                        this.$store.commit('closeDialog')
                    },
                    onCancel: () => {
                        this.$store.commit('closeDialog')
                    }
                }
            })
        },
        clearSelectItem(mid) {
            let data = [{mid}]  // 模拟初始化数据
            let selectItem = initSelection(data)  // 初始化单项
            Object.assign(this.selection, selectItem)
        },
        removeItem({idx}) {
            this.clearSelectItem(this.selectedMatchList[idx].mid)
            this.selectedMatchList.splice(idx, 1)
        }
    },
    mounted() {
        this.initHasMoreStatus()
    },
    filters: {
        selectedFormat(selection, num) {          // 选项的字符串拼接
            if(!selection) return '点击展开投注选项'
            let str = ''
            Object.keys(selection).forEach((playType) => {
                selection[playType].forEach((type) => {
                    str += SelectNameMap[playType][type]
                    str += ';'
                })
            })
            return str
        },
        truncate(input, length, tail) {
            if(input.length <= length) {
                return input
            }
            return input.slice(0, length) + (tail || '...')
        }
    },
    watch: {
        hasSelectList() {
            this.initHasMoreStatus()
        }
    }
}
</script>

<style lang="css">
</style>

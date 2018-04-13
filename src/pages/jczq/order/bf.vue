<template>
    <div class="l-flex-1 l-relative l-flex-column">
        <ul class="dingd-table l-full l-scroll-y" style="color:#333" drunk-scroll>
            <li class="slide"
                v-for="item,idx in selectedMatchList">
                <div class="dingd-table-hd">
                    <div class="dang-mteam">
                        <span class="itm-team-l">
                            <i v-if="item.homestanding > 0">[{{item.homestanding}}]</i> {{item.homesxname}}
                        </span>
                        <span class="itm-vs">VS</span>
                        <span class="itm-team-r">
                            {{item.awaysxname}}<i v-if="item.awaystanding > 0"> [{{item.awaystanding}}]</i>
                        </span>
                    </div>
                </div>
                <div class="dingd-table-bd">
                    <div class="itm-td1" v-tap="{methods: removeItem, idx: idx}">
                        <i class="ico-del"></i>
                    </div>
                    <div class="itm-td2">
                        <div class="betbtns-wrap">
                                <span class="betbtn"
                                      :class="{'betbtn-on': hasMoreStatus[item.mid]}"
                                       v-tap="{methods: openMoreSel, match: item}">
                                    {{hasSelectList[item.mid] | selectedFormat | truncate(30)}}
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
        }
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
            this.$store.commit(mTypes.setDialog, {
                component: more,
                params: {
                    match,
                    type: 'bf',
                    selection: this.selection[match.mid],
                    onConfirm: () => {
                        this.$store.commit(mTypes.setDialog, {})
                    },
                    onCancel: () => {
                        this.$store.commit(mTypes.setDialog, {})
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
        selectedFormat(selection) {          // 选项的字符串拼接
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

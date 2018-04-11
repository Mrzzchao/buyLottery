<template v-if="ht">
    <div class="l-flex-1 l-relative l-flex-column">
        <ul class="dang-list-ul dang-list-l-b l-full l-scroll-y wrapper"  drunk-scroll="scrollEnd:moreMatches()" >
            <li class="dang-list-li" v-for="item in ht" :class="{'curlight':item.rec}">
                <expand :match="item">
                    <div class="dang-list-r">
                        <div class="dang-mteam">
                                <span class="itm-team-l">
                                    <i v-if="item.homestanding > 0">[{{item.homestanding}}]</i> {{item.homesxname}}
                                    <!--<span class="red">
                                        (+1)
                                    </span>-->
                                </span>
                            <span class="itm-vs">VS</span>
                                <span class="itm-team-r">
                                    {{item.awaysxname}}
                                    <i v-if="item.awaystanding > 0"> [{{item.awaystanding}}]</i>
                                </span>
                        </div>

                        <!--胜平负/让球-->
                        <div class="betsel-blist-wrap">
                            <div class="betbtns-wrap">
                                <!--非让球-->
                                <div class="betbtns" v-if="item.nspfpl">
                                    <div class="betbtn-rang-gray betbtn-rang">0</div>
                                    <span v-tap="{methods: () => { selection[item.mid].nspf.win = !selection[item.mid].nspf.win}}"
                                          :class="{'betbtn-on': selection[item.mid].nspf.win}">
                                        胜<i>{{item.nspfpl.win}}</i>
                                    </span>
                                    <span v-tap="{methods: () => { selection[item.mid].nspf.draw = !selection[item.mid].nspf.draw}}"
                                          :class="{'betbtn-on': selection[item.mid].nspf.draw}">
                                        平
                                        <i>{{item.nspfpl.draw}}</i>
                                    </span>
                                    <span v-tap="{methods: () => { selection[item.mid].nspf.lost = !selection[item.mid].nspf.lost}}"
                                          :class="{'betbtn-on': selection[item.mid].nspf.lost}">
                                        负<i>{{item.nspfpl.lost}}</i>
                                    </span>
                                </div>
                                <div class="betbtns" v-if="!item.nspfpl||!item.nspfpl.win">
                                    <div class="betbtn-rang-gray betbtn-rang">0</div>
                                    <span class="betbtn-none">未开售，可查看更多选项</span>
                                </div>

                                <!--让球-->
                                <div class="betbtns" v-if="item.spfpl.win">
                                    <div class="betbtn-rang"
                                         :class="{'betbtn-rang-red': item.rangqiu > 0, 'betbtn-rang-green': item.rangqiu < 0}">
                                        {{(item.rangqiu > 0 ? '+' : '') + item.rangqiu}}
                                    </div>
                                    <span v-tap="{methods: () => { selection[item.mid].spf.win = !selection[item.mid].spf.win}}"
                                          :class="{'betbtn-on': selection[item.mid].spf.win}">
                                        胜<i>{{item.spfpl.win}}</i>
                                    </span>
                                    <span v-tap="{methods: () => { selection[item.mid].spf.draw = !selection[item.mid].spf.draw}}"
                                          :class="{'betbtn-on': selection[item.mid].spf.draw}">
                                        平
                                        <i>{{item.spfpl.draw}}</i>
                                    </span>
                                    <span v-tap="{methods: () => { selection[item.mid].spf.lost = !selection[item.mid].spf.lost}}"
                                          :class="{'betbtn-on': selection[item.mid].spf.lost}">
                                        负<i>{{item.spfpl.lost}}</i>
                                    </span>
                                </div>
                                <div class="betbtns" v-if="!item.spfpl||!item.spfpl.win">
                                    <div class="betbtn-rang-gray betbtn-rang">-</div>
                                    <span class="betbtn-none">未开售，可查看更多选项</span>
                                </div>
                            </div>
                            <div :class="{'betbtn-on': hasMoreStatus[item.mid]}" class="betsel-blist-more"
                                 v-tap="{methods: openMoreSel, match: item}">
                                更多选项
                            </div>
                        </div>
                    </div>
                </expand>
            </li>
            <!-- <div class="loadingmore-wrap" v-if="matchlist.length > ht.length"
                 drunk-on="click:moreMatches()">加载中...
            </div> -->
        </ul>

        <!--foot begin-->
        <div class="ui-foot">
            <div class="ui-foot-col ui-foot-col-rb" >
                <div class="m">
                    <p>至少选择<b>2</b>场，已选<b>{{count||0}}</b>场</p>
                </div>
                <div class="r" v-tap="{methods: selectEnd}">
                    <span class="ui-foot-btn2" :class="{'btn2-off': count>15||count<2}">选好了</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~store/jczq/home'
import {initSelection} from '~common/util'
import more from '~components/more.vue'
import expand from '~components/expand.vue'
export default {
    components: {
        more,
        expand
    },
    data() {
        return {
            expanded: {},                                                       // 更多历史战绩
            selection: this.$store.state.jczqHome.selection,                        // 选项标志列表
            hasMoreStatus: {},                                                  // 用户更多选中列表
            delOption: ['spf', 'nspf']                                          // 需要去除的选项配置
        }
    },
    computed: {
        ht() {
            return this.$store.state.jczqHome.play.filter.ht
        },
        htFmt() {
            let obj = {}
            this.ht.forEach((match) => {
                obj[match.mid] = match
            })
            return obj
        },
        expData() {
            return this.$store.state.jczqHome.expData
        },
        filterSelection() {
            let obj = {}
            Object.keys(this.hasSelectList).forEach((mid) => {
                obj[mid] = this.selection[mid]
            })
            return obj
        },
        selectedMatchList() {
            let arr = []
            let selectedMidList = Object.keys(this.filterSelection)
            selectedMidList.forEach((mid) => {
                arr.push(this.htFmt[mid])
            })
            return arr
        },
        hasSelectList() {
            let obj = {}
            Object.keys(this.selection).forEach((mid) => {
                const selectObj = this.getHasSelection(this.selection[mid])
                if(Object.keys(selectObj).length) {
                    obj[mid] = selectObj
                }
            })

            return obj
        },
        count() {
            return Object.keys(this.hasSelectList).length
        }
    },
    methods: {
        initHasMoreStatus() {
            Object.keys(this.selection).forEach((mid) => {
                let hasSelect = this.getHasMoreStatus(this.selection[mid])
                this.$set(this.hasMoreStatus, mid, hasSelect)
            })
        },
        fetchExpandedData(mid) {  // 历史战绩
            this.$store.dispatch(aTypes.getExpandedData, mid)
        },
        toggleExpend({mid}) {
            this.fetchExpandedData(mid)
            this.$set(this.expanded, mid, !this.expanded[mid])
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
        getHasMoreStatus(selection) {
            const optionKeys = Object.keys(selection).filter((key) => {  // 过滤掉不要类别
                if(!this.delOption) return true
                return !(this.delOption.some((val) => {
                    return key === val
                }))
            })
            const hasSelect = optionKeys.some((key) => {
                const selectItem = selection[key]
                return Object.keys(selectItem).some((key2) => {
                    return selectItem[key2]
                })
            })
            return hasSelect
        },
        openMoreSel({match}) {
            this.$store.commit(mTypes.setDialog, {
                component: more,
                params: {
                    match,
                    type: 'ht',
                    selection: this.selection[match.mid],
                    onConfirm: (hasSelect) => {
                        this.$store.commit(mTypes.setDialog, {})
                    },
                    onCancel: () => {
                        this.$store.commit(mTypes.setDialog, {})
                    }
                }
            })
        },
        selectEnd() {
            if(this.count <= 15 && this.count >= 2) {
                this.$store.commit(mTypes.setSelection, this.selection)
                this.$store.commit(mTypes.setSelectedMatchList, this.selectedMatchList)
                this.$router.push({name: 'order-ht'})
            } else {
                return
            }
        }
    },
    mounted() {
        this.initHasMoreStatus()
    },
    destroyed() {
        this.$store.commit(mTypes.resetFilter,'ht')
    },
    watch: {
        "$store.state.home.selection": {
            handler(selection) {
                this.selection = selection
                this.initHasMoreStatus()
            },
            deep: true
        }
    }
}
</script>

<style scoped>
    .wrapper {
        padding-bottom: 4rem;
    }
</style>

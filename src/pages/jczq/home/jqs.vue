<template v-if="jqs">
    <div class="l-flex-1 l-relative l-flex-column">
        <ul class="dang-list-ul l-full l-scroll-y wrapper" drunk-scroll="scrollEnd:moreMatches()" >
            <li class="dang-list-li" v-for="item in jqs" :class="{'curligjqs':item.rec}">
                <expand :match="item">
                    <div class="dang-list-r">
                        <div class="dang-mteam">
                                <span class="itm-team-l">
                                    <i v-if="item.homestanding > 0">[{{item.homestanding}}]</i>
                                    {{item.homesxname}}
                                </span>
                            <span class="itm-vs">VS</span>
                                <span class="itm-team-r">
                                    {{item.awaysxname}}
                                    <i v-if="item.awaystanding > 0"> [{{item.awaystanding}}]</i>
                                </span>
                        </div>
                        <div class="betbtns-wrap">
                            <div class="betbtns">
                                <span :class="{'betbtn-on': selection[item.mid].jqs.s0}"
                                      v-tap="{methods: () => {selection[item.mid].jqs.s0 = !selection[item.mid].jqs.s0}}">0<i>{{item.jqspl.s0}}</i></span>
                                <span :class="{'betbtn-on': selection[item.mid].jqs.s1}"
                                      v-tap="{methods: () => {selection[item.mid].jqs.s1 = !selection[item.mid].jqs.s1}}">1<i>{{item.jqspl.s1}}</i></span>
                                <span :class="{'betbtn-on': selection[item.mid].jqs.s2}"
                                      v-tap="{methods: () => {selection[item.mid].jqs.s2 = !selection[item.mid].jqs.s2}}">2<i>{{item.jqspl.s2}}</i></span>
                                <span :class="{'betbtn-on': selection[item.mid].jqs.s3}"
                                      v-tap="{methods: () => {selection[item.mid].jqs.s3 = !selection[item.mid].jqs.s3}}">3<i>{{item.jqspl.s3}}</i></span>
                            </div>
                            <div class="betbtns">
                                <span :class="{'betbtn-on': selection[item.mid].jqs.s4}"
                                      v-tap="{methods: () => {selection[item.mid].jqs.s4 = !selection[item.mid].jqs.s4}}">4<i>{{item.jqspl.s4}}</i></span>
                                <span :class="{'betbtn-on': selection[item.mid].jqs.s5}"
                                      v-tap="{methods: () => {selection[item.mid].jqs.s5 = !selection[item.mid].jqs.s5}}">5<i>{{item.jqspl.s5}}</i></span>
                                <span :class="{'betbtn-on': selection[item.mid].jqs.s6}"
                                      v-tap="{methods: () => {selection[item.mid].jqs.s6 = !selection[item.mid].jqs.s6}}">6<i>{{item.jqspl.s6}}</i></span>
                                <span :class="{'betbtn-on': selection[item.mid].jqs.s7}"
                                      v-tap="{methods: () => {selection[item.mid].jqs.s7 = !selection[item.mid].jqs.s7}}">7+<i>{{item.jqspl.s7}}</i></span>
                            </div>
                        </div>
                    </div>
                </expand>
            </li>
            <!-- <div class="loadingmore-wrap" v-if="matchlist.length > matches.length" v-tap="{methods: moreMatches}">
                加载中...
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
import more from '~components/jczq/more.vue'
import expand from '~components/jczq/expand.vue'
export default {
    components: {
        more,
        expand
    },
    data() {
        return {
            expanded: {},                                                       // 更多历史战绩
            selection: this.$store.state.jczqHome.selection,                        // 选项标志列表
            hasMoreStatus: {}                                                   // 用户更多选中列表
        }
    },
    computed: {
        jqs() {
            return this.$store.state.jczqHome.play.filter.jqs
        },
        jqsFmt() {
            let obj = {}
            this.jqs.forEach((match) => {
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
                arr.push(this.jqsFmt[mid])
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
            this.$store.commit('setDialog', {
                component: more,
                params: {
                    match,
                    type: 'jqs',
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
        selectEnd() {
            if(this.count <= 15 && this.count >= 2) {
                this.$store.commit(mTypes.setSelection, this.selection)
                this.$store.commit(mTypes.setSelectedMatchList, this.selectedMatchList)
                this.$router.push({name: 'jczq-order-jqs'})
            } else {
                return
            }
        }
    },
    mounted() {
        this.initHasMoreStatus()
    },
    destroyed() {
        this.$store.commit(mTypes.resetFilter,'jqs')
    },
    watch: {
        "$store.state.jczqHome.selection": {
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

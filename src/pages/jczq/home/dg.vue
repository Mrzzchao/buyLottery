<template v-if="dg">
    <div class="l-flex-1 l-relative l-flex-column">
        <ul class="dang-list-ul dang-list-l-b l-full l-scroll-y" style="overflow-x: hidden">
            <li class="dang-list-li" v-for="item in dg" :class="{'curlight':item.rec}">
                <div class="dang-list-main">
                    <div class="dang-list-l"
                         v-tap="{methods: toggleExpend, mid: item.id}"
                         :class="{'dang-list-l-on': expanded[item.id]}">
                        {{item.simpleleague}}<br>{{item.matchnum}}<br>{{item.endtime.slice(-5)}} 截止
                        <i class="ico-arrow1"></i>
                    </div>
                    <div class="dang-list-r">
                        <div class="dang-mteam">
                            <span class="itm-team-l">{{item.homesxname}}</span>
                            <span class="itm-vs">VS</span>
                            <span class="itm-team-r">{{item.awaysxname}}</span>
                        </div>
                        <div class="betsel-blist-wrap">
                            <div class="betbtns-wrap">
                                <div class="betbtns" v-if="item.nspfpl.win">
                                    <div class="betbtn-rang-gray betbtn-rang">0</div>
                                        <span :class="{'betbtn-on': selection[item.id].nspf.win}"
                                              v-tap="{methods: () => {selection[item.id].nspf.win = !selection[item.id].nspf.win}}">
                                            胜<i>{{item.nspfpl.win}}</i>
                                        </span>
                                        <span :class="{'betbtn-on': selection[item.id].nspf.draw}"
                                              v-tap="{methods: () => {selection[item.id].nspf.draw = !selection[item.id].nspf.draw}}">
                                            平<i>{{item.nspfpl.draw}}</i></span>
                                        <span :class="{'betbtn-on': selection[item.id].nspf.lost}"
                                              v-tap="{methods: () => {selection[item.id].nspf.lost = !selection[item.id].nspf.lost}}">
                                            负<i>{{item.nspfpl.lost}}</i></span>
                                </div>
                                <div class="betbtns" v-if="!item.nspfpl.win">
                                    <div class="betbtn-rang-gray betbtn-rang">-</div>
                                    <span class="betbtn-none"><!--未开售胜平负单关-->未开售，可查看更多选项</span>
                                </div>

                                <div class="betbtns" v-if="item.spfpl.win">
                                    <div class="betbtn-rang"
                                         :class="{'betbtn-rang-red': item.rangqiu > 0,'betbtn-rang-green': item.rangqiu < 0}">
                                        {{(item.rangqiu > 0 ? "+" : "" ) + item.rangqiu}}
                                    </div>
                                        <span :class="{'betbtn-on': selection[item.id].spf.win}"
                                              v-tap="{methods: () => {selection[item.id].spf.win = !selection[item.id].spf.win}}">
                                            胜<i>{{item.spfpl.win}}</i>
                                        </span>
                                        <span :class="{'betbtn-on': selection[item.id].spf.draw}"
                                              v-tap="{methods: () => {selection[item.id].spf.draw = !selection[item.id].spf.draw}}">
                                            平<i>{{item.spfpl.draw}}</i></span>
                                        <span :class="{'betbtn-on': selection[item.id].spf.lost}"
                                              v-tap="{methods: () => {selection[item.id].spf.lost = !selection[item.id].spf.lost}}">
                                            负<i>{{item.spfpl.lost}}</i></span>
                                </div>
                                <div class="betbtns" v-if="!item.spfpl.win">
                                    <div class="betbtn-rang-gray betbtn-rang">-</div>
                                    <span class="betbtn-none"><!--未开售让分胜平负单关-->未开售，可查看更多选项</span>
                                </div>
                            </div>
                            <div :class="{'betbtn-on': hasMoreStatus[item.id]}" class="betsel-blist-more"
                                 v-tap="{methods: openMoreSel, match: item}">
                                更多选项
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dang-list-info" :class="{'dang-list-info-on': expanded[item.id]}">
                    <div class="dang-list-info-arrow"><i class="ico-arrow2"></i></div>
                    <div class="dang-list-info-bd">
                        <ul>
                            <li>历史交锋：{{item.count_against | formatAgainstText(item.homesxname)}}</li>
                            <li>近期战绩：主队 {{item.count_home}}；客队 {{item.count_away}}</li>
                            <li>百家平均：<span>主胜 {{item.win||'-'}}</span><span>平 {{item.draw||'-'}}</span><span>主负 {{item.lost||'-'}}</span>
                            </li>
                        </ul>
                        <!-- <div class="dang-list-info-more">
                            <a href="{{item.odds_url}}">
                                <i class="ico-detail"></i> 详细赛事分析
                            </a>
                        </div> -->
                    </div>
                </div>
            </li>
        </ul>

        <!--foot begin-->
      <div class="ui-foot">
        <div class="ui-foot-col">
          <!--<div class="l">
              <span class="ui-foot-btn1" drunk-on="goOptimize()">奖金优化</span>
          </div>-->
          <div class="m">
            <p class="ui-foot-tc">已选<b>{{count||0}}</b>场</p>

            <p class="ui-foot-tips ui-foot-tc">开奖结果不含加时赛进球</p>
          </div>
          <div class="r" v-tap="{methods: selectEnd}">
            <span class="ui-foot-btn2" :class="{'btn2-off':!count}">选好了</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~store/jczq/home'
import moreDg from '~components/jczq/moreDg.vue'
export default {
    components: {
        moreDg
    },
    data() {
        return {
            expanded: {},                                                       // 更多历史战绩
            selection: this.$store.state.jczqHome.selection,                    // 选项标志列表
            hasMoreStatus: {},                                                   // 用户更多选中状态列表
            delOption: ['spf', 'nspf']                                           // 不作为更多标红判断的选项配置
        }
    },
    computed: {
        dg() {
            return this.$store.state.jczqHome.play.filter.dg
        },
        dgFmt() {
            let obj = {}
            this.dg.forEach((match) => {
                obj[match.mid] = match
            })
            return obj
        },
        peilvList() {
            return this.$store.state.jczqHome.peilvList
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
            let obj = {}
            let selectedMidList = Object.keys(this.filterSelection)
            selectedMidList.forEach((mid) => {
                obj[mid] = this.dgFmt[mid]
            })
            return obj
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
        },
        selectionIsEmpty() {
            if(!this.selection) return false
            return Object.keys(this.selection).length > 0
        }
    },
    methods: {
        initHasMoreStatus() {
            Object.keys(this.selection).forEach((mid) => {
                let hasSelect = this.getHasMoreStatus(this.selection[mid])
                this.$set(this.hasMoreStatus, mid, hasSelect)
            })
        },
        async fetchData() {
            const data = await this.$store.dispatch(aTypes.getDg)
        },
        async fetchPeilv(mid) {  // 历史战绩
            await this.$store.dispatch(aTypes.getPeilv, mid)
        },
        toggleExpend({mid}) {
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
        async openMoreSel({match}) {
            await this.fetchPeilv(match.id)
            this.$store.commit('setDialog', {
                component: moreDg,
                params: {
                    match,
                    peilv: this.peilvList[match.id],
                    type: 'dg',
                    selection: this.selection[match.id],
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
            if(this.count >= 1) {
                this.$store.commit(mTypes.setSelection, this.selection)
                this.$store.commit(mTypes.setSelectedMatchList, this.selectedMatchList)
                this.$router.push({name: 'jczq-order-dg'})
            } else {
                return
            }
        }
    },
    mounted() {
        this.initHasMoreStatus()
    },
    destroyed() {
        this.$store.commit(mTypes.resetFilter, 'dg')
    },
    filters: {
        formatAgainstText: function (input, homename) {
            input = input.split("|");
            return "近" + input[0] + "次交战，" + homename + "  " + input[1] + "胜" + input[2] + "平" + input[3] + "负";
        }
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

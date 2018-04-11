<template v-if="nspf">
    <div class="l-flex-1 l-relative l-flex-column wrapper">
        <ul class="dang-list-ul l-full l-scroll-y wrapper" drunk-scroll="scrollEnd:moreMatches()" >
            <li class="dang-list-li" v-for="item in nspf" :class="{'curlignspf':item.rec}">
                <expand :match="item">
                    <div class="dang-list-r">
                        <div class="betbtn-3btn">
                            <span class="betbtn"
                            v-tap="{methods: () => {selection[item.mid].nspf.win = !selection[item.mid].nspf.win}}"
                            :class="{'betbtn-on': selection[item.mid].nspf.win}">
                            <span class="gray" v-if="item.homestanding > 0">[{{item.homestanding}}]</span>{{item.homesxname}}
                            <i>主胜{{item.spfpl.win}}</i>
                            <span v-if="item.spfpl.win < 1.6" class="ico-hot"></span>
                        </span>
                        <span class="betbtn"
                        v-tap="{methods: () => {selection[item.mid].nspf.draw = !selection[item.mid].nspf.draw}}"
                        :class="{'betbtn-on': selection[item.mid].nspf.draw}">
                        VS
                        <i>平{{item.spfpl.draw}}</i>
                    </span>
                    <span class="betbtn"
                    v-tap="{methods: () => {selection[item.mid].nspf.lost = !selection[item.mid].nspf.lost}}"
                    :class="{'betbtn-on': selection[item.mid].nspf.lost}">
                    {{item.awaysxname}}
                    <span class="gray" v-if="item.awaystanding > 0">[{{item.awaystanding}}]</span>
                    <i>客胜{{item.spfpl.lost}}</i>
                    <span v-if="item.spfpl.lost < 1.6" class="ico-hot"></span>
                </span>
            </div>
        </div>
                </expand>
            </li>
            <!-- <div class="loadingmore-wrap" v-if="matchlist.length > matches.length" drunk-on="click:moreMatches()">
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
            hasMoreStatus: {}                                                   // 用户更多选中列表
        }
    },
    computed: {
        nspf() {
            return this.$store.state.jczqHome.play.filter.nspf
        },
        nspfFmt() {
            let obj = {}
            this.nspf.forEach((match) => {
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
                arr.push(this.nspfFmt[mid])
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
                    type: 'nspf',
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
        selectEnd() {
            if(this.count <= 15 && this.count >= 2) {
                this.$store.commit(mTypes.setSelection, this.selection)
                this.$store.commit(mTypes.setSelectedMatchList, this.selectedMatchList)
                this.$router.push({name: 'order-nspf'})
            } else {
                return
            }
        }
    },
    mounted() {
        this.initHasMoreStatus()
    },
    destroyed() {
        this.$store.commit(mTypes.resetFilter,'nspf')
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

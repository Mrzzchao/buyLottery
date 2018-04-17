<template>
    <!--<div class="ui-alert-layer" drunk-on="touchmove:$event.preventDefault()"></div>-->

<div class="l-full l-box-center" style="z-index: 100;position: fixed">
    <div class="l-flex-column" style="width: 90%;height: 340px;background-color: white;border-radius: 5px">
        <div class="ui-filter-btit">共有<b>{{filterMatches.length}}</b>场比赛可选</div>
        <div class="l-flex-1 l-scroll-y ui-filter-bd">
            <div class="ui-filter-stit" v-if="peilvStatus[type]">赔率区间选择</div>
            <ul class="ui-filter-list1" v-if="peilvStatus[type]">
                <li :class="{on: filterPl === 'all'}"
                    v-tap="{methods: togglePl, pType: 'all'}">
                    <span>全部</span>
                </li>
                <li :class="{on: filterPl === 'lt15'}"
                    v-tap="{methods: togglePl, pType: 'lt15'}">
                    <span>1.5以下</span>
                </li>
                <li :class="{on: filterPl === 'in15to2'}"
                    v-tap="{methods: togglePl, pType: 'in15to2'}">
                    <span>1.5~2.0</span>
                </li>
                <li :class="{on: filterPl === 'gt2'}"
                    v-tap="{methods: togglePl, pType: 'gt2'}">
                    <span>2.0以上</span>
                </li>
            </ul>
            <div class="ui-filter-stit">赛事选择</div>
            <div>
                <ul class="ui-filter-list2">
                    <li v-tap="{methods: selectAll}">
                        <span>全选</span>
                    </li>
                    <li v-tap="{methods: reverse}">
                        <span>反选</span>
                    </li>
                    <li v-tap="{methods: onlyFive}">
                        <span>仅5大联赛</span>
                    </li>
                </ul>
                <ul class="ui-filter-list3" style="height: auto">
                    <li v-tap="{methods: toggleSel, leagueName}"
                        v-for="leagueName in leagueNameList"
                        :class="{on: leagueSelection[leagueName]}">
                        <span style="text-overflow:ellipsis;overflow: hidden;white-space:nowrap">{{leagueName}}</span>
                    </li>
                </ul>
            </div>

        </div>
        <div class="l-flex-row" style="height: 48px;border-top: 1px solid #ddd;">
            <div class="ui-alert-btn l-flex-1" style="display: block" v-tap="{methods: onCancel}">取消</div>
            <div class="ui-alert-btn l-flex-1" style="display: block" v-tap="{methods: onConfirm}">确定</div>
        </div>
    </div>

</div>

</template>

<script>
export default {
    props: ['params'],
    data() {
        return {
            matchlist: this.params.matchlist,                   // 赛事列表
            type: this.params.type,                             // 玩法类型
            filterPl: this.params.filterOption.filterPl,        // 赔率筛选标志
            leagueSelection: this.params.filterOption.leagueSelection,              // 联赛选中标志列表
            isInit: !(this.params.filterOption.leagueSelection),                    // 是否需要初始化
            leagueNameList: [],                                 // 联赛名字列表
            filterLeague: [],                                   // 联赛筛选列表
            filterPeilv: [],                                    // 赔率赛选列表
            filterLeagueList: {},                               // 联赛所拥有的赛事列表
            filterPeilvList: {},                                // 赔率所拥有的赛事列表
            fiveLeague: ['西甲', '意甲', '德甲', '法甲', '英超'], // 五大联赛
            peilvStatus: {                                      // 赔率筛选显示状态
                nspf: true,
                spf: true,
                bf: true,
                dqc: true,
                jqs: true,
                dg: false,
                ht: false
            }
        }
    },
    computed: {
        filterMatches() {   // 赛事筛选列表
            if(this.peilvStatus[this.type]) {
                return this.filterLeague.filter((match) => {
                    return this.filterPeilv.includes(match)
                })
            } else {
                return this.filterLeague
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            if(this.isInit) this.leagueSelection = {}
            this.matchlist.forEach((match) => {
                this.makeLeagueList(match)
                this.makePeilvList(match)
                if(this.isInit) {
                    this.$set(this.leagueSelection, match.simpleleague, true)
                }
            })
            this.doLeagueFilter()
            this.doPeilvFilter(this.filterPl)
        },
        initLeagueSel() {
            this.leagueNameList.forEach((leagueName) => {
                this.leagueSelection[leagueName] = false
            })
        },
        makePeilvList(match) {
            if(this.type === 'nspf') {
                this.type = 'spf'
            }
            const info = match[this.type + 'pl']
            if(info) {
                const minPeilv = Math.min(info.win, info.lost, info.draw)
                if(minPeilv < 1.5) {
                    if(this.filterPeilvList.lt15) {
                        this.filterPeilvList.lt15.push(match)
                    } else {
                        this.filterPeilvList.lt15 = [match]
                    }
                } else if(minPeilv <= 2) {
                    if(this.filterPeilvList.in15to2) {
                        this.filterPeilvList.in15to2.push(match)
                    } else {
                        this.filterPeilvList.in15to2 = [match]
                    }
                } else {
                    if(this.filterPeilvList.gt2) {
                        this.filterPeilvList.gt2.push(match)
                    } else {
                        this.filterPeilvList.gt2 = [match]
                    }
                }
            }
        },
        makeLeagueList(match) {
            let filterLeagueList = this.filterLeagueList
            let leagueNameList = this.leagueNameList
            let leagueSelection = this.leagueSelection

            if(!(~leagueNameList.indexOf(match.simpleleague))) {
                leagueNameList.push(match.simpleleague)
                filterLeagueList[match.simpleleague] = [match]
            } else {
                filterLeagueList[match.simpleleague].push(match)
            }
        },
        reverse() {
            this.leagueNameList.forEach((leagueName) => {
                const select = this.leagueSelection[leagueName]
                this.$set(this.leagueSelection, leagueName, !select)
            })
            this.doLeagueFilter()
        },
        selectAll() {
            this.leagueNameList.forEach((leagueName) => {
                this.$set(this.leagueSelection, leagueName, true)
            })
            this.doLeagueFilter()
        },
        onlyFive() {
            this.initLeagueSel()
            this.fiveLeague.forEach((leagueName) => {
                this.leagueSelection[leagueName] = true
            })
            this.doLeagueFilter()
        },
        onCancel() {
            typeof this.params.onCancel === 'function' && this.params.onCancel()
        },
        onConfirm() {
            typeof this.params.onConfirm === 'function' && this.params.onConfirm(this.filterMatches, this.leagueSelection, this.filterPl)
        },
        toggleSel({leagueName}) {
            this.$set(this.leagueSelection, leagueName, !(this.leagueSelection[leagueName]))
            this.doLeagueFilter()
        },
        togglePl({pType}) {
            this.filterPl = pType
        },
        doLeagueFilter() {
            let matches = []
            this.leagueNameList.forEach((leagueName) => {
                if(this.leagueSelection[leagueName]) {
                    matches = matches.concat(this.filterLeagueList[leagueName])
                }
            })
            this.filterLeague = matches
        },
        doPeilvFilter(pType) {
            if(pType === 'all') {
                const peilvMap = ['lt15', 'in15to2', 'gt2']
                Object.keys(this.filterPeilvList).forEach((type) => {
                    this.filterPeilv = this.filterPeilv.concat(this.filterPeilvList[type])
                })
            } else {
                this.filterPeilv = this.filterPeilvList[pType] || []
            }
        }
    },
    watch: {
        filterPl(filterPl) {
            if(filterPl === 'all') {
                const peilvMap = ['lt15', 'in15to2', 'gt2']
                peilvMap.forEach((type) => {
                    this.filterPeilv = this.filterPeilv.concat(this.filterPeilvList[type])
                })
            } else {
                this.filterPeilv = this.filterPeilvList[filterPl] || []
            }
        }
    }
}
</script>

<style lang="css">
</style>

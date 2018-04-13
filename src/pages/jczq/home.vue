<template>
    <div class="l-flex-column l-full">
        <header>
            <div class="ui-head-in">
                <div class="ui-head-l">
                    <a href="javascript:history.back()"><span class="ui-head-btn1">返回</span></a>
                </div>
                <div class="ui-head-m">
                    <h2 class="ui-head-tit">竞彩足球</h2>
                </div>
                <div class="ui-head-r">
                    <span class="ui-head-btn4" v-tap="{methods: showFilter}">筛选</span>
                    <router-link to="/order"><span class="ui-head-btn3">首页</span></router-link>
                </div>
            </div>
        </header>

        <div class="ui-navbox">
            <div class="ui-navbox-in">
                <ul>
                    <li :class="{select: curType === 'ht'}" v-tap="{methods: changePlayType, type: 'ht'}">混合过关</li>
                    <li :class="{select: curType === 'nspf'}" v-tap="{methods: changePlayType, type: 'nspf'}">胜平负</li>
                    <li class="ui-navbox-morebtn" :class="{select: curNav !== '更多'}" v-tap="{methods: toggleNav}">
                        {{curNav}}
                        <em class="ui-navbox-moredown" :class="{'ui-navbox-moreup': navShow}"></em>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 更多选项导航栏 -->
        <template v-if="navShow">
            <div class="ui-navbox-bg" v-tap="{methods: toggleNav}"></div>
            <div class="ui-navbox-weebox">
                <div class="ui-navbox-item">
                    <ul>
                        <li :class="{select: curType === type}" v-for="(name, type) in playTypes">
                            <a href="javascript:;" v-tap="{methods: changePlayType, type: type}">
                                <span>{{name}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </template>


        <div class="l-flex-1" v-if="Object.keys(selection).length">  <!-- 只有selection初始化后才能渲染路由组件 -->
            <router-view></router-view>
        </div>

        <!-- 弹层组件 -->
        <transition name="fade">
            <div v-if="outer.component" class="ui-alert-layer" v-tap="{methods: closeDialog}"></div>
        </transition>

        <transition name="slide">
            <div v-if="outer.component" class="l-full" style="z-index: 101">
                <component :is="outer.component" :params="outer.params"></component>
            </div>
        </transition>

    </div>
</template>

<script>
import {mTypes, aTypes} from '~store/jczq/home'
import filter from '~components/jczq/filter.vue'
export default {
    data() {
        return {
            navShow: false,
            playTypes: {
                spf: '让球胜平负',
                bf: '比分',
                jqs: '进球数',
                bqc: '半全场',
                dg: '单关'
            }
        }
    },
    computed: {
        curType() {
            return this.$route.meta.type || 'nspf'
        },
        curNav() {
            return this.playTypes[this.curType] || '更多'
        },
        outer() {
            return this.$store.state.jczqHome.outer
        },
        matchlist() {
            return this.$store.state.jczqHome.play.init[this.curType]
        },
        selection() {
            return this.$store.state.jczqHome.selection
        },
        filterOption() {
            return this.$store.state.jczqHome.filterOption
        }
    },
    methods: {
        async fetchData() {
            await this.$store.dispatch(aTypes.getPlay, this.curType)
        },
        reset() {
            this.$store.commit(mTypes.setHasMoreStatus, {})
        },
        changePlayType({type}) {
            this.navShow = false
            if(type !== this.curType) {
                this.$store.commit(mTypes.setSelection, {})  // 只有在tab切换后清空selection
                this.$router.push({name: 'jczq-home-' + type})
            }
        },
        toggleNav() {
            this.navShow = !this.navShow
        },
        closeDialog() {
            this.$store.commit(mTypes.setDialog, {})
        },
        showFilter() {
            this.$store.commit(mTypes.setDialog, {
                component: filter,
                params: {
                    matchlist: this.matchlist,
                    type: this.$route.meta.type,
                    filterOption: this.filterOption,
                    onConfirm: (filterMatches, leagueSelection, filterPl) => {
                        this.$store.commit(mTypes.setFilterOption, {leagueSelection, filterPl})                       // 设置筛选配置
                        this.$store.commit(mTypes.setFilterPlay, {play: filterMatches, type: this.$route.meta.type})  // 设置筛选后赛事
                        this.$store.commit(mTypes.setAsyncSelection, {filterMatches, type: this.$route.meta.type})    // 设置筛选后选项标志
                        this.$store.commit(mTypes.setDialog, {})
                    },
                    onCancel: () => {
                        this.$store.commit(mTypes.setDialog, {})
                    }
                }
            })
        }
    },
    mounted() {
        this.fetchData()
    },
    watch: {
        "$route.path"() {
            this.reset()
            this.fetchData()
        }
    }
}
</script>

<style scoped>
    .ui-head-in {
        position: relative;
        z-index: 98;
    }
    .slide-enter-active, .slide-leave-active {
        -webkit-transition: -webkit-transform .4s ease;
        transition: transform .4s ease;
    }

    .slide-enter-active, .slide-leave {
        -webkit-transform: translate(0, 0);
        transform: translate(0, 0);
    }

    .slide-leave-active, .slide-enter {
        -webkit-transform: translate(0, 100%);
        transform: translate(0, 100%);
    }

    .fade-enter-active, .fade-leave-active {
        -webkit-transition: all .2s ease;
        transition: all .2s ease;
    }
</style>

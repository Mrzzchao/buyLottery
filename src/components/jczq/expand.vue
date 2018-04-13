<template>
    <div>
        <div class="dang-list-main">
            <div class="dang-list-l"
            :class="{'dang-list-l-on': isExpanded}"
            v-tap="{methods: toggleExpand, mid: match.mid}">
                <div class="itm-sai">{{match.simpleleague}}</div>
                {{match.matchnum}}
                <br>{{match.ptggendtime.slice(10, -3)}} 截止
                <i class="ico-arrow1"></i>
            </div>
            <slot></slot>
        </div>
        <div class="dang-list-info" :class="{'dang-list-info-on': isExpanded}">
        <div class="dang-list-info-arrow"><i class="ico-arrow2"></i></div>
        <div class="dang-list-info-bd">
            <ul v-if="expData[match.mid]">
                <li>历史交锋：{{expData[match.mid].against||'-'}}</li>
                <li>近战战绩：主队 {{expData[match.mid].history[0]||'-'}}；客队
                    {{expData[match.mid].history[1]||'-'}}
                </li>
                <li>
                    百家平均：
                    <span>主胜{{expData[match.mid].averagepl[0]||'-'}}</span>
                    <span>平{{expData[match.mid].averagepl[1]||'-'}}</span>
                    <span>主负{{expData[match.mid].averagepl[2]||'-'}}</span>
                </li>
            </ul>
            <ul v-else>
                <li>历史交锋：加载中...</li>
                <li>近战战绩：加载中...
                </li>
                <li>
                    百家平均： 加载中...
                </li>
            </ul>
            <div class="dang-list-info-more" v-if="match.fixtureid">
                <!-- <a href="/score/index.html#/footballdetail/analysis/{{match.fixtureid}}">
                详细赛事分析
            </a> -->
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~store/jczq/home'
export default {
    props: {
        match: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isExpanded: false
        }
    },
    computed: {
        expData() {
            return this.$store.state.jczqHome.expData
        }
    },
    methods: {
        toggleExpand({mid}) {
            this.fetchExpandedData(mid)
            this.isExpanded = !this.isExpanded
        },
        fetchExpandedData(mid) {  // 历史战绩
            this.$store.dispatch(aTypes.getExpandedData, mid)
        }
    }
}
</script>

<style lang="css">
</style>

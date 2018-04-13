<template>
    <div class="">
        <div class="agree-box">
            <label id="agreechk">
                <i class="agree-box-chk" :class="{'agree-box-chk-off':!isAgree}"
                v-tap="{methods: changeAgree}"></i>
                <span class="agree-gray" style="color:#999">我已阅读并同意<span v-tap="{methods: () => {visible = true}}" class="agree-tzxy" style="color:#333">《竞猜型彩票投注须知》</span></span>
                <br/>
                <span class="agree-gray" style="color:#999">注：全场90分钟（含伤停补时，不含加时赛及点球大战），页面奖金仅供参考，实际奖金以投注成功时为准</span></label>
            </label>
        </div>
        <div class="ui-alert-layer" style="z-index: 99" v-if="visible"></div>
        <div class="ui-alert ui-alert-readme" v-if="visible">
            <div class="ui-alert-tit"> 《竞猜型彩票投注须知》</div>
            <div class="ui-alert-cont _parent">
                <span class="ui-alert-txt _child">
                    <p><strong>《竞猜型彩票投注须知》</strong></p>
                    <p><strong>一、竞猜型彩票</strong></p>
                    <p>本站所指竞猜型彩票，目前只包含体彩竞彩足球、竞彩篮球和传统足彩（含4种玩法：14场胜负、胜负任选九场、6场半全场胜负、4场进球）。</p>
                    <p><strong>二、投注限制</strong></p>
                    <p>1、数量：用户有权自由发起投注方案，每期投注方案个数不限；对投注倍数超过99倍的方案，500彩票网技术系统将自动将其拆分为多个倍数不大于99倍的方案分别投注。</p>
                    <p>2、金额：为保证投注方案订单的有效性，方案最低投注金额为2元。</p>
                    <p>3、时间：本站的投注服务时间提前于官方销售截止时间，以便有足够时间处理彩票订单。</p>
                    <p><strong>三、投注撤回</strong></p>
                    <p>1、提交后不能撤回：投注方案提交即视为投注，投注后不能自行撤回。</p>
                    <p>2、投注失败则返还：如遇投注方案部分投注失败，投注失败部分的对应的购彩资金将在开奖前解冻并自动返还至用户账户。</p>
                    <p><strong>四、投注提示</strong></p>
                    <p>1、让球：竞彩足球让球只适合“让球胜平负”玩法,“+”为客让主，“-”为主让客。</p>
                    <p>2、赛果：以半/全场45/90分钟(含伤停补时)的实际比赛结果为准，不含加时赛结果。</p>
                    <p>3、奖金：</p>
                    <p>3.1竞彩足球投注页面的固定奖金仅供参考，实际奖金以投注成功时国家体育总局彩票管理中心公布的奖金为准。投注区显示的中奖金额为每1元购彩金所对应的中奖奖金。</p>
                    <p>3.2竞彩足球完场显示的奖金仅指比赛截止投注时最终的奖金，仅供参考，兑奖奖金以方案详情中显示最终投注成功时刻的奖金为准。</p>
                    <p>3.3传统足彩的奖金以国家规定的浮动奖金及其限额为准，投注页面的奖池数据仅供参考。</p>
                    <p><strong>五、风险提示</strong></p>
                    <p>1、官方因素：</p>
                    <p>
                        1.1为了加强对竞彩游戏的销售管理，在销售过程中，根据投注额、突发事件等因素，国家体育总局体育彩票管理中心销售系统可能会拒绝某些大额投注，或者暂停或提前截止某场比赛的某些特定过关组合、特定结果选项的投注，暂停或提前截止针对某场比赛的所有投注。此种情况下，网站对暂停或提前截止销售不承担任何责任。</p>
                        <p>1.2投注限制实例：周三001 负 周三002 负 过关方式：2串1；如选择了包含该投注限制组合的方案，网站将对方案包含的特定组合做部分投注失败并解冻投注资金处理。</p>
                        <p>2、其他意外因素：</p>
                        <p>
                            2.1因官方停售、赛事调整、突然停电、网络异常、系统升级、网站投注量及产能变化等意外因素导致网站预计无法继续接受投注订单并全部投注成功的，网站有权调整投注截止时间，并对用户未投注成功的部分做投注失败并解冻投注资金处理。除此之外，网站不承担其他责任。</p>
                        </span>
                    </div>
                    <div class="ui-alert-ft">
                        <div class="ui-alert-btn" v-tap="{methods: () => {visible = false}}">我知道了</div>
                    </div>
                </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            visible: false,
            isAgree: true
        }
    },
    methods: {
        changeAgree() {
            this.isAgree = !this.isAgree
            this.$store.commit('refreshAgreeTime')
        }
    }
}
</script>

<style lang="css">
</style>

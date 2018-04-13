<template lang="html">
  <!--foot begin-->
  <div class="ui-foot ui-foot-big">
    <div class="ui-foot-col1">
      <div class="l" v-tap="{methods: showSelectedSg}">
                    <span class="ui-foot-btn3" :class="{'off':matchnum==2}">
                      {{selectedSgTypes | formatSelectSgType(sgTypeNameMap) | truncate(6)}}
                       <i class="ui-foot-arrow1" v-if="matchnum!==2"></i>
                    </span>
      </div>
      <div class="r">
        投
        <div class="ui-foot-num">
          <span class="ui-foot-num-jian" v-tap="{methods: minusBeishu}"></span>
          <input type="number" class="ui-foot-num-inp" v-model="beishu" @input="formatBeishu"/>
          <span class="ui-foot-num-jia" v-tap="{methods: addBeishu}"></span>
        </div>
        倍
      </div>
    </div>
    <div class="hb-box" v-if="accountData">余额：{{accountData.bjmoney}}元　红包：{{accountData.hbmoney}}元</div>
    <div class="ui-foot-col ui-foot-col-rb" >
      <div class="m">
        <p>投注金额 <em><b style="font-weight:bold">{{money}}元</b></em></p>

        <p>奖金范围 <em>{{award}}元</em></p>
      </div>
      <div class="r">
      </div>
    </div>
  </div>
  <!--foot end -->
</template>

<script>
    export default {
      props: ['matchnum', 'money', 'award', 'selectedSgTypes', 'sgTypeNameMap', 'accountData'],
      methods: {
        showSelectedSg() {
          this.emit('showSelectedSg')
        }
      },
      filters: {
        // 格式化选中的过关方式
        formatSelectSgType(sgTypes, sgTypeNameMap) {
          var res = [];

          sgTypes&&Object.keys(sgTypes).forEach(function (sid) {
            if (sgTypes[sid]) {
              res.push(sgTypeNameMap[sid]);
            }
          });

          return res.length?res.join(' '):"选择过关方式";
        },
        truncate(input, length, tail) {
          if(input.length <= length) {
            return input
          }
          return input.slice(0, length) + (tail || '...')
        }
      },
    }
</script>

<style lang="css">
</style>

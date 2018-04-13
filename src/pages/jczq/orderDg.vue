<template lang="html">
  <div class="l-flex-column l-full">
    <!--head begin-->
    <header id="uiHead" class="ui-head">
      <div class="ui-head-in">
        <div class="ui-head-l">
          <a v-tap="{methods: goBack}"> <span class="ui-head-btn1">返回</span></a>
        </div>
        <div class="ui-head-m">
          <h2 class="ui-head-tit">我的订单</h2>
        </div>

        <div class="ui-head-r">
          <span class="wzf">未支付订单</span>
        </div>
      </div>
    </header>
    <!--head end-->


    <transition name="fade">
      <div class="ui-alert-layer" v-tap="{methods: closeDialog}" v-if="outer.component"></div>
    </transition>
    <transition name="slide">
      <div v-if="outer.component" class="l-full" style="z-index: 101">
        <component :is="outer.component" :params="outer.params"></component>
      </div>
    </transition>

    <!-- 提示框 -->
    <template v-if="toast.msg">
      <toast :toast="toast"></toast>
    </template>

  </div>
</template>

<script>
  import constants from '~common/constants'
  import toast from '~components/toast'
  import {calculator} from '~common/calc.dg.js'
  import {mTypes, aTypes} from '~store/jczq/home'

  export default {
    components: {
      toast
    },
    data() {
      return {
        calculator: null, // 奖金计算器
        isAgree: true,    // 同意协议标志


        allInfo: {},    // 每期比赛选中配置
        beishu: {},     // 投的倍数列表
        keyboards: {},  // 键盘状态列表
        allMoney: 0,    // 订单总金额
        prize: {},      // 奖金信息
        moneyList: '-', // 投注金额列表
        awardList: '-', // 奖金范围列表

        _calcResult: null, // 计算的结果,包含注数和最大奖金最小奖金
        accountData: null, // 账户相关
        constants: {}
      }
    },
    computed: {
      toast() {
        return this.$store.state.toast
      },
      refreshAgreeTime() {
        return this.$store.state.agreeTime
      },
      peilvList() {
        return this.$store.state.jczqHome.peilvList
      },
      selectedMatchList() {
        return this.$store.state.jczqHome.selectedMatchList
      },
      selection() {
        return this.$store.state.jczqHome.selection
      },
      selectedList() { // 选中列表
        let selected = {}
        const midList = Object.keys(this.selectedMatchList)
        midList.forEach((mid) => {
          const options = this.selection[mid]
          const isSelected = Object.keys(options).some((type) => {
            const cItem = options[type]
            return Object.keys(cItem).some((ctype) => {
              return cItem[ctype]
            })

          })
          if (isSelected) {
            selected[item.mid] = JSON.parse(JSON.stringify(this.selection[item.mid])) // 深复制
          }
        })
        return selected
      },
      matchnum() {
        return Object.keys(this.selectedList).length
      },
      outer() {
        return this.$store.state.jczqHome.outer
      }
    },
    methods: {
      async fetchSelectedPeilv() {
        const midStr = Object.keys(this.selectedList).join(',')
        await this.$store.dispatch(aTypes.getPeilv, midStr)
        this.initPeilv()
      },
      goBack() {
        window.history.back()
      },
      init() {
        const keyboards = {each: false}
        const beishu = {each: 1}
        const allInfo = {}

        Object.keys(this.selectedMatchList).forEach((mid) => {
          allInfo[mid] = {};
          let select = this.selection[mid];
          Object.keys(select).forEach((pt) => {
            Object.keys(select[pt]).forEach((key) => {
              if (select[pt][key]) {
                let tmpkey = mid + '#' + pt + '#' + key;         // 比赛id 玩法 结果类别拼接唯一关键字
                allInfo[mid][tmpkey] = [pt, key, pt + '_pl'];    // 存储关键字 第一位玩法类别 第二位结果类型 第三位赔率key
                beishu[tmpkey] = this.beishu[tmpkey] || 1;       // 初始化每项的倍数
                keyboards[tmpkey] = false;                       // 初始化每项键盘状态
              }
            })
          })
        });

        this.beishu = beishu;
        this.keyboards = keyboards;
        this.allInfo = allInfo;

        this.calculator = calculator
        this.constants = constants
        console.log(constants)
      },
      initPeilv() {
        Object.keys(this.selectedMatchList).forEach((mid) => {
          match.pdata = this.peilvList[mid]
        })
      },
      calculate() {
        let ret = {};
        let peilvInfo = {};    // 赔率信息
        let ranqiuInfo = {};   // 让球信息
        let yszqInfo = {};
        let allMoney = 0;      // 订单总金额
        Object.keys(this.beishu).forEach((key) => {
            if(key !== 'each') {
                let flags = key.split('#');
                let mid = flags[0]       // 比赛id
                let playType = flags[1]  // 玩法类型
                let rtType = flags[2]    // 玩法结果类型
                console.log(constants)
                console.log('==================')
                console.log(constants.optionNameMap[playType][rtType])
                let playId = constants.playTypeIDMap[playType];                  // 玩法ID
                let optionCode = constants.optionNameMap[playType][rtType];  // 玩法结果代码
                peilvInfo[mid] || (peilvInfo[mid] = {});
                ranqiuInfo[mid] || (ranqiuInfo[mid] = this.selectedMatchList[mid].rangqiu);
                yszqInfo[mid] || (yszqInfo[mid] = this.selectedMatchList[mid].pdata.dxq_pl && this.selectedMatchList[mid].pdata.dxq_pl.yszq || 1.5);
                peilvInfo[mid][playId] || (peilvInfo[mid][playId] = {});
                peilvInfo[mid][playId][optionCode] = this.beishu[key] * 2 * this.selectedMatchList[mid].pdata[playType + '_pl'][rtType];
                allMoney += this.beishu[key] * 2;
            }
        });
        this.prize = calculator.calcAll(peilvInfo, ranqiuInfo, yszqInfo);
        this.allMoney = allMoney;
        this.peilvInfo = peilvInfo;          //获取rateList有用
      },
    },
    async mounted() {
      this.init()
      await this.fetchSelectedPeilv()
       this.calculate()
    }
  }
</script>

<style lang="css">
</style>

<template lang="html">
  <div class="l-flex-column l-full" v-if="loaded">
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

    <div class="dingd-hd">
      <div class="dingd-hd-main">
        <div class="dingd-hd-l">投注截止 {{buyendtime}}</div>
        <div class="dingd-hd-r">
          <span>每注购买</span>
          <span :class="{'inp-on':keyboards.each}"
                id="eachbuyinp" class="inp jNumkeyinp"
                v-tap="{methods: switchKeyboard, which: 'each'}">{{beishu.each}}</span>倍
        </div>
      </div>
      <keyboards @maxError="maxError" @change="change" @confirm="beishuConfirm" ky="each" :maxValue="parseInt(3000)"
                 v-if="keyboards.each"></keyboards>
    </div>

    <div class="l-flex-1 l-relative">
      <ul class="l-full l-scroll-y">
        <!--循环单体 开始-->
        <li class="dingd-list" v-for="options, mid in allInfo">
          <div class="dingd-list-hd">
            <div class="dingd-list-hd-r">{{selectedMatchList[mid] | matchdate}}</div>
            {{selectedMatchList[mid].homesxname}} VS {{selectedMatchList[mid].awaysxname}}
          </div>
          <ul class="dingd-list-ul">
            <li class="dingd-list-li jNumkeyParent jDelParent slide-left"
                v-for="option,key in options"
            >

              <div class="dingd-list-main">
                <div class="dingd-list-main-in">
                  <div class="itm-l" v-tap="{methods: del, key: key}">
                    <i class="ico-del jDel"></i>{{constants.playTypeNameMap[option[0]]}}
                  </div>
                  <div class="itm-m">
                    <div class="itm-mai">{{constants.optionNameMap[option[0]][option[1]]}}
                      <span class="red">({{selectedMatchList[mid].pdata[option[2]][option[1]]}})</span>
                    </div>
                    <div class="itm-jiang">预计奖金：
                      <span class="red">{{((selectedMatchList[mid].pdata[option[2]][option[1]])*(beishu[key])*2).toFixed(2)}}元</span>
                    </div>
                  </div>
                  <div class="itm-r">购买
                    <span
                      class="inp jNumkeyinp"
                      :class="{'inp-on':keyboards[key]}"
                      v-tap="{methods: switchKeyboard, which: key}">{{beishu[key]}}</span>倍
                  </div>
                </div>
                <keyboards @maxError="maxError" @change="change" @confirm="beishuConfirm" :ky="key"
                           :maxValue="parseInt(3000)" v-if="keyboards[key]"></keyboards>
              </div>
            </li>
          </ul>
        </li>
        <div class="dingd-add-other">
          <a href="javascript:;" v-tap="{methods: goHome}"><i class="ico-add"></i> 添加其他比赛</a>
        </div>

        <agree/>

      </ul>
    </div>

    <!--foot begin-->
    <div class="ui-foot-big ui-foot-tc">
      <div class="ui-foot-col ui-foot-col-rb">
        <!--<div class="l">
            <span class="ui-foot-btn1">发起合买</span>
        </div>-->
        <div class="m">
          <p>投注金额
            <em>
              <b>{{allMoney || '-'}}</b>元</em>
          </p>

          <p>预计奖金
            <em>{{prize.min}}-{{prize.max}}元</em>
          </p>
        </div>
        <div class="r">

            <span class="ui-foot-btn2" :class="{'ui-foot-btn2-off': !allMoney}"
                  drunk-on="click: faqiOrder()">确认购买</span>

          <!-- 添加 ui-foot-btn2-off 样式即为不可点击状态 -->
        </div>
      </div>
    </div>

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
  import agree from '~components/jczq/agree.vue'
  import keyboards from '~components/keyboard.vue'
  import {calculator} from '~common/calc.dg.js'
  import {mTypes, aTypes} from '~store/jczq/home'

  export default {
    components: {
      toast,
      agree,
      keyboards
    },
    data() {
      return {
        loaded: false,    // 数据加载完成标志
        calculator: null, // 奖金计算器
        isAgree: true,    // 同意协议标志


        allInfo: {}, // 每期比赛选中配置
        beishu: {}, // 投的倍数列表
        keyboards: {}, // 键盘状态列表
        allMoney: 0, // 订单总金额
        prize: {}, // 奖金信息
        moneyList: '-', // 投注金额列表
        awardList: '-', // 奖金范围列表
        buyendtime: '', // 投注截止时间
        accountData: null, // 账户相关
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
            selected[mid] = JSON.parse(JSON.stringify(this.selection[mid])) // 深复制
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
        this.loaded = true
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
                let tmpkey = mid + '#' + pt + '#' + key; // 比赛id 玩法 结果类别拼接唯一关键字
                allInfo[mid][tmpkey] = [pt, key, pt + '_pl']; // 存储关键字 第一位玩法类别 第二位结果类型 第三位赔率key
                beishu[tmpkey] = this.beishu[tmpkey] || 1; // 初始化每项的倍数
                keyboards[tmpkey] = false; // 初始化每项键盘状态
              }
            })
          })
        });

        this.beishu = beishu;
        this.keyboards = keyboards;
        this.allInfo = allInfo;

        this.calculator = calculator
        this.constants = constants

        this.getEndTime()
      },
      initPeilv() {
        Object.keys(this.selectedMatchList).forEach((mid) => {
          this.selectedMatchList[mid].pdata = this.peilvList[mid]
        })
      },
      calculate() {
        let ret = {};
        let peilvInfo = {};  // 赔率信息
        let ranqiuInfo = {}; // 让球信息
        let yszqInfo = {};
        let allMoney = 0;    // 订单总金额
        Object.keys(this.beishu).forEach((key) => {
          if (key !== 'each') {
            let flags = key.split('#');
            let mid = flags[0] // 比赛id
            let playType = flags[1] // 玩法类型
            let rtType = flags[2] // 玩法结果类型
            let playId = constants.playTypeIDMap[playType]; // 玩法ID
            let optionCode = constants.optionCodeMap[playType][rtType]; // 玩法结果代码
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
        this.peilvInfo = peilvInfo; //获取rateList有用
      },
      getEndTime() {
        let endtime = '99999999';
        Object.keys(this.allInfo).forEach((mid) => {
          if (endtime > this.selectedMatchList[mid].endtime) { // 取最小结束时间
            endtime = this.selectedMatchList[mid].endtime
          }
        });
        this.buyendtime = endtime.substr(11);
      },
      switchKeyboard({which}) {
        console.log(which)
        let current = this.keyboards[which];
        Object.keys(this.keyboards).forEach((mid) => { // 初始化全部为false
          this.keyboards[mid] = false;
        });
        if (!current) {
          this.keyboards[which] = true;
        }
      },
      del({key}) {
        let flags = key.split('#');
        const mid = flags[0]
        const playType = flags[1]
        const rType = flags[2]
        this.$delete(this.allInfo[mid], key)
        this.$delete(this.beishu, key)
        this.$delete(this.keyboards, key)
        this.selection[mid][playType][rType] = false;

        if (!this.checkExist(mid)) {
          this.$delete(this.allInfo, mid)
          this.getEndTime();
          this.$delete(this.selectedMatchList, mid)
          if (!Object.keys(this.selectedMatchList).length) {
            this.goHome();
          }
        }
      },
      checkExist(mid) {
        return Object.keys(this.selection[mid]).some((pt) => {
          let tmp = this.selection[mid][pt];
          return Object.keys(tmp).some((key) => {
            return tmp[key];
          });
        })
      },
      goHome() {
        window.history.back()
      },
      closeToast() {
        this.$store.commit('setToast', {})
      },
      showToast(msg) {
        this.$store.commit('setToast', {
          msg,
          next: () => {
            setTimeout(() => {
              this.closeToast()
            }, 2000)
          }
        })
      },
      maxError() {
        this.showToast('最大倍数不能超过3000')
      },
      change({value, key}) {
        this.$set(this.beishu, key, value)
        if (key !== 'each') {
          this.$set(this.beishu, 'each', '-')
        }
      },
      beishuConfirm({key}) {
        this.$set(this.keyboards, key, false)
      }
    },
    async mounted() {
      this.init()
      await this.fetchSelectedPeilv()
      this.calculate()
    },
    filters: {
      matchdate(match) {
        let tmp = match.matchdate.split('-');
        let date = new Date(tmp[0], tmp[1] - 1, tmp[2]);
        let days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        return match.matchdate + ' ' + days[date.getDay()]
      }
    },
    watch: {
      refreshAgreeTime() {
        this.isAgree = !this.isAgree
      },
      "beishu.each"(each) {
        if (each > 3000) {
          this.beishu.each = 3000;
        } else if (each && each !== '-') {
          Object.keys(this.beishu).forEach((key) => {
            this.beishu[key] = each
          })
        }
    },
      "beishu": {
          deep: true,
          handler() {
              if(this.loaded) {
                  this.calculate()
              }
          }
      }
    }
  }
</script>

<style lang="css">
</style>

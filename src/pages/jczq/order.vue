<template>
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

    <!--topbtns end-->
    <div class="ui-topbtns">
      <ul class="ui-topbtns-in">
        <li><span v-tap="{methods: goBack}"><i class="ico-add"></i>继续添加比赛</span></li>
      </ul>
    </div>
    <!--topbtns end-->

    <div class="l-flex-1 l-relative">
      <router-view></router-view>
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



    <!-- 过关方式弹层 begin -->
    <div class="ui-alert-layer" v-if="ggViewVisible"></div>
    <div class="ui-alert ui-alert-guog" v-if="ggViewVisible">
      <div class="ui-alert-tab">
        <div class="ui-alert-tabhd">
          <span :class="{on: isZiyouSelected}" v-tap="{methods: () => {isZiyouSelected = true}}">自由过关</span>
          <span :class="{on: !isZiyouSelected}" v-tap="{methods: () => {isZiyouSelected = false}}">多串过关</span>
        </div>
        <div class="ui-alert-tabbd-wrap">
          <div class="ui-alert-tabbd" :class="{hide: !isZiyouSelected}">
            <div class="ui-foot-guog _parent">
              <ul class="_child" style="overflow: hidden">
                <li :class="{on: selectedSgTypes[sgtype.sid]}"
                    v-tap="{methods: selectedSgTypesChange, sid: sgtype.sid}"
                    v-for="sgtype in allowSgTypes.ziyou">
                  <span>{{sgtype.sname}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="ui-alert-tabbd" :class="{hide: isZiyouSelected}">
            <div class="ui-foot-guog _parent">
              <ul class="_child" style="overflow: hidden">
                <li :class="{on: selectedSgTypes[sgtype.sid]}"
                    v-tap="{methods: selectedSgTypesChange, sid: sgtype.sid}"
                    v-for="sgtype in allowSgTypes.duochuan">
                  <span>{{sgtype.sname}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="ui-alert-ft">
        <div class="ui-alert-btn" v-tap="{methods: () => {ggViewVisible = false,selectedSgTypes=selectedSgTypesBak}}">取消</div>
        <div class="ui-alert-btn" v-tap="{methods: () => {ggViewVisible = false}}">确定</div>
      </div>
    </div>
    <!-- 过关方式弹层 end -->

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
  </div>
</template>

<script>
  import constants from '~common/constants'
  import toast from '~components/toast'
  import {mTypes} from '~store/jczq/home'

  export default {
    components: {
      toast
    },
    data() {
      return {
        calculator: null,       // 奖金计算器
        isAgree: true,          // 同意协议标志
        playType: '',           // 玩法类型
        playTypeName: '',       // 玩法中文名
        allowSgTypes: null,     // 允许选择的过关方式,有多串和自由过关
        ggViewVisible: false,   // 过关方式弹窗标志

        isZiyouSelected: true,  // 默认是自由过关方式

        beishu: 1,              // 投的倍数
        zhushu: 1,              // 投的注数
        money: '-',             // 投注金额
        award: '-',             // 奖金范围
        selectedSgTypes: null,  // 过关方式
        selectedSgTypesBak: null, // 过关选项备份
        selectedWithPl: null,   // 选项的赔率信息
        sgTypeNameMap: null,    // 过关方式名

        _calcResult: null,      // 计算的结果,包含注数和最大奖金最小奖金
        accountData: null,       // 账户相关
      }
    },
    computed: {
      toast() {
        return this.$store.state.toast
      },
      refreshAgreeTime() {
        return this.$store.state.agreeTime
      },
      selectedMatchList() {
        return this.$store.state.jczqHome.selectedMatchList
      },
      selection() {
        return this.$store.state.jczqHome.selection
      },
      selectedList() {     // 选中列表
        let selected = {}
        this.selectedMatchList.forEach((item) => {
          const options = this.selection[item.mid]
          const isSelected = Object.keys(options).some((type) => {
            const cItem = options[type]
            return Object.keys(cItem).some((ctype) => {
              return cItem[ctype]
            })

          })
          if(isSelected) {
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
      async init() {
        this.playType = this.$route.meta.type
        this.selectedWithPl = this._selectedWithPl()
        if (this.playType === 'ht') {
          this.calculator = (await import('~common/calc.hhgg.js')).calculator  // 动态加载所需奖金计算器
          this.allowSgTypes = this.calculator.getAllowSgTypes(this.matchnum, this._selectedWithPl())
        } else {
          this.calculator = (await import('~common/calc.js')).calculator       // 动态加载所需奖金计算器
          this.allowSgTypes = this.calculator.getAllowSgTypes(this.matchnum, this.playType)
        }
        this._resetSelectedSgType()
        this._calc()
      },
      closeDialog() {
        this.$store.commit(mTypes.setDialog, {})
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
      showSelectedSg() {
        this.ggViewVisible = true
        this.selectedSgTypesBak = JSON.parse(JSON.stringify(this.selectedSgTypes))
      },
      selectedSgTypesChange({sid}) {
        if (this.selectedSgTypes[sid]) {
          this.$set(this.selectedSgTypes, sid, false)
          this.selectedSgTypes = Object.assign({}, this.selectedSgTypes)  // 解决watch不改变的问题
        } else {
          var num = 0;
          Object.keys(this.selectedSgTypes).forEach(function (sid) {
            this[sid] && num++;
          }, this.selectedSgTypes);
          if (num === 5) {
            this.showToast('最多选5种过关方式')
          } else {
            this.$set(this.selectedSgTypes, sid, true)
            this.selectedSgTypes = Object.assign({}, this.selectedSgTypes)  // 解决watch不改变的问题
          }
        }

      },
      goBack() {
        window.history.back()
      },
      minusBeishu() {
        this.beishu--
        this.formatBeishu()
      },
      addBeishu() {
        this.beishu++
        this.formatBeishu()
      },
      formatBeishu() {
        if(this.beishu <= 0) {
          this.beishu = 1
        } else if(this.beishu > 3000) {
          this.showToast('最大倍数3000倍')
          this.beishu = 3000
        }
      },

      /**
       * 根据选择的过关类型找出默认的过关方式选项
       */
      _resetSelectedSgType() {
        let matchnum = this.matchnum
        let selectedSgTypes = {}
        let sgTypeNameMap = {}
        let selectedNnum = 0
        let selectedSid

        // 自由过关,默认选串1
        this.allowSgTypes.ziyou.forEach(function (item) {
          if (item.nnum === matchnum || selectedNnum < item.nnum) {
            selectedNnum = item.nnum
            selectedSid = item.sid
          }
          sgTypeNameMap[item.sid] = item.sname
          selectedSgTypes[item.sid] = false
        })
        selectedSid && (selectedSgTypes[selectedSid] = true)

        // 多串过关,默认都不选
        this.allowSgTypes.duochuan.forEach(function (item) {
          sgTypeNameMap[item.sid] = item.sname
          selectedSgTypes[item.sid] = false
        })


        this.selectedSgTypes = selectedSgTypes
        this.sgTypeNameMap = sgTypeNameMap
      },

      /**
       * 获取所有选中的项,并带上赔率信息
       */
      _selectedWithPl: function () {
        let result = {}
        let selected = this.selectedList
        let matchlist = this.selectedMatchList

        // 不要问我为什么,服务端输出的数据非让球胜平负的数据的字段也是spf_pl(这是共用的)
        let plName = (this.playType === 'nspf' ? 'spf' : this.playType) + 'pl'

        Object.keys(selected).forEach((mid) => {
          // 比赛的选项,有可能是全空的
          let item = selected[mid]

          // 根据比赛id找出该比赛
          let match
          matchlist.some((e) => {
            if (e.mid == mid) {
              match = e
              return true
            }
            return false
          })

          const plData = match[plName]
          if(this.playType === 'ht') {
            // 混合过关玩法
            Object.keys(item).forEach(function (playTypeName) {
              let options = item[playTypeName]
              //let plData = match[(playTypeName === 'nspf' ? 'spf' : playTypeName) + 'pl']
              let plData = match[playTypeName + 'pl']

              Object.keys(options).forEach(function (name) {
                if (options[name]) {
                  // 如果这个选项为真,记录到result表中
                  if (!result[mid]) {
                    result[mid] = {}
                  }
                  if (!result[mid][constants.playTypeIDMap[playTypeName]]) {
                    result[mid][constants.playTypeIDMap[playTypeName]] = {}
                  }

                  // 获取投注时用的选项名字,如 胜平负 分别对应 3 1 0
                  let optionName = constants.optionNameMap[playTypeName][name]

                  // 记录赔率信息
                  result[mid][constants.playTypeIDMap[playTypeName]][optionName] = Number(plData[name])
                }
              })
            })
          } else {
            Object.keys(item).forEach((playType) => {
              const options = item[playType]
              Object.keys(options).forEach((otype) => {
                if(options[otype]) {
                  // 如果这个选项为真,记录到result表中
                  if (!result[mid]) {
                    result[mid] = {}
                  }
                  // 记录赔率信息
                  result[mid][otype] = Number(plData[otype])
                }
              })
            })
          }
        })

        return result
      },

      /**
       * 计算投注注数和奖金范围
       */
      _calc() {
        let newValue = this.selectedSgTypes
        let count = 0
        let sidList = []

        // 找出所有选中的过关方式
        Object.keys(newValue).forEach(function (sid) {
          if (newValue[sid]) {
            count += 1
            sidList.push(sid)
          }
        })

        if (count === 0) {
          // 如果为选任何过关方式
          this.money = '-'
          this.award = '-'
          return
        }

        // 计算奖金范围和注数
        if (this.playType === 'ht') {
          // 混合过关
          let selectedWithPl = this.selectedWithPl
          let rangqiuInfo = {},yszqInfo={}

          this.selectedMatchList.forEach(function (match) {
            if (selectedWithPl[match.mid]) {
              rangqiuInfo[match.mid] = match.rangqiu
              yszqInfo[match.mid] = match.yszq
            }
          })
          this._calcResult = this.calculator.calc(this.selectedWithPl, rangqiuInfo,yszqInfo, sidList)
        }
        else {
          // 其他玩法
          this._calcResult = this.calculator.calc(this.selectedWithPl, sidList)
        }

        this._calcByResult()
      },

      _calcByResult: function () {
        let result = this._calcResult
        let beishu = this.beishu
        this.money = result.zhushu * 2 * beishu
        this.award = (result.minP * beishu * 2).toFixed(2) + '-' + (result.maxP * beishu * 2).toFixed(2)
      },
    },
    mounted() {
      this.init()
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
    watch: {
      refreshAgreeTime() {
        this.isAgree = !this.isAgree
      },
      selectedList(newVal, oldVal) {
        if (oldVal) {//不是初始化的时候调用

          // 筛选出所有选中的选项,然后计算选中的比赛场次
          var selectedWithPl = this._selectedWithPl();
          var matchnum = Object.keys(selectedWithPl).length;
          this.selectedWithPl = selectedWithPl;

          //处理非混合过关begin
          if (matchnum === this.matchnum) {
            // 如果场次没有变,可能是某场比赛多选或取消选中了某一项,
            // 再次计算奖金范围
            if (this.playType !== "ht") {
              if (this.selectedSgTypes) {
                this._calc();
              }
              return;
            }
          } else {
            // 如果场次改变了,直接赋值,会在matchnum的watcher中再次计算奖金范围和注数
            this.matchnum = matchnum;
            if (this.matchnum < 2) {
              // 比赛场次小于2
              this.selectedSgTypes = {};
              this._calcResult = {zhushu: 0, maxP: 0, minP: 0};
              return this.allowSgTypes = {ziyou: [], duochuan: []};
            }
            if (this.playType !== "ht") {
              this.allowSgTypes = this.calculator.getAllowSgTypes(matchnum, this.playType);
              this._resetSelectedSgType();
              return;
            }

          }
          //处理非混合过关 end

          //处理混合过关begin
          if (this.playType === "ht") {
            this.allowSgTypes = this.calculator.getAllowSgTypes(matchnum, selectedWithPl);
            this._resetSelectedSgType();//todo 到底需不需要reset， 需要上面返回的结果进行经一部判断

          }
          //处理混合过关end
        }
      },
      selectedMatchList() {
        this.init()
      },
      selectedSgTypes() {
        this._calc()
      },
      beishu(nV, oV) {
        if(isNum(nV)) {
          if(nV > 3000) {
            this.showToast('最大倍数3000倍')
            this.beishu = 3000
          } else {
            this._calc()
          }
        }

        //判断是否是正整数
        function isNum(s) {
          s = s.toString()
          if(s!=null){
            var r,re;
            re = /\d*/i; //\d表示数字,*表示匹配多个数字
            r = s.match(re);
            return (r==s)?true:false;
          }
          return false;
        }
      }
    }
  }
</script>

<style lang="css">
</style>

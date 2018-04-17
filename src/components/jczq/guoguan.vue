<template>
    <!-- 过关方式弹层 begin -->
    <div class="ui-alert ui-alert-guog">
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
        <div class="ui-alert-btn" v-tap="{methods: cancel}">取消</div>
        <div class="ui-alert-btn" v-tap="{methods: confirm}">确定</div>
      </div>
    </div>
    <!-- 过关方式弹层 end -->

</template>

<script>
export default {
    props: ['params'],
    data() {
        return {
            allowSgTypes: this.params.allowSgTypes,          // 允许选择的过关方式,有多串和自由过关
            sgTypeNameMap: this.params.sgTypeNameMap,        // 过关方式名
            selectedSgTypes: this.params.selectedSgTypes,    // 选中过关方式
            isZiyouSelected: true,                           // 默认是自由过关方式
            selectedSgTypesBak: null,                        // 过关选项备份
        }
    },
    methods: {
        init() {
            this.selectedSgTypesBak = JSON.parse(JSON.stringify(this.selectedSgTypes))
        },
        cancel() {
            typeof this.params.onCancel === 'function' && this.params.onCancel(this.selectedSgTypesBak)
        },
        confirm() {
            typeof this.params.onConfirm === 'function' && this.params.onConfirm(this.selectedSgTypes)
        },
        showToast(msg) {
          this.$store.commit('setToast', {msg}) // 默认2000毫秒
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
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="css">
</style>

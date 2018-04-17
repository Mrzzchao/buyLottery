<template>
<div class='ui-keyboard-parent' v-if="visible">
    <div class='ui-keyboard-arrow-wrap'>
        <i class='ui-keyboard-arrow'></i>
    </div>

    <div class='ui-keyboard-row ui-keyboard-row1'>
        <div class='ui-keyboard-num' v-for="n in [1,2,3,4,5,6]">
                <i @mousedown="checked[n] = true;"
                   @mouseup="checked[n] = false, add(n);"
                   @touchstart.prevent="checked[n] = true"
                   @touchend.prevent="checked[n] = false, add(n)"
                   :class="{'ui-keyboard-on': checked[n]}">{{n}}</i>
            <span :style="checked[n] ?'display: inline' : 'display: none'">{{n}}</span>
        </div>
    </div>

    <div class='ui-keyboard-row ui-keyboard-row2'>

        <div class='ui-keyboard-num' v-for="n in [7,8,9,0]">
                <i @mousedown="checked[n] = true;"
                   @mouseup="checked[n] = false, add(n);"
                   @touchstart.prevent="checked[n] = true"
                   @touchend.prevent="checked[n] = false, add(n)"
                   :class="{'ui-keyboard-on': checked[n]}">{{n}}</i>
            <span :style="checked[n] ?'display: inline' : 'display: none'">{{n}}</span>
        </div>

        <div class='ui-keyboard-back'>
               <i @mousedown="backChecked = true;"
                  @mouseup="backChecked = false, del();"
                  @touchstart.prevent="backChecked = true"
                  @touchend.prevent="backChecked = false, del()"
                  :class="{'ui-keyboard-on': backChecked}"></i>
        </div>
        <div class='ui-keyboard-done'>
               <i @mousedown="confirmChecked = true;"
                  @mouseup="confirmChecked = false, visible = false; confirm()"
                  @touchstart.prevent="confirmChecked = true"
                  @touchend.prevent="confirmChecked = false, visible = false; confirm()"
                  :class="{'ui-keyboard-on': confirmChecked}">确认</i>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ["ky", "maxValue"],
    data() {
        return {
            visible: true,        // 展现标志
            value: '',            // 数值
            _init : true,         // 初始化标志
            minValue:1,           // 最小值
            // maxValue:3000,        // 最大值

            backChecked: false,        // 删除标志
            confirmChecked: false,     // 确认标志
            checked: {}                // 数字标志
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let checked = {}
            if(this.visible){
               this._init = true;
            } else{
                if(!this.value||(this.value<<0)<this.minValue){
                    this.value = this.minValue;
                }
            }

            for (let i = 0; i < 10; i++) {
                 checked[i] = false;
            }
            this.checked = checked;
        },
        add(num) {
            let value = this.value + '';
            if (this.value === '0'||this._init) {
                value = num + '';
                this._init&&(this._init=false);
            }
            else {
                value += num;
            }
            if(this.maxValue!=99999999){
                if(parseInt(value)>this.maxValue){
                    this.value = this.maxValue;
                    this.$emit("maxError", value);
                }else{
                    this.value = value;
                    this.$emit("change", {value: this.value, key: this.ky});
                }
            }else{
                if(parseInt(value)>this.maxValue){
                    this.$emit("maxError", value);
                }else{
                    this.value = value;
                    this.$emit("change", {value: this.value, key: this.ky});
                }
            }
        },
        del() {
            this.value = this.value + '';
            this.value = this.value.slice(0, this.value.length - 1);
            this.$emit("change", {value: this.value, key: this.ky});
        },
        confirm() {
            this.$emit("confirm", {key: this.ky})
        }
    },
    watch: {
        visible(visible) {
            if(visible){
               this._init = true;
            }else{
                if(!this.value||(this.value<<0)<this.minValue){
                    this.value = this.minValue;
                }
            }
        }
    }
}
</script>

<style>
/*虚拟数字键盘*/
.ui-keyboard-wrap {display:block;position:relative;top:-8px;-webkit-user-select:none;}
.ui-keyboard-arrow-wrap {position:relative;height:6px;}
.ui-keyboard-arrow {position:absolute;top:0;right:54px;display:inline-block;overflow:hidden;width:0;height:0;border-width:0 6px 6px;border-style:dashed dashed solid;border-color:transparent transparent #5D5F6B;}
.ui-keyboard-row {display:-webkit-box;background:#5D5F6B;}
.ui-keyboard-row div  {position:relative;-webkit-box-flex:1;width:1px;border-right:1px solid #696B77;border-bottom:1px solid #696B77;height:45px;text-align: center;}
.ui-keyboard-row i {display:block;width:100%;height:100%;line-height:45px;border:0 none;outline:0;font-size:18px;font-style:normal;color:#d5d6e1;background:transparent;}
.ui-keyboard-row div:last-child {border-right:0;}
.ui-keyboard-row:nth-child(3) div {border-bottom:0 none;}
.ui-keyboard-done i {display:block;font-size:14px;}
.ui-keyboard-num span {display:none;z-index:2;position:absolute;top:-52px;left:0;width:100%;height:50px;line-height:50px;font-weight:bold;font-size:30px;text-align:center;color:#000;background:#FFF;border:1px solid #999;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 0 6px rgba(0,0,0,.3);box-shadow:0 0 6px rgba(0,0,0,.3);border-radius:4px;}
.ui-keyboard-row2 span {margin-top:-46px;}
i.ui-keyboard-on {color:#FFF;background-color:#333!important;}
.ui-keyboard-off {color:#CCC;}
.ui-keyboard-back i {display:block;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgBAMAAACm+uYvAAAAFVBMVEUAAADV1uHV1uHV1uHV1uHV1uHV1uHtoY+nAAAABnRSTlMAgNQVahYHXc4qAAAAk0lEQVQoz4WTMQ6AIAxFMeju5AE0YTbqAUw8iQ7c/wgWP9Doj2mHDrw8KKW4HE38RAEDgSL07hWxCKdjAIEBCwAsAFSBgQrHk7cMVGivWbIPO4AKXZgkL4IBioA1LxRAS0qLCQJAqMoqDABCVUYRACBUJUL4AcZWfLhZLl/Qagk30Wi7KvbT2sPAij1wrJhDzd/gBhxXQHtL0cdkAAAAAElFTkSuQmCC) no-repeat center center;background-size:24px 16px;}
.ui-keyboard-alert {display:none;opacity:0;position:fixed;z-index:999;top:40%;left:50%;margin:29px 0 0 -82px;width:164px;height:58px;line-height:58px;text-align:center;font-size:14px;color:#FFF;background:rgba(0,0,0,.8);border-radius:3px;}
.ui-keyboard-inp {margin-bottom:10px;width:64px;height:35px;line-height:35px;text-align:center;font-size:12px;color:#333;border:1px solid #C8C7CC;background:#FFF;border-radius:3px;}
.ui-keyboard-inpon {background:#FFF;border:1px solid #999;}
</style>

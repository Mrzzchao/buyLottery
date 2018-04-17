<template>
    <div>
        <router-view></router-view>

        <!-- 提示框 -->
        <template v-if="toast.msg">
           <toast :toast="toast"></toast>
        </template>

        <transition name="fade">
            <div v-if="outer.component" class="ui-alert-layer" v-tap="{methods: closeDialog}"></div>
        </transition>

        <!-- 弹层组件 -->
        <transition name="slide">
            <div v-if="outer.component" class="l-full" style="z-index: 101">
                <component :is="outer.component" :params="outer.params"></component>
            </div>
        </transition>
    </div>
</template>

<script>
  import toast from '~components/toast'
    export default {
        components: {
            toast
        },
        computed: {
            toast() {
                return this.$store.state.toast
            },
            outer() {
                return this.$store.state.outer
            }
        },
        methods: {
            closeDialog() {
                this.$store.commit('closeDialog')
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

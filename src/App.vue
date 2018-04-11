<template>
  <div id="app" class="l-flex-column">
    <div class="l-flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    import '~assets/style/base.css'
    import '~assets/style/public/reset.css'
    import '~assets/style/index.css'
    import Vue from 'vue'
    import vueTap from 'v-tap'
    Vue.use(vueTap)

    export default {
    }
</script>

<style scoped>
</style>

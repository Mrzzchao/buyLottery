<template>
    <section style="white-space:nowrap;-webkit-transform: translateX(-50%);border-radius: 3px;padding: .4rem 1.4rem;transform: translateX(-50%);background-color: rgba(0,0,0,.7);color:white;font-size:16px;position: fixed;z-index: 200;top:50%;left:50%;text-align: center">
        <section style="padding: .2rem">{{toast.msg}}</section>
    </section>
</template>

<script>
export default {
    props: ["toast"],
    mounted() {
    }
}
</script>

<style lang="css">
</style>

<template>
  <div id="app">
    <router-view></router-view>
    <footer-guide v-show="$route.meta.isShow"></footer-guide>
  </div>
</template>

<script>
  import footerGuide from './components/FooterGuide/FooterGuide'
    export default {
      name: "app",
      components:{
        footerGuide
      },
      mounted() {
        //异步获取用户位置信息
        this.$store.dispatch('getAddress')
        //异步获取当前用户信息
        this.$store.dispatch('getUser')
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">

</style>

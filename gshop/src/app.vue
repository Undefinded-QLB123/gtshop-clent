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
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">

</style>

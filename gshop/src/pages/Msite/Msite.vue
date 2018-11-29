<template>
  <div>
    <section class="msite">
      <!--首页头部-->
      <top-heard :title="address.name" header_title="header_title_msite">
      <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
      </top-heard>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="categorys.length>0">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(c,index) in categorys" :key="index">
                <div class="food_container">
                  <img :src="'https://fuss10.elemecdn.com'+c.image_url">
                </div>
                <span>{{c.title}}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </nav>
      <!--首页附近商家-->
      <ShopList></ShopList>
    </section>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.min.css'
  import swiper from 'swiper'
  import topHeard from '../../components/TopHeard/TopHeard'
  import ShopList from '../../components/ShopList/ShopList'
  import {mapState} from 'vuex'
    export default {
      name: "Msite",
      components:{
        topHeard,
        ShopList
      },
      computed:{
        ...mapState(['address','categorys']),
        categorysArr(){
          const {categorys} = this;
          const bigArr = [];
          let smallArr = [];
          categorys.forEach((t)=>{
            if (smallArr.length===0){
              bigArr.push(smallArr)
            }
            smallArr.push(t);
            if (smallArr.length >= 8) {
              smallArr=[]
            }
          })
          return bigArr
        }
      },
      mounted() {
        this.$store.dispatch('getShop');
        this.$store.dispatch('getCategorys')
      },
      watch:{
        categorys(){
          this.$nextTick(()=>{
            new swiper('.swiper-container',{
              loop:true,
              pagination: {
                el: '.swiper-pagination',
              },
            })
          })
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>

<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button
                :disabled="!isRightPhone||computeTime>0" class="get_verification" :class="{right_phone_number:isRightPhone}" @click.prevent="sendCode">{{computeTime>0?`已发送（${computeTime}s）`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" v-model="pwd" placeholder="密码" :type="flagClose?'text':'password'">
                <div class="switch_button"  @click="onOff" :class="{on:flagClose}">
                  <div class="switch_circle" :class="{right:flagClose}"></div>
                  <span class="switch_text">{{textContent}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img ref="captcha" class="get_verification" src="http://localhost:5000/captcha" alt="captcha" @click="updateCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
  import {reqSendCode,reqSmsLogin,reqPwdLogin} from '../../api'
  import {Toast,MessageBox} from 'mint-ui'
  export default {
      name: "Login",
      data(){
        return{
          loginWay:true,    //登录方式
          computeTime:0,    //计时器
          textContent:'',   //开关显示内容
          flagClose:false,  //密码显示开关
          name:'',      //手机/邮箱/用户名
          pwd:'',       //登录密码
          captcha:'',   //图形验证码
          code:'',      //短信验证码
          phone:''      //手机号码
        }
      },
      computed:{
        isRightPhone(){
          return /0?(13|14|15|18|17)[0-9]{9}/.test(this.phone)
        }
      },
      methods:{
        async sendCode(){
          this.computeTime = 30;
          const IntervalId = setInterval(()=>{
            this.computeTime--;
            if (this.computeTime<=0){
              clearInterval(IntervalId)
            }
          },1000);
          const result = await reqSendCode(this.phone);
          console.log(result);
          if (result===0){
            Toast('验证码已发送');
          }else {
            this.computeTime=0;
            MessageBox.alert('发送验证码失败')
          }
        },
        onOff(){
          this.flagClose = !this.flagClose;
          if(this.flagClose){
            this.textContent = 'abc'
          }else{
            this.textContent = ''
          }
        },
        updateCaptcha(){
          this.$refs.captcha.src='http://localhost:5000/captcha?time='+Date.now()
        },
        async login(){
          const {name,pwd,captcha,phone,code,loginWay,isRightPhone} = this;
          //手机登录方式
          let result;
          if(loginWay){//短信
            if (!isRightPhone){
              return MessageBox.alert('手机号不正确')
            }else if (!/^\d{6}$/.test(code)) {
              return MessageBox.alert('验证码必须是6位数字')
            }
            //手机登录成功发送登录请求
            result = await reqSmsLogin(phone,code)
            if (result!==0){//请求失败
              this.computeTime=0;
            }
          }else{//账号登录
            if (!name){
              return MessageBox.alert('用户名必须指定')
            }else if(!pwd){
              return MessageBox.alert('密码必须指定')
            }else if(captcha.length!==4){
              return MessageBox.alert('验证码必须是4位')
            }
            //向后台发送登录请求
            result = reqPwdLogin({name, pwd, captcha})
            if (result!==0){
              this.updateCaptcha()//更新验证码
            }
          }
          if (result.code===0){//返回登录成功信息
            const user = result.data;
            //1.保存登录成功的用户数据
            this.$store.dispatch('saveUser',user);
            //2.登录成功后跳转到个人主页
            this.$router.replace('./profile')
          }else {
            MessageBox.alert('登录请求失败')
          }
        },

      }
    }
</script>

<style scoped lang="stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>

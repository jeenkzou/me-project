<template>
  <div class="login-wrapper">
    <div class="login-container">
      <header>
        <img src="@/assets/icon_logo.png" alt="logo" width='44'>
        <strong class='title'>土地实时监管运作平台</strong>
      </header>
      <section>
          <div class="flex-j-aro margin-b-base">
            <i class="meiconfont meicon-yhm"></i>
            <me-input placeholder='用户名' style='width:360px' v-model='formInfo.account'></me-input>
          </div>
          <div class="flex-j-aro margin-b-base">
            <i class="meiconfont meicon-mima"></i>
            <me-input placeholder='密码' style='width:360px;' type='password' v-model='formInfo.password' :max-length='16'></me-input>
          </div>
          <div class="flex-j-aro" style='margin-bottom:60px;margin-left:40px;align-items:center;'>
            <me-input placeholder='验证码' style='width:150px;' v-model='formInfo.code' :max-length='4'></me-input>
            <img src="@/assets/verify.png" alt="" width='125'>
            <span class="me-a">换一张</span>
          </div>

          <footer>
            <me-button :loading='loadingShow' size='large' style='width:360px;margin-left:40px;' @click='login'>登&nbsp;录</me-button>
          </footer>
      </section>
    </div>
  </div>
</template>

<script>
import "./login.less";
export default {
  name: "login",
  data() {
    return {
      loadingShow:false,
      formInfo:{
        account:'',
        password:'',
        code:''
      }
    };
  },
  computed:{
    disLogin(){
      let valid = true;
      for(var item in this.formInfo){
        if(!this.formInfo[item]){
          valid = false;
        }
      }
      return !valid;
    }
  },
  methods:{
    login(){
      if(this.disLogin){
        this.$toast.warning('请填写信息');
        return;
      }
      this.loadingShow = true;
      setTimeout(() => {
        this.loadingShow = false;
        this.$toast.error('用户名或者密码错误')
      }, 2000);
    }
  }
};
</script>
<template>
  <div class="about width-limit">
    <h1>请求测试</h1>
    <me-button class="margin-r-base" @click="request('get')">get请求</me-button>
    <me-button class="margin-r-base" @click="request('post')">post请求</me-button>
    <me-button class="margin-r-base" @click="request('put')">put请求</me-button>
    <me-button @click="request('delete')">delete请求</me-button>
  </div>
</template>

<script>
import userApi from '../plugins/api/user.api';//按需引入
export default {
  name: "About",
  methods: {
    async request(method) {
      switch (method) {
        case "get": {
          // 按需引入方式，async await方式
          const {err,data} = await userApi.getOrder({ id: 1 });
          if(!err){
            console.log(data)
          }
          break;
        }
        case "post": {
          //promise方式
          userApi.login({account:'17725003536',password: "123456",kaptcha:'de56' })
            .then(({err,data})=>{
              if(err) throw err;
              console.log(data);
            });
          break;
        }
        case "put": {
          //全局引入方式
          this.$api.user.updateOrder({ id:1,count:2 });
          break;
        }
        case "delete": {
          this.$api.user.deleteOrder({ id:1 });
        }
      }
    }
  }
};
</script>

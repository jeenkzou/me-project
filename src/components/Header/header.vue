<template>
  <header class="header-wrapper">
      <section class='header-body'>
          <div class="body-left">
              <!-- logo -->
            <img class='logo' src="@/assets/logo.png" alt="logo">
          </div>
          <div class="body-right">
            <!-- 菜单列表 -->
            <ul class="menu-box">
                <li
                    v-for="item in menus"
                    :key='item.id'
                    :class="{'active':$route.name==item.routeName}"
                    @click='handleMenuClick(item)'
                >{{item.name}}</li>
            </ul>
            <!-- 用户信息 -->
            <div class="user-info">
                <span class='line'></span>
                <span class="meiconfont meicon-yonghu font-s-lg"></span>
                <span class="department">{{userinfo.department}}</span>
                <span class="meiconfont meicon-xiala"></span>
                <span class="account">{{userinfo.account}}</span>
            </div>
          </div>
          
      </section>
  </header>
</template>

<script>
import './header.less';
export default {
    data(){
        return {
            menus:[
                {id:1,name:'项目总览',routeName:'projects'},
                {id:2,name:'业务审批',routeName:'bussiness'},
                {id:3,name:'任务考核',routeName:'tasks'},
                {id:4,name:'诚信体系',routeName:'credits'},
            ],
            userinfo:{
                account:'admin',
                department:'土地事务科'
            }
        }
    },
    methods:{
        handleMenuClick(item){
            this.$router.push({name:item.routeName})
        }
    }
}
</script>

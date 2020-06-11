<template>
  <div class="main-wrapper">
      <my-header></my-header>
      <section class='main-body'>
        <aside class='main-left'>
          <ul>
            <router-link v-for="item in asides" :key='item.id':to='{name:item.routeName}'>
              <li :class="{active:item.routeName==$route.name}">
                <p><i class="meiconfont" :class="['meicon-'+item.icon]"></i></p>
                <p>{{item.menuName}}</p>
              </li>
            </router-link>
          </ul>
        </aside>
        <section class='main-right'>
          <router-view></router-view>
        </section>
      </section>
      <!-- <my-footer></my-footer> -->
  </div>
</template>

<script>
import './main.less';
import myFooter from '@/components/Footer/footer.vue';
import myHeader from '@/components/Header/header.vue';
export default {
  components:{
    myFooter,
    myHeader
  },
  data(){
    return {
      asides:[
        {id:1,menuName:'项目查询',icon:'project',routeName:'projects'},
        {id:2,menuName:'违约项目',icon:'weiyue',routeName:'weiyue'},
        {id:3,menuName:'闲置项目',icon:'xianzhi',routeName:'xianzhi'},
      ]
    }
  }
}
</script>
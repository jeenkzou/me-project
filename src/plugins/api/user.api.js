// 引入全局请求方法
import {urlHandler} from './urlHandler';

const urls = [
  { 
    name: 'login', //函数名称
    url: '/auth/login', //请求地址
    method:'post',
    gateway: 'auth', //请求网关服务
    way: 'post', //请求处理方式，post为实体方式，get为序列化方式,
  },
  { 
    name: 'getOrder', 
    url: '/out/order/page', 
    method: 'get',
    gateway: 'auth',
    way: 'get',
  },
  { 
    name: 'updateOrder', 
    url: '/out/order/update', 
    method: 'put', 
    gateway: 'auth',
    way: 'post' 
  },
  { 
    name: 'deleteOrder', 
    url:({id})=>{
      return '/out/order/delete/'+id
    }, 
    method: 'delete', 
    gateway: 'auth',
    way: 'get' 
  },
]

export default urlHandler(urls);

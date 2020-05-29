// 引入全局请求方法
import {joinParams,COM_SERVICE} from './request';
const {get,post} = COM_SERVICE;

//登录
export const login = async function(params){
  let data = {},err = '';
  try{
    data = await post('/auth/login',params,'auth')
  }catch(e){
    err = e
  }
  return {err:err,data:data}
}

//注册
export const registe = async function(params){
  let data = {},err = '';
  try{
    data = await post('/out/customer/register',params,'auth')
  }catch(e){
    err = e
  }
  return {err:err,data:data}
}



export const empty = (value)=>{
  value = value || ''
  if(!value.trim()) return '必填项，请输入'
  return ''
}
export const space = (value)=>{
  value = value || ''
  if(value.indexOf(' ')>=0) 
     return '输入数据含有空格'
  else {
      return ''
  }
}
// 描述验证
export const description = (value)=>{
  // 镜像
  if(!value){
      return '请输入镜像描述'
  }else if(value.length > 255){
      return '最多输入255个字符'
  }else{
      return ''
  }
}
// 密码验证
export const password = (value,required)=>{
  value = value || ''
  if(value.indexOf(' ')>=0) return '输入数据含有空格'
  if(!value.trim() && required) return '必填项，请输入'
  let nReg = /[\d]/,uReg = /[A-Z]/,lReg = /[a-z]/
  let isTrue = true,num = 0
  if(value.length<6 || value.length>20) isTrue = false
  if(value.indexOf(' ')>=0) return '输入数据含有空格'
  if(nReg.test(value)) num++
  if(uReg.test(value)) num++
  if(lReg.test(value)) num++
  if(num<2) isTrue = false
    if(!isTrue){
        return '6-20位数字/大写字母/小写字母中的2种'
    }else{
        return ''
    }
}
// 密码验证
export const username = (value,required)=>{
  value = value || '';
  if(value.indexOf(' ')>=0) return '输入数据含有空格';
  if(!value.trim() && required) return '必填项，请输入';
  if(value.length<6 || value.length>20) return '限6-20个字符';
  if(value.indexOf(' ')>=0) return '输入数据含有空格';
  let reg=/^[0-9a-zA-Z]+$/;
  if(!reg.test(value)){
      return '只能输入英文或数字';
  }else{
      return '';
  }
}
// 邮箱验证
export const email = (value)=>{
  value = value || ''
  if(value.indexOf(' ')>=0) return '输入数据含有空格'
  if(!value) return ''
  if(value.length>30) return '邮箱长度不能大于30个字符'
  let emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  if(!emailReg.test(value)){
      return '请输入正确格式的邮箱'
  }else{
      return ''
  }
}
// 身份证验证
export const cardId = (value)=>{
  value = value || ''
  if(value.indexOf(' ')>=0) return '输入数据含有空格'
  if(!value) return ''
  let cardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if(!cardReg.test(value)){
      return '请输入正确格式的身份证号'
  }else{
      return ''
  }
}
// 手机号码验证
export const telphone = (value)=>{
  value = value || ''
  if(value.indexOf(' ')>=0) return '输入数据含有空格'
 if(!value) return ''
  let telReg = /^1\d{10}$/
  if(!telReg.test(value)){
      return '请输入正确格式的手机号'
  }else{
      return ''
  }
}
//  验证课时（整数验证）
export const integer = (value)=>{
  if(!Number.isInteger(value)){
      return '请输入整数'
  }else{
      return ''
  }
}
// 名字验证
export const name = (value,required)=>{
  value = value || ''
  if(value.indexOf(' ')>=0) return '输入数据含有空格'
  if(!value.trim() && required) return '必填项，请输入'
  let nameReg = /^[a-zA-Z\s\u4e00-\u9fa5]{1,20}$/
  if(!nameReg.test(value) || !value.trim()){
      return '20位字符以下，限中文、英文'
  }else{
      return ''
  }
}
// 验证码验证
export const checkCode = (value)=>{
  if(!value){
    return '请输入验证码';
  }
  if(value != localStorage.getItem('checkcode')){
    return '验证码错误，请重试';
  }
  return '';
}
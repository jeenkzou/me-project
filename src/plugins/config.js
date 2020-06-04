/**
 * 通过环境变量来配置默认参数
 */
function setDefaultByEnv(){
    let baseUrl = "";   //这里是一个默认的url，可以没有
    let errorAutoTip = false;//请求接口报错时，自动提示错误信息,一般用于测试，或者某些接口需要提示给用户
    switch (process.env.NODE_ENV) {
        case 'development':
            baseUrl = "http://service.cicba.cn";  //这里是本地的请求url
            errorAutoTip = true;
            break;
        case 'alpha':   // 注意这里的名字要和设置的模式名字对应起来
            baseUrl = "http://127.0.0.1:10000";  //这里是测试环境中的url
            errorAutoTip = true;
            break;
        case 'production':
            baseUrl = "http://service.cicba.cn";  //生产环境url
            errorAutoTip = false;
            break;
    }
    return {baseUrl,errorAutoTip};
}

module.exports = {
    ...setDefaultByEnv(),

    timeOut:10000,//超时时间

    forbiddenTime:0,//重复请求禁用时间（防止用户在同一时间内重复提交，可以控制用户在请求同一个接口时，在规定时间内只能提交一次）

    apiAutoInsert:true,//api是否自动注入到vue实例

}
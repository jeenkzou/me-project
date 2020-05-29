function setBaseUrl(){
    let baseUrl = "";   //这里是一个默认的url，可以没有
    switch (process.env.NODE_ENV) {
        case 'development':
            baseUrl = "http://localhost:8888/"  //这里是本地的请求url
            break
        case 'alpha':   // 注意这里的名字要和设置的模式名字对应起来
            baseUrl = "http://alpha.edik.cn/"  //这里是测试环境中的url
            break
        case 'production':
            baseUrl = "https://www.baidu.com/"   //生产环境url
            break
    }
    return baseUrl;
}

module.exports = {
    baseUrl:setBaseUrl(),

    timeOut:10000
}
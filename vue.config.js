const path = require('path');

module.exports = {
    devServer:{
        // hotOnly:true,
        host:'0.0.0.0',
        port:8080
    },
    // 引入全局样式，这样使用定义的less变量时，不用每次引入global.less了
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    },
}
function addStyleResource(rule) {
	rule.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [
				path.resolve(__dirname, './src/plugins/less/variable.less'), // 需要全局导入的less
			]
		})
}
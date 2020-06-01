# me-project
![me](https://user-gold-cdn.xitu.io/2020/6/1/1726d7912804d05f?w=297&h=180&f=png&s=3928)

## 使用

### 依赖安装
```
npm install
```

### 开发环境运行
```
npm run dev
```

### 生产环境打包
```
npm run build
```

## 功能点

### Less预处理器定义常用的class

**示例：**
```less
//variable.less：定义变量文件

/* 行为相关颜色 */
@color-primary: #4897ff;
@color-success: #4cd964;
@color-info:#007aff;
@color-warning: #f0ad4e;
@color-error: #dd524d;

//定义下面两个变量的意义在于方便遍历处理，接下来就知道用途所在；
//因为less变量不支持定义对象形式，所以需要将key和value单独定义，一一对应即可；
@list:primary,success,info,warning,error;//颜色列表key
@colors:@color-primary,@color-success,@color-info,@color-warning,@color-error;//颜色列表value
```

**定义变量之后，我们就可以根据自己的需求去定义一些常用的class：**

```less
//color.less:颜色文件

@import './variable.less';//上个定义变量的文件

// 生成主题字体颜色方法
.create-color(@lt,@i:1,@key:extract(@lt, @i),@val:extract(@colors,@i)) when (length(@lt)>=@i){
    .color-@{key}{
        color : @val;
    }
    .create-color(@lt, @i + 1);
}
.create-color(@list);

```

**输出结果：**
```css
.color-primary {
  color: #4897ff;
}
.color-success {
  color: #4cd964;
}
.color-info {
  color: #007aff;
}
.color-warning {
  color: #f0ad4e;
}
.color-error {
  color: #dd524d;
}
```

**补充**

此项目是按照我的命名规则来命名的，***建议用户定义自己的一套命名规则***，可以大大提高工作上的效率，这就是为什么别人已经封装好的轮子，我们还要去重新封装一次的原因；别人封装的永远是别人的思路，有些无法达到自己项目上的需求，有些在使用过程中必须要不停地去查阅文档再使用；如果自己有能力去重新封装一个能满足项目的组件或者插件，建议自己封装然后不断迭代维护；

我的**命名规则**是这样的：
    
* 2个单词以下的，使用全称：color-primary,bgcolor-primary,display-flex...
* 2个单词以上的(一般情况下，最多使用3个单词)，第一单词使用全称，中间的都用首字母，最后个选择前三个字母：flex-j-bet(=justify-content:space-between),text-c-pri...
* 方位单词（top,right,bottom,left,center），仅使用首字母（t,r,b,l,c）:text-a-c(=text-align:center;),margin-l-sm(=margin-left:10px;),float-l(=float:left;)
* background使用bg，暂时仅缩写了这一个，之后会不断扩展，规则过多，容易记混；

### 自定义组件

**Button**

![](https://user-gold-cdn.xitu.io/2020/6/1/1726da83f82afd69?w=860&h=577&f=png&s=35052)

**步骤条**

![](https://user-gold-cdn.xitu.io/2020/6/1/1726da9242e753e7?w=838&h=220&f=png&s=10387)

**分页**

![](https://user-gold-cdn.xitu.io/2020/6/1/1726da971ec6ea5d?w=843&h=119&f=png&s=4695)

**弹窗**

![](https://user-gold-cdn.xitu.io/2020/6/1/1726daa56a479046?w=642&h=499&f=png&s=44235)

等等。。。。。。还有很多其他小组件，都是根据当前项目需求进行封装；建议大家可以自己封装或改装，主要是要满足自己项目上的需求，否则别人再强大的组件，也是无济于补；


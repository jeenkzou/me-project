<template>
  <div class="home width-limit display-flex">
    <ul class="width-5 padding-base">
      <li class='padding-base bg-c-inv highlight text-a-c font-s-xl'><a href="#按钮" class='me-a'>按钮</a></li>
      <li class='padding-base bg-c-pri highlight text-a-c font-s-xl'><a href="#表单" class='me-a'>表单</a></li>
      <li class='padding-base bg-c-pri highlight text-a-c font-s-xl'><a href="#组件" class='me-a'>组件</a></li>
    </ul>
    <div>
      <me-caption id='按钮' title-name='按钮' type='background'></me-caption>
      <div class="padding-base bg-c-inv margin-b-base">
        <h3>行为颜色</h3>
        <div class="padding-l-base">
          <me-button v-for="item in lists" :key='item' :color='item' class='margin-r-xs'>{{item}}</me-button>
          <me-button :disabled='true'>disabled</me-button>
        </div>
        <h3>行为颜色渐变</h3>
        <div class="padding-l-base">
          <me-button v-for="item in lists" :key='item' :color='item' :gradient='true' class='margin-r-xs'>{{item}}</me-button>
        </div>
        <h3>不同尺寸</h3>
        <div class="padding-l-base">
          <me-button v-for="item in sizes" :key='item.size' color='primary':gradient='true' :size='item.size' class='margin-r-xs'>{{item.name}}</me-button>
        </div>
        <h3>镂空</h3>
        <div class="padding-l-base">
          <me-button v-for="item in lists" :key='item' :color='item' :inverse='true' class='margin-r-xs'>{{item}}</me-button>
          <button class='me-button bgcolor-inverse highlight text-c-pri border-base'>inverse</button>
        </div>
        <h3>带Loading效果</h3>
        <div class="padding-l-base">
          <me-button :loading='btnLoading' @click='changebtnLoading'>点击加载loading</me-button>
        </div>
      </div>
      <me-caption id='表单' title-name='表单' type='background'></me-caption>
      <div class="padding-base bg-c-inv margin-b-base">
        <h3>input</h3>
        <p class='padding-l-base'>
          <me-input v-for="(item, index) in sizes" :key="index" :size='item.size' :placeholder='item.name' class='margin-b-sm'></me-input>
          <me-input :disabled='true' value='我被禁用了'></me-input>
        </p>
        <h3>textarea</h3>
        <p class='padding-l-base'>
          <textarea class='me-textarea noresize minheight-1 margin-b-sm' placeholder='textarea'></textarea>
          <textarea class='me-textarea noresize minheight-1' disabled placeholder='我被禁用了'></textarea>
        </p>
        <h3>Radio</h3>
        <div class="padding-l-base">
          <p class='margin-b-base'>对象模式：<me-radio :options='sexsDis' v-model='sexDis'></me-radio>双向绑定值：{{sexDis}}</p>
          <p>字符模式：<me-radio :options='sexsStr' v-model='sexStr'></me-radio>双向绑定值：{{sexStr}}</p>
        </div>
        <h3>表单组件</h3>
        <div class="me-form-wrapper padding-l-base">
          <p class="form-item">
            <span class="form-item-label required">姓名</span>
            <me-input placeholder='请输入姓名'></me-input>
          </p>
          <p class="form-item">
            <span class="form-item-label required">年龄</span>
            <me-input placeholder='请输入年龄'></me-input>
          </p>
          <p class="form-item">
            <span class="form-item-label">性别</span>
            <me-radio :options='sexs'></me-radio>
          </p>
          <p class="form-item" style='align-items: flex-start;'>
            <span class="form-item-label">个人介绍</span>
            <textarea class='me-textarea noresize minheight-1' placeholder='请输入个人介绍'></textarea>
          </p>

        </div>
      </div>
      <div>
        <me-caption id='组件' title-name='组件' type='background'></me-caption>
        <div class="padding-base bg-c-inv margin-b-base">
          <h3>Tabs</h3>
          <div class='padding-l-base'>
            <me-tabs :data='tabs' v-model='tabActive'></me-tabs>
            <div class='padding-base bg-c-inv minheight-2 box-shadow'>{{tabs[tabActive].name}}</div>
          </div>
          <h3>Caption</h3>
          <div class="padding-l-base">
            <me-caption title-name='我是标题'></me-caption>
            <div class='margin-b-base margin-t-sm bg-c-inv padding-base minheight-2 box-shadow'>
              我是标题下的一些内容
            </div>
            <me-caption title-name='我是标题' type='background'></me-caption>
            <div class='margin-tb-base bg-c-inv padding-base minheight-2 box-shadow'>
              我是标题下的一些内容
            </div>
          </div>
          <h3>Card</h3>
          <div class="padding-l-base">
            <me-card title-name='我是标题'>
              <div class='minheight-1'>我内容是随便写写的</div>
            </me-card>
          </div>
          <h3>Steps</h3>
          <div class="padding-l-base">
            <me-steps :data='steps' :current='stepActive' class='margin-b-base'></me-steps>
            <me-button @click='nextStep'>下一步</me-button>
          </div>
          <h3>Page</h3>
          <div class="padding-l-base">
            <me-page :page-map='pageMap' :is-to-top='false' style='text-align:left'></me-page>
          </div>
          <h3>CountTo
            <span @click='changeCount' class='float-r me-a margin-r-base'>切换</span>
          </h3>
          <div class="padding-l-base flex-j-aro">
            <count-to
              v-for="(item, index) in 4"
              :key="index"
              class="bg-c-inv border-base font-s-xl text-a-c margin-r-base padding-base box-shadow flex-1"
              :end='Math.pow(countStart,item)'
            ></count-to>
          </div>
          <h3>http-state 
            <span @click='changeState' class='float-r me-a margin-r-base'>重新加载</span>
          </h3>
          <div class="padding-l-base position-relative minheight-3">
            <http-state :state='httpState'></http-state>
          </div>
          <h3>弹窗</h3>
          <div class="paddding-l-base">
            <me-button class='margin-r-base' @click='layer1Show=true'>打开弹窗</me-button>
            <me-button class='margin-r-base' @click='layer2Show=true'>打开有loading的弹窗</me-button>
            <me-button @click='layer3Show=true'>打开有按钮的弹窗</me-button>
          </div>
        </div>
      </div>
      <me-caption id='插件' title-name='插件' type='background'></me-caption>
        <div class="padding-base bg-c-inv margin-b-base">
          <h3>Toast</h3>
          <div class="padding-l-base">
            <me-button class='margin-r-base' @click="toast('success')">成功提示</me-button>
            <me-button color='warning' class='margin-r-base' @click="toast('warning')">警告提示</me-button>
            <me-button color='error' @click="toast('error')">失败提示</me-button>
          </div>
          <h3>Modal</h3>
          <div class="padding-l-base">
            <me-button class='margin-r-base' @click="modal(1)">打开对话框</me-button>
          </div>
          <h3>检查电脑端还是移动端</h3>
          <div class="padding-l-base">
            <me-button class='margin-r-base' @click="isPc">开始检查</me-button>
          </div>
        </div>
    </div>
    <!-- 弹窗 -->
    <mask-layer
      v-model='layer1Show'
      title-name='弹窗标题'
    >
      <div class="padding-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptates accusamus dolorem sapiente. Magni recusandae, est dolor nam ipsa iste quaerat non, fuga animi delectus sunt, ut cumque nobis voluptates.
      </div>
    </mask-layer>
    <!-- 打开有loading的弹窗 -->
    <mask-layer
      v-model='layer2Show'
      title-name='弹窗标题'
    >
      <div class="padding-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptates accusamus dolorem sapiente. Magni recusandae, est dolor nam ipsa iste quaerat non, fuga animi delectus sunt, ut cumque nobis voluptates.
      </div>
      <page-loading :show='layerLoading'></page-loading>
    </mask-layer>
    <!-- 打开有按钮的弹窗 -->
    <mask-layer
      v-model='layer3Show'
      title-name='弹窗标题'
    >
      <div class="padding-base">
        <h3 v-for="i in 5" :key='i'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum eligendi distinctio quo commodi, atque sapiente perferendis, fuga itaque eveniet sequi iure doloribus non accusamus architecto animi a quasi totam exercitationem?</h3>
        lorem
      </div>
      <div slot='footer'>
        <me-button :inverse='true' class='margin-r-base' @click='handleFooterBtn(false)'>取消</me-button>
        <me-button @click='handleFooterBtn(true)'>确定</me-button>
      </div>
    </mask-layer>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return {
      lists:[
        'primary',
        'success',
        'info',
        'warning',
        'error'
      ],
      btnLoading:false,
      sizes:[
        {size:'small',name:'small 28px'},
        {size:'',name:'normal 34px'},
        {size:'large',name:'large 40px'},
      ],
      tabs:[
        {name:'tab1'},
        {name:'tab2'},
        {name:'tab3'},
        {name:'tab4'},
        {name:'tab5'},
      ],
      tabActive:0,
      steps:[
        {name:'step1'},
        {name:'step2'},
        {name:'step3'},
        {name:'step4'},
        {name:'step5'},
      ],
      stepActive:0,
      sexs:[
        {value:'1',label:'男'},
        {value:'0',label:'女'},
      ],
      sexsDis:[
        {value:'1',label:'男'},
        {value:'0',label:'女'},
        {value:'2',label:'禁用',disabled:true},
      ],
      sexDis:'',
      sexsStr:['男','女','保密'],
      sexStr:'',
      pageMap:{
        current:1,
        size:10,
        total:100
      },
      httpState:1,
      countStart:10,
      layer1Show:false,
      layer2Show:false,
      layerLoading:true,
      layer3Show:false,
    }
  },
  methods:{
    nextStep(){
      if(this.stepActive<this.steps.length-1){
        this.stepActive++;
      }else{
        this.stepActive=0;
      }
    },
    changebtnLoading(){
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
      }, 5000);
    },
    changeState(){
      this.httpState = 1;
      setTimeout(() => {
        this.httpState = 2;
      }, 5000);
    },
    changeCount(){
      let countStart = Math.ceil(Math.random()*10);
      if(this.countStart==countStart){
        this.countStart = countStart++;
      }else{
        this.countStart = countStart;
      }
    },
    handleFooterBtn(bool){
      this.layer3Show = false;
      let msg = '您点击了';
      if(bool){
        msg += '确认'
      }else{
        msg += '取消'
      }
      this.$toast.show(msg);
    },
    toast(icon){
      this.$toast[icon]('状态：'+icon)
    },
    modal(tag){
      switch(tag){
        case 1:{
          this.$modal.show({
            title:'我是对话框的标题',
            subtitle:'我是对话框的副标题',
            callback:({bool,type})=>{
              if(type==0){
                this.$toast.success('您点击了关闭')
                return
              }
              this.handleFooterBtn(bool)
            }
          })
        }
      }
    },
    isPc(){
      let result = this.$funs.isPC();
      this.$toast.show(result?'电脑端':'手机端')
    }
  },
  created(){
    this.changeState();
  }
}
</script>

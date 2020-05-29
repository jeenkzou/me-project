<template>
    <transition :name='transName'>
        <div class="toast-wrapper" v-show='toastShow'>
            <div class="toast-content" @mouseenter="clearTimer" @mouseleave="remove">
                <span class='icons' v-if='icon'>
                    <i class="meiconfont meicon-chenggong color-primary" v-if="icon=='success'"></i>
                    <i class="meiconfont meicon-jinggao color-warning" v-if="icon=='warning'"></i>
                    <i class="meiconfont meicon-shibai color-error" v-if="icon=='error'"></i>
                </span>
                <span>{{content}}</span>
            </div>
        </div>
  </transition>
</template>

<script>
export default {
    name:'toast',
    data() {
        return {
            toastShow:false,
            content:'',
            icon:'',
            timer:null,
            documentTimer:null,
            transName:'fade',
            boxSize:'small'
        }
    },
    methods: {
        add(opts) {
            let {duration,content,icon,size} = opts;
            this.boxSize = size || 'small';
            // 如果没有内容，不提示
            if(!content) return;
            // 如果超过10s，按10计算
            if(duration>10){
                duration = 10;
            }
            duration = duration>=0?Number(duration):2;
            this.toastShow = true;
            this.content = content;
            this.icon = icon;
            this.clearTimer();
            if(this.documentTimer){
                clearTimeout(this.documentTimer);
                document.removeEventListener('click',this.remove);
            }
            this.documentTimer = setTimeout(() => {
                document.addEventListener('click',this.remove);
            }, 100);
            if(duration>0){
                this.timer = setTimeout(() => {
                    this.remove();
                }, duration*1000);
            }
        },
        show(content,duration = 2,size='small'){
            this.transName = 'scale';
            this.add({content,icon:'',duration,size})
        },
        success(content,duration = 2,size='small'){
            this.transName = 'scale'
            this.add({content,icon:'success',duration,size})
        },
        error(content,duration = 3.5,size='small'){
            this.transName = 'shake'
            this.add({content,icon:'error',duration,size})
        },
        warning(content,duration = 2.5,size='small'){
            this.transName = 'shake'
            this.add({content,icon:'warning',duration,size})
        },
        remove(e) {
            if(e && e.target.classList.contains('toast-content') && (e.type=='mouseenter' || e.type=='click')){
                return
            }
            this.clearTimer()
            this.toastShow = false
            document.removeEventListener('click',this.remove)
        },
        clearTimer(){
            if(this.timer){
                clearTimeout(this.timer)
                this.timer = null
            }
        }
    }
}
</script>
<style lang='less' scoped>
    .toast-wrapper{
        position:fixed;
        z-index:99999;
        top:50%;
        left:50%;
    }
    .toast-wrapper .toast-content{
        text-align: center;
        font-size: 1.6rem;
        /* text-align: center; */
        min-width: 80px;
        max-width: 600px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 20px;
        white-space: nowrap;
        padding:20px;
        border-radius: 10px;
        opacity: 1;
        color:#fff;
        background:rgba(0,0,0,0.8);
        transition: all .3s ease-out;
    }
    .icons{
        margin-right:10px;
        i{
            font-size:20px;
            position: relative;
            top:2px;
        }
    }
</style>


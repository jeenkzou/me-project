<template>
    <div class="loadingbar-wrapper">
        <div class="outer"></div>
        <div class="inner" :style="{width:width+'%'}"></div>
    </div>
</template>
<script>
export default {
    name:'loadingBar',
    data(){
        return {
            width:0,
            timer:null
        }
    },
    methods:{
        start(){
            this.timer = setInterval(() => {
                
            }, 100);
        }
    }
}
</script>

<style lang="less" scoped>
.loadingbar-wrapper{
    position: fixed;
    top:0;left:0;
    height:2px;
    width: 100%;
    .outer{
        width: 100%;
        background: #ccc;
    }
    .inner{
        background: @color-primary;
    }
}
</style>